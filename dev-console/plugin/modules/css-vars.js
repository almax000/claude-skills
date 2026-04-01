/**
 * CSS Variables Inspector Module — live custom property viewer/editor
 *
 * Self-registers with window.__devConsole when loaded as <script>.
 * Scans document.styleSheets for CSS custom properties, groups by selector,
 * supports inline editing with live preview and reset.
 */
;(function () {
  'use strict'

  var t = window.__dcI18n ? window.__dcI18n.t : function (k, fb) { return fb || k }
  document.addEventListener('dc-locale-change', function () {
    if (window.__dcI18n) t = window.__dcI18n.t
  })

  const mod = {
    id: 'css-vars',
    label: 'CSS Vars',
    labelKey: 'vars.tab',

    _ctx: null,
    _containerEl: null,
    _searchEl: null,
    _listEl: null,
    _toolbarEl: null,
    _variables: [],       // { name, value, selector, source }
    _overrides: new Map(), // name → original computed value

    init(ctx) {
      this._ctx = ctx
      this._buildUI(ctx.container)
    },

    activate() {
      this._scan()
      this._render()
    },

    deactivate() {},

    // --- Scanning ---

    _scan() {
      const varMap = new Map() // name → { value, selector, source }

      // 1. Iterate styleSheets for declared custom properties
      for (let i = 0; i < document.styleSheets.length; i++) {
        let rules
        try { rules = document.styleSheets[i].cssRules } catch { continue }
        if (!rules) continue

        const href = document.styleSheets[i].href
        const source = href ? href.split('/').pop() : 'inline'

        for (let j = 0; j < rules.length; j++) {
          this._extractFromRule(rules[j], source, varMap)
        }
      }

      // 2. Also pick up inline style overrides on documentElement and body
      this._extractInlineVars(document.documentElement, 'html (inline)', varMap)
      this._extractInlineVars(document.body, 'body (inline)', varMap)

      // 3. Build sorted array grouped by selector
      this._variables = Array.from(varMap.values())
      this._variables.sort((a, b) => {
        const selectorOrder = this._selectorWeight(a.selector) - this._selectorWeight(b.selector)
        if (selectorOrder !== 0) return selectorOrder
        return a.name.localeCompare(b.name)
      })
    },

    _extractFromRule(rule, source, varMap) {
      // Extract custom properties from this rule's own style
      if (rule.style) {
        const selector = rule.selectorText || ''
        for (let i = 0; i < rule.style.length; i++) {
          const prop = rule.style[i]
          if (!prop.startsWith('--')) continue
          const value = rule.style.getPropertyValue(prop).trim()
          varMap.set(prop + '||' + selector, {
            name: prop,
            value,
            computed: getComputedStyle(document.documentElement).getPropertyValue(prop).trim(),
            selector: selector,
            source: source,
          })
        }
      }

      // Recurse into nested rules (@media, @supports, @layer, CSS nesting)
      // Note: modern browsers give CSSStyleRule a cssRules property (CSS Nesting),
      // so we must check style BEFORE recursing, not use early return
      if (rule.cssRules && rule.cssRules.length > 0) {
        for (let i = 0; i < rule.cssRules.length; i++) {
          this._extractFromRule(rule.cssRules[i], source, varMap)
        }
      }
    },

    _extractInlineVars(el, label, varMap) {
      if (!el || !el.style) return
      for (let i = 0; i < el.style.length; i++) {
        const prop = el.style[i]
        if (!prop.startsWith('--')) continue
        const value = el.style.getPropertyValue(prop).trim()
        varMap.set(prop + '||' + label, {
          name: prop,
          value,
          computed: getComputedStyle(document.documentElement).getPropertyValue(prop).trim(),
          selector: label,
          source: 'inline',
        })
      }
    },

    _selectorWeight(sel) {
      if (sel === ':root') return 0
      if (sel === 'html' || sel === ':root, html') return 1
      if (sel.includes('html.dark')) return 2
      if (sel === 'body') return 3
      if (sel.includes('(inline)')) return 4
      return 5
    },

    // --- Color detection ---

    _isColor(value) {
      if (!value || typeof value !== 'string') return false
      const v = value.trim()
      if (/^#([0-9a-f]{3,8})$/i.test(v)) return true
      if (/^(rgb|rgba|hsl|hsla|oklch|oklab|lch|lab|color)\s*\(/i.test(v)) return true
      const namedColors = ['transparent', 'currentcolor', 'inherit']
      if (namedColors.includes(v.toLowerCase())) return false
      // Test via browser parsing
      const probe = document.createElement('span')
      probe.style.backgroundColor = ''
      probe.style.backgroundColor = v
      return probe.style.backgroundColor !== ''
    },

    // --- UI Building ---

    _buildUI(container) {
      // Toolbar
      this._toolbarEl = document.createElement('div')
      this._toolbarEl.style.cssText = 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;'

      const searchWrap = document.createElement('div')
      searchWrap.className = 'dc-cssvar-search'
      searchWrap.style.flex = '1'

      this._searchEl = document.createElement('input')
      this._searchEl.className = 'dc-input'
      this._searchEl.type = 'text'
      this._searchEl.placeholder = t('vars.filter', 'Filter variables...')
      this._searchEl.oninput = () => this._render()
      searchWrap.appendChild(this._searchEl)
      this._toolbarEl.appendChild(searchWrap)

      const resetAllBtn = document.createElement('button')
      resetAllBtn.className = 'dc-btn dc-btn--ghost dc-btn--sm'
      resetAllBtn.textContent = t('vars.resetAll', 'Reset All')
      resetAllBtn.onclick = () => this._resetAll()
      this._toolbarEl.appendChild(resetAllBtn)

      const exportBtn = document.createElement('button')
      exportBtn.className = 'dc-btn dc-btn--ghost dc-btn--sm'
      exportBtn.textContent = t('vars.export', 'Export')
      exportBtn.onclick = () => this._exportOverrides()
      this._toolbarEl.appendChild(exportBtn)

      const rescanBtn = document.createElement('button')
      rescanBtn.className = 'dc-btn dc-btn--primary dc-btn--sm'
      rescanBtn.textContent = t('vars.rescan', 'Re-scan')
      rescanBtn.onclick = () => { this._scan(); this._render() }
      this._toolbarEl.appendChild(rescanBtn)

      container.appendChild(this._toolbarEl)

      // List
      this._listEl = document.createElement('div')
      this._listEl.style.cssText = 'overflow-y:auto;flex:1;'
      container.appendChild(this._listEl)
    },

    // --- Rendering ---

    _render() {
      this._listEl.innerHTML = ''
      const filter = (this._searchEl.value || '').toLowerCase()

      const filtered = filter
        ? this._variables.filter(v =>
            v.name.toLowerCase().includes(filter) ||
            v.value.toLowerCase().includes(filter) ||
            v.selector.toLowerCase().includes(filter))
        : this._variables

      if (!filtered.length) {
        const empty = document.createElement('div')
        empty.className = 'dc-empty'
        const icon = document.createElement('div')
        icon.style.cssText = 'font-size:28px;opacity:0.5;'
        icon.textContent = '\u2630' // trigram
        empty.appendChild(icon)
        const msg = document.createElement('div')
        msg.textContent = filter ? t('vars.noMatch', 'No matching variables') : t('vars.noVars', 'No CSS variables found')
        empty.appendChild(msg)
        this._listEl.appendChild(empty)
        return
      }

      // Group by selector
      const groups = new Map()
      for (const v of filtered) {
        const key = v.selector || '(unknown)'
        if (!groups.has(key)) groups.set(key, [])
        groups.get(key).push(v)
      }

      for (const [selector, vars] of groups) {
        const groupEl = document.createElement('div')
        groupEl.className = 'dc-cssvar-group'
        groupEl.textContent = selector + ' (' + vars.length + ')'
        this._listEl.appendChild(groupEl)

        for (const v of vars) {
          this._listEl.appendChild(this._buildVarItem(v))
        }
      }
    },

    _buildVarItem(v) {
      const item = document.createElement('div')
      item.className = 'dc-cssvar-item'

      const nameEl = document.createElement('span')
      nameEl.className = 'dc-cssvar-name'
      nameEl.textContent = v.name
      nameEl.title = v.source
      item.appendChild(nameEl)

      const computed = getComputedStyle(document.documentElement).getPropertyValue(v.name).trim()
      const isColor = this._isColor(computed)

      if (isColor) {
        const swatch = document.createElement('span')
        swatch.className = 'dc-cssvar-swatch'
        swatch.style.backgroundColor = computed
        item.appendChild(swatch)
      }

      const valueEl = document.createElement('span')
      valueEl.className = 'dc-cssvar-value'
      valueEl.textContent = v.value
      valueEl.title = t('vars.computed', 'Computed:') + ' ' + computed
      valueEl.onclick = () => this._startEditing(item, v, valueEl)
      item.appendChild(valueEl)

      if (this._overrides.has(v.name)) {
        const resetBtn = document.createElement('button')
        resetBtn.className = 'dc-cssvar-reset dc-btn dc-btn--ghost dc-btn--sm'
        resetBtn.textContent = t('vars.reset', 'Reset')
        resetBtn.onclick = (e) => { e.stopPropagation(); this._resetVar(v.name) }
        item.appendChild(resetBtn)
      }

      return item
    },

    // --- Inline editing ---

    _startEditing(item, v, valueEl) {
      const computed = getComputedStyle(document.documentElement).getPropertyValue(v.name).trim()

      const input = document.createElement('input')
      input.className = 'dc-input dc-cssvar-value'
      input.type = 'text'
      input.value = computed
      input.style.cssText = 'flex:1;min-width:80px;font-size:11px;'

      const commit = () => {
        const newVal = input.value.trim()
        if (newVal && newVal !== computed) {
          this._applyOverride(v.name, newVal, computed)
        }
        this._render()
      }

      input.onkeydown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); commit() }
        if (e.key === 'Escape') { e.preventDefault(); this._render() }
      }
      input.onblur = () => commit()

      // Live preview on input
      input.oninput = () => {
        const preview = input.value.trim()
        if (preview) {
          document.documentElement.style.setProperty(v.name, preview)
          // Update swatch if present
          const swatch = item.querySelector('.dc-cssvar-swatch')
          if (swatch && this._isColor(preview)) {
            swatch.style.backgroundColor = preview
          }
        }
      }

      valueEl.replaceWith(input)
      input.focus()
      input.select()
    },

    // --- Override management ---

    _applyOverride(name, newValue, originalComputed) {
      if (!this._overrides.has(name)) {
        this._overrides.set(name, originalComputed)
      }
      document.documentElement.style.setProperty(name, newValue)
    },

    _resetVar(name) {
      document.documentElement.style.removeProperty(name)
      this._overrides.delete(name)
      this._render()
    },

    _resetAll() {
      for (const name of this._overrides.keys()) {
        document.documentElement.style.removeProperty(name)
      }
      this._overrides.clear()
      this._render()
    },

    // --- Export ---

    _exportOverrides() {
      if (!this._overrides.size) {
        console.log('[DevConsole] No overrides to export')
        return
      }

      let css = ':root {\n'
      for (const name of this._overrides.keys()) {
        const current = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
        css += '  ' + name + ': ' + current + ';\n'
      }
      css += '}\n'

      try {
        navigator.clipboard.writeText(css)
        console.log('[DevConsole] Overrides copied to clipboard')
      } catch {
        console.warn('[DevConsole] Clipboard unavailable')
      }
    },
  }

  // Register with shell
  if (window.__devConsole) {
    window.__devConsole.registerModule(mod)
  } else {
    console.error('[DevConsole] Shell not found — css-vars module must load after shell.js')
  }
})()
