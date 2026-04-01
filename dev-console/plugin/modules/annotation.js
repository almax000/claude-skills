/**
 * Annotation Module — hover highlight + CSS selector + feedback form
 *
 * Self-registers with window.__devConsole when loaded as <script>.
 * State machine: IDLE → SELECTING → FORM_OPEN → IDLE
 * Overlay div approach: never touches host elements' inline styles.
 */
;(function () {
  'use strict'

  var t = window.__dcI18n ? window.__dcI18n.t : function (k, fb) { return fb || k }
  document.addEventListener('dc-locale-change', function () {
    if (window.__dcI18n) t = window.__dcI18n.t
  })

  const STATES = { IDLE: 'idle', SELECTING: 'selecting', FORM_OPEN: 'form_open' }
  const SAVE_URL = '/__dev-console/save'
  const ANNOTATIONS_URL = '/__dev-console/annotations'

  const mod = {
    id: 'annotation',
    label: 'Annotate',
    labelKey: 'ann.tab',

    _state: STATES.IDLE,
    _annotations: [],
    _ctx: null,
    _highlight: null,
    _hoveredEl: null,
    _listEl: null,
    _formEl: null,
    _toolbarEl: null,
    _pendingAnnotation: null,
    _onMouseMove: null,
    _onClick: null,
    _badges: [],  // DOM elements for on-page annotation markers

    init(ctx) {
      this._ctx = ctx
      this._bindEventHandlers()
      this._buildUI(ctx.container)
      this._createHighlightOverlay()
      this._loadAnnotations()

      // Hide highlight on scroll (W2 fix) + reposition badges
      window.addEventListener('scroll', () => {
        if (this._highlight) this._highlight.style.display = 'none'
        if (this._badges.length) this._updateBadgePositions()
      }, { passive: true })

      // Also reposition badges on resize
      window.addEventListener('resize', () => {
        if (this._badges.length) this._updateBadgePositions()
      }, { passive: true })
    },

    activate() { this._renderList() },
    deactivate() { if (this._state === STATES.SELECTING) this.stop() },

    // --- Bind event handlers with correct `this` ---
    _bindEventHandlers() {
      const self = this

      this._onMouseMove = (e) => {
        const el = document.elementFromPoint(e.clientX, e.clientY)
        if (!el || window.__devConsole._isConsoleElement(el)) {
          if (self._highlight) self._highlight.style.display = 'none'
          self._hoveredEl = null
          return
        }
        if (el.hasAttribute?.('data-dev-console-ignore')) {
          if (self._highlight) self._highlight.style.display = 'none'
          return
        }
        self._hoveredEl = el
        const rect = el.getBoundingClientRect()
        const hl = self._highlight
        hl.style.display = 'block'
        hl.style.left = `${rect.left}px`
        hl.style.top = `${rect.top}px`
        hl.style.width = `${rect.width}px`
        hl.style.height = `${rect.height}px`
      }

      this._onClick = (e) => {
        if (self._state !== STATES.SELECTING) return
        if (!self._hoveredEl) return
        if (window.__devConsole._isConsoleElement(e.target)) return
        e.preventDefault()
        e.stopPropagation()
        self._openForm(self._hoveredEl)
      }
    },

    // --- Public commands (via window.__devConsole.execute) ---

    start() {
      if (this._state !== STATES.IDLE) return { status: this._state }
      this._state = STATES.SELECTING
      this._toolbarEl.querySelector('.dc-annotate-toggle').textContent = t('ann.stopAnnotating', 'Stop Annotating')
      this._toolbarEl.querySelector('.dc-annotate-toggle').classList.add('dc-btn--danger')
      document.addEventListener('mousemove', this._onMouseMove)
      document.addEventListener('click', this._onClick, true)
      document.body.style.cursor = 'crosshair'
      return { status: 'selecting' }
    },

    stop() {
      this._state = STATES.IDLE
      this._toolbarEl.querySelector('.dc-annotate-toggle').textContent = t('ann.startAnnotating', 'Start Annotating')
      this._toolbarEl.querySelector('.dc-annotate-toggle').classList.remove('dc-btn--danger')
      document.removeEventListener('mousemove', this._onMouseMove)
      document.removeEventListener('click', this._onClick, true)
      if (this._highlight) this._highlight.style.display = 'none'
      document.body.style.cursor = ''
      this._hoveredEl = null
      return { status: 'idle' }
    },

    list() {
      return this._annotations.filter(a => a.status === 'open')
    },

    resolve(index) {
      const open = this._annotations.filter(a => a.status === 'open')
      if (index < 0 || index >= open.length) return { error: 'Invalid index' }
      open[index].status = 'resolved'
      this._saveAnnotations()
      this._renderList()
      return { resolved: open[index].id }
    },

    exportMarkdown() {
      const open = this._annotations.filter(a => a.status === 'open')
      if (!open.length) return '(No open annotations)'
      const now = new Date().toISOString().split('T')[0]
      let md = `## Dev Console Annotations — ${location.pathname}\n`
      md += `*Captured: ${now} at ${location.host}*\n\n`
      open.forEach((a, i) => {
        md += `### #${i + 1} [${a.priority.toUpperCase()}] — \`${a.selector}\`\n`
        md += `> ${a.text}\n`
        const el = a.element
        md += `**Element**: ${el.tagName}${el.classList.length ? '.' + el.classList.join('.') : ''} (${el.dimensions})\n`
        if (a.computedStyles) {
          const s = a.computedStyles
          md += `**Styles**: font-size: ${s.fontSize}, color: ${s.color}, padding: ${s.padding}\n`
        }
        md += `**Category**: ${a.category}\n\n`
      })
      return md
    },

    exportJSON() {
      return JSON.stringify(this._annotations.filter(a => a.status === 'open'), null, 2)
    },

    // --- UI building ---

    _buildUI(container) {
      this._toolbarEl = document.createElement('div')
      this._toolbarEl.style.cssText = 'display:flex;gap:6px;align-items:center;'

      const toggleBtn = document.createElement('button')
      toggleBtn.className = 'dc-btn dc-btn--primary dc-annotate-toggle'
      toggleBtn.textContent = t('ann.startAnnotating', 'Start Annotating')
      toggleBtn.onclick = () => this._state === STATES.IDLE ? this.start() : this.stop()

      const exportBtn = document.createElement('button')
      exportBtn.className = 'dc-btn dc-btn--ghost dc-btn--sm'
      exportBtn.textContent = t('ann.copyMd', 'Copy MD')
      exportBtn.onclick = () => this._copyToClipboard()

      this._toolbarEl.appendChild(toggleBtn)
      this._toolbarEl.appendChild(exportBtn)
      container.appendChild(this._toolbarEl)

      this._listEl = document.createElement('div')
      this._listEl.className = 'dc-annotation-list'
      container.appendChild(this._listEl)

      this._formEl = document.createElement('div')
      this._formEl.style.display = 'none'
      this._buildForm()
      container.appendChild(this._formEl)
    },

    _buildForm() {
      const f = this._formEl
      f.innerHTML = ''

      const title = document.createElement('div')
      title.style.cssText = 'font-weight:600;font-size:13px;color:var(--dc-text-accent,#a5b4fc);margin-bottom:4px;'
      title.className = 'dc-form-title'
      f.appendChild(title)

      const selectorDisplay = document.createElement('div')
      selectorDisplay.className = 'dc-annotation-selector'
      selectorDisplay.style.marginBottom = '8px'
      f.appendChild(selectorDisplay)

      const label1 = document.createElement('div')
      label1.className = 'dc-label'
      label1.textContent = t('ann.feedback', 'Feedback')
      f.appendChild(label1)

      const textarea = document.createElement('textarea')
      textarea.className = 'dc-textarea'
      textarea.placeholder = t('ann.describe', 'Describe the issue...')
      textarea.rows = 3
      f.appendChild(textarea)

      const row = document.createElement('div')
      row.style.cssText = 'display:flex;gap:8px;margin-top:6px;'

      const prioritySelect = document.createElement('select')
      prioritySelect.className = 'dc-select'
      prioritySelect.style.flex = '1'
      ;['high', 'medium', 'low'].forEach(p => {
        const opt = document.createElement('option')
        opt.value = p
        opt.textContent = p.charAt(0).toUpperCase() + p.slice(1)
        prioritySelect.appendChild(opt)
      })
      prioritySelect.value = 'medium'
      row.appendChild(prioritySelect)

      const categorySelect = document.createElement('select')
      categorySelect.className = 'dc-select'
      categorySelect.style.flex = '1'
      ;['bug', 'styling', 'improvement', 'question'].forEach(c => {
        const opt = document.createElement('option')
        opt.value = c
        opt.textContent = c.charAt(0).toUpperCase() + c.slice(1)
        categorySelect.appendChild(opt)
      })
      categorySelect.value = 'styling'
      row.appendChild(categorySelect)
      f.appendChild(row)

      const actions = document.createElement('div')
      actions.style.cssText = 'display:flex;gap:8px;margin-top:8px;'

      const saveBtn = document.createElement('button')
      saveBtn.className = 'dc-btn dc-btn--primary'
      saveBtn.textContent = t('ann.save', 'Save')
      saveBtn.onclick = () => this._submitForm()
      actions.appendChild(saveBtn)

      const cancelBtn = document.createElement('button')
      cancelBtn.className = 'dc-btn dc-btn--ghost'
      cancelBtn.textContent = t('ann.cancel', 'Cancel')
      cancelBtn.onclick = () => this._closeForm()
      actions.appendChild(cancelBtn)
      f.appendChild(actions)
    },

    // --- Highlight overlay (in main document, not shadow DOM) ---

    _createHighlightOverlay() {
      const hl = document.createElement('div')
      hl.setAttribute('data-dev-console', 'highlight')
      hl.style.cssText = [
        'position:fixed', 'pointer-events:none', 'border:2px solid #6366f1',
        'background:rgba(99,102,241,0.08)', 'border-radius:3px',
        'z-index:2147483645', 'display:none', 'transition:all 0.08s ease',
      ].join(';')
      document.body.appendChild(hl)
      this._highlight = hl
    },

    // --- CSS Selector Algorithm ---

    _generateSelector(el) {
      // 1. id (unique)
      if (el.id) {
        try {
          if (document.querySelectorAll(`#${CSS.escape(el.id)}`).length === 1) {
            return `#${CSS.escape(el.id)}`
          }
        } catch { /* invalid id */ }
      }

      // 2. data-testid
      const testId = el.getAttribute('data-testid')
      if (testId) {
        const sel = `[data-testid="${CSS.escape(testId)}"]`
        try {
          if (document.querySelectorAll(sel).length === 1) return sel
        } catch { /* skip */ }
      }

      // 3. Walk up DOM building child-combinator selector
      const parts = []
      let current = el
      while (current && current !== document.body && current !== document.documentElement) {
        let segment = current.tagName.toLowerCase()

        // id stop-point (ancestor, not the target itself — already checked above)
        if (current !== el && current.id) {
          parts.unshift(`#${CSS.escape(current.id)}`)
          break
        }

        // Stable classes
        const stableClasses = Array.from(current.classList).filter(c => {
          if (/^_[a-z0-9]{5,}$/i.test(c)) return false
          if (c.includes(':')) return false
          return true
        })
        if (stableClasses.length) {
          segment += '.' + stableClasses.map(c => CSS.escape(c)).join('.')
        }

        // nth-of-type when siblings share same tag
        const parent = current.parentElement
        if (parent) {
          const siblings = Array.from(parent.children).filter(s => s.tagName === current.tagName)
          if (siblings.length > 1) {
            segment += `:nth-of-type(${siblings.indexOf(current) + 1})`
          }
        }

        parts.unshift(segment)
        current = current.parentElement
      }

      if (!parts.length) parts.push(el.tagName.toLowerCase())
      if (!parts[0].startsWith('#')) parts.unshift('body')

      const selector = parts.join(' > ')

      // 5. Validate uniqueness
      try {
        const matches = document.querySelectorAll(selector)
        if (matches.length === 1 && matches[0] === el) return selector
      } catch { /* fall through */ }

      // 6. Fallback (W1): nth-child chain from body
      return this._fallbackSelector(el)
    },

    _fallbackSelector(el) {
      const chain = []
      let current = el
      while (current && current !== document.body && current !== document.documentElement) {
        const parent = current.parentElement
        if (!parent) break
        chain.unshift(`*:nth-child(${Array.from(parent.children).indexOf(current) + 1})`)
        current = parent
      }
      return 'body > ' + chain.join(' > ')
    },

    // --- Element metadata ---

    _captureElementMeta(el) {
      const rect = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      return {
        element: {
          tagName: el.tagName.toLowerCase(),
          classList: Array.from(el.classList),
          dimensions: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
        },
        computedStyles: {
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          fontSize: cs.fontSize,
          padding: cs.padding,
          fontWeight: cs.fontWeight,
        },
        page: {
          url: location.pathname,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
        },
      }
    },

    // --- Form logic ---

    _openForm(el) {
      this._state = STATES.FORM_OPEN
      document.removeEventListener('mousemove', this._onMouseMove)
      document.removeEventListener('click', this._onClick, true)
      document.body.style.cursor = ''
      if (this._highlight) this._highlight.style.display = 'none'

      const selector = this._generateSelector(el)
      const meta = this._captureElementMeta(el)
      this._pendingAnnotation = { selector, ...meta }

      this._listEl.style.display = 'none'
      this._toolbarEl.style.display = 'none'
      this._formEl.style.display = 'flex'
      this._formEl.style.flexDirection = 'column'
      this._formEl.style.gap = '6px'

      this._formEl.querySelector('.dc-form-title').textContent =
        `Annotating: <${meta.element.tagName}>`
      this._formEl.querySelector('.dc-annotation-selector').textContent = selector
      const ta = this._formEl.querySelector('.dc-textarea')
      ta.value = ''
      ta.focus()
    },

    _closeForm() {
      this._formEl.style.display = 'none'
      this._listEl.style.display = ''
      this._toolbarEl.style.display = ''
      this._pendingAnnotation = null
      this._state = STATES.IDLE
      const btn = this._toolbarEl.querySelector('.dc-annotate-toggle')
      btn.textContent = 'Start Annotating'
      btn.classList.remove('dc-btn--danger')
    },

    async _submitForm() {
      const text = this._formEl.querySelector('.dc-textarea').value.trim()
      if (!text) return

      const selects = this._formEl.querySelectorAll('.dc-select')
      const annotation = {
        id: crypto.randomUUID(),
        text,
        priority: selects[0].value,
        category: selects[1].value,
        selector: this._pendingAnnotation.selector,
        status: 'open',
        timestamp: new Date().toISOString(),
        element: this._pendingAnnotation.element,
        computedStyles: this._pendingAnnotation.computedStyles,
        page: this._pendingAnnotation.page,
      }

      this._annotations.push(annotation)
      await this._saveAnnotations()

      // Clipboard: single annotation as markdown
      const md = `**[${annotation.priority.toUpperCase()}]** \`${annotation.selector}\` — ${text}`
      try { await navigator.clipboard.writeText(md) } catch { /* ok */ }

      this._closeForm()
      this._renderList()
    },

    // --- On-page annotation badges ---

    _renderBadges() {
      this._clearBadges()
      const open = this._annotations.filter(a => a.status === 'open')
      open.forEach((a, i) => {
        let target = null
        try { target = document.querySelector(a.selector) } catch { /* invalid selector */ }
        if (!target) return

        const rect = target.getBoundingClientRect()
        const badge = document.createElement('div')
        badge.setAttribute('data-dev-console', 'badge')
        badge.style.cssText = [
          'position:fixed', 'pointer-events:none',
          `left:${rect.left - 6}px`, `top:${rect.top - 6}px`,
          'width:20px', 'height:20px', 'border-radius:50%',
          'display:flex', 'align-items:center', 'justify-content:center',
          'font-size:10px', 'font-weight:700', 'font-family:system-ui',
          'z-index:2147483644', 'color:#fff', 'line-height:1',
          `background:${a.priority === 'high' ? '#ef4444' : a.priority === 'medium' ? '#f59e0b' : '#22c55e'}`,
          'box-shadow:0 2px 6px rgba(0,0,0,0.3)',
        ].join(';')
        badge.textContent = String(i + 1)
        document.body.appendChild(badge)
        this._badges.push(badge)
      })
    },

    _clearBadges() {
      this._badges.forEach(b => b.remove())
      this._badges = []
    },

    _updateBadgePositions() {
      const open = this._annotations.filter(a => a.status === 'open')
      this._badges.forEach((badge, i) => {
        if (i >= open.length) return
        let target = null
        try { target = document.querySelector(open[i].selector) } catch { /* */ }
        if (!target) { badge.style.display = 'none'; return }
        const rect = target.getBoundingClientRect()
        badge.style.left = `${rect.left - 6}px`
        badge.style.top = `${rect.top - 6}px`
        badge.style.display = 'flex'
      })
    },

    // --- List rendering ---

    _renderList() {
      const open = this._annotations.filter(a => a.status === 'open')
      this._listEl.innerHTML = ''

      // Also update on-page badges
      this._renderBadges()

      if (!open.length) {
        this._listEl.innerHTML = `
          <div class="dc-empty">
            <div style="font-size:28px;opacity:0.5">&#9998;</div>
            <div>${t('ann.noAnnotations', 'No annotations yet')}</div>
            <div style="font-size:11px;color:var(--dc-text-tertiary,#a1a1aa)">${t('ann.clickStart', 'Click "Start Annotating" to begin')}</div>
          </div>`
        return
      }

      open.forEach((a, i) => {
        const item = document.createElement('div')
        item.className = 'dc-annotation-item'

        const meta = document.createElement('div')
        meta.className = 'dc-annotation-meta'

        // Number badge matching on-page marker
        const numBadge = document.createElement('span')
        numBadge.style.cssText = [
          'width:18px', 'height:18px', 'border-radius:50%', 'display:inline-flex',
          'align-items:center', 'justify-content:center', 'font-size:10px',
          'font-weight:700', 'color:#fff', 'flex-shrink:0',
          `background:${a.priority === 'high' ? '#ef4444' : a.priority === 'medium' ? '#f59e0b' : '#22c55e'}`,
        ].join(';')
        numBadge.textContent = String(i + 1)
        meta.appendChild(numBadge)

        const badge = document.createElement('span')
        badge.className = `dc-badge dc-badge--${a.priority}`
        badge.textContent = a.priority
        meta.appendChild(badge)

        const cat = document.createElement('span')
        cat.style.color = 'var(--dc-text-secondary, #d4d4d8)'
        cat.textContent = a.category
        meta.appendChild(cat)

        const resolveBtn = document.createElement('button')
        resolveBtn.className = 'dc-btn dc-btn--ghost dc-btn--sm'
        resolveBtn.textContent = t('ann.resolve', 'Resolve')
        resolveBtn.style.marginLeft = 'auto'
        resolveBtn.onclick = () => { this.resolve(i); this._renderList() }
        meta.appendChild(resolveBtn)

        item.appendChild(meta)

        const textEl = document.createElement('div')
        textEl.className = 'dc-annotation-text'
        textEl.textContent = a.text
        item.appendChild(textEl)

        const selEl = document.createElement('div')
        selEl.className = 'dc-annotation-selector'
        selEl.textContent = a.selector
        item.appendChild(selEl)

        this._listEl.appendChild(item)
      })
    },

    // --- Persistence ---

    async _loadAnnotations() {
      try {
        const res = await fetch(ANNOTATIONS_URL)
        if (res.ok) this._annotations = await res.json()
      } catch { /* first run, no file */ }
    },

    async _saveAnnotations() {
      try {
        await fetch(SAVE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this._annotations),
        })
      } catch (err) {
        console.error('[DevConsole] Save failed:', err)
      }
    },

    async _copyToClipboard() {
      const md = this.exportMarkdown()
      try {
        await navigator.clipboard.writeText(md)
        console.log('[DevConsole] Copied to clipboard')
      } catch {
        console.warn('[DevConsole] Clipboard unavailable')
      }
    },
  }

  // Register with shell
  if (window.__devConsole) {
    window.__devConsole.registerModule(mod)
  } else {
    console.error('[DevConsole] Shell not found — annotation module must load after shell.js')
  }
})()
