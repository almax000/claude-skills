/**
 * Component Boundaries Module — Vue component outline visualization
 *
 * Self-registers with window.__devConsole when loaded as <script>.
 * Walks DOM for Vue 2/3 component instances, draws colored overlays
 * with labels. Click a label to inspect props/slots/file path.
 */
;(function () {
  'use strict'

  var t = window.__dcI18n ? window.__dcI18n.t : function (k, fb) { return fb || k }
  document.addEventListener('dc-locale-change', function () {
    if (window.__dcI18n) t = window.__dcI18n.t
  })

  var COLORS = ['#6366f1', '#f472b6', '#34d399', '#fbbf24', '#60a5fa', '#a78bfa']
  var MAX_OVERLAYS = 200

  function debounce(fn, ms) {
    var timer = null
    return function () {
      clearTimeout(timer)
      timer = setTimeout(fn, ms)
    }
  }

  function getComponentName(vnode) {
    if (!vnode) return null
    var type = vnode.type || {}
    return type.name || type.__name || extractFilename(type.__file) || null
  }

  function extractFilename(filepath) {
    if (!filepath) return null
    var parts = filepath.split('/')
    var file = parts[parts.length - 1]
    return file.replace(/\.vue$/, '')
  }

  function getComponentDepth(el) {
    var depth = 0
    var current = el.parentElement
    while (current) {
      if (current.__vueParentComponent || current.__vue__) depth++
      current = current.parentElement
    }
    return depth
  }

  function getVueInfo(el) {
    var vn = el.__vueParentComponent
    if (vn) {
      var t = vn.type || {}
      return { version: 3, name: getComponentName(vn), props: vn.props || {},
        file: t.__file || null, slots: vn.slots ? Object.keys(vn.slots) : [] }
    }
    var vm = el.__vue__
    if (vm) {
      var o = vm.$options || {}
      return { version: 2, name: o.name || o._componentTag || null, props: vm.$props || {},
        file: o.__file || null, slots: vm.$slots ? Object.keys(vm.$slots) : [] }
    }
    return null
  }

  var mod = {
    id: 'component-boundaries',
    label: 'Boundaries',
    labelKey: 'bnd.tab',

    _ctx: null,
    _active: false,
    _showAll: false,
    _overlays: [],
    _toolbarEl: null,
    _detailsEl: null,
    _countEl: null,
    _onScroll: null,
    _onResize: null,

    init: function (ctx) {
      this._ctx = ctx
      this._buildUI(ctx.container)

      var self = this
      var reposition = debounce(function () {
        if (self._active) self._repositionOverlays()
      }, 100)
      this._onScroll = reposition
      this._onResize = reposition
    },

    activate: function () {
      this._detailsEl.innerHTML = ''
    },

    deactivate: function () {
      if (this._active) this._hide()
    },

    // --- UI ---

    _buildUI: function (container) {
      this._toolbarEl = document.createElement('div')
      this._toolbarEl.style.cssText = 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;'

      var toggleBtn = document.createElement('button')
      toggleBtn.className = 'dc-btn dc-btn--primary dc-boundary-toggle'
      toggleBtn.textContent = t('bnd.show', 'Show Boundaries')
      var self = this
      toggleBtn.onclick = function () { self._active ? self._hide() : self._show() }
      this._toolbarEl.appendChild(toggleBtn)

      var refreshBtn = document.createElement('button')
      refreshBtn.className = 'dc-btn dc-btn--ghost dc-btn--sm'
      refreshBtn.textContent = t('bnd.refresh', 'Refresh')
      refreshBtn.onclick = function () { if (self._active) { self._clearOverlays(); self._scan() } }
      this._toolbarEl.appendChild(refreshBtn)

      var filterBtn = document.createElement('button')
      filterBtn.className = 'dc-btn dc-btn--ghost dc-btn--sm dc-boundary-filter'
      filterBtn.textContent = t('bnd.showAll', 'Show All')
      filterBtn.onclick = function () {
        self._showAll = !self._showAll
        filterBtn.textContent = self._showAll ? t('bnd.namedOnly', 'Named Only') : t('bnd.showAll', 'Show All')
        if (self._active) { self._clearOverlays(); self._scan() }
      }
      this._toolbarEl.appendChild(filterBtn)

      this._countEl = document.createElement('span')
      this._countEl.style.cssText = 'font-size:11px;color:var(--dc-text-tertiary,#a1a1aa);margin-left:auto;'
      this._toolbarEl.appendChild(this._countEl)

      container.appendChild(this._toolbarEl)

      this._detailsEl = document.createElement('div')
      this._detailsEl.className = 'dc-boundary-details'
      this._detailsEl.setAttribute('data-empty-hint', t('bnd.clickInspect', 'Click a component label on the page to inspect it'))
      container.appendChild(this._detailsEl)
    },

    // --- Show / Hide ---

    _show: function () {
      this._active = true
      var btn = this._toolbarEl.querySelector('.dc-boundary-toggle')
      btn.textContent = t('bnd.hide', 'Hide Boundaries')
      btn.classList.add('dc-btn--danger')
      this._scan()
      window.addEventListener('scroll', this._onScroll, { passive: true, capture: true })
      window.addEventListener('resize', this._onResize, { passive: true })
    },

    _hide: function () {
      this._active = false
      var btn = this._toolbarEl.querySelector('.dc-boundary-toggle')
      btn.textContent = t('bnd.show', 'Show Boundaries')
      btn.classList.remove('dc-btn--danger')
      this._clearOverlays()
      this._countEl.textContent = ''
      this._detailsEl.innerHTML = ''
      window.removeEventListener('scroll', this._onScroll, { capture: true })
      window.removeEventListener('resize', this._onResize)
    },

    // --- Scan ---

    _scan: function () {
      var self = this
      var allEls = document.querySelectorAll('*')
      var components = []

      for (var i = 0; i < allEls.length; i++) {
        var el = allEls[i]
        if (el.closest && el.closest('[data-dev-console]')) continue
        if (window.__devConsole && window.__devConsole._isConsoleElement && window.__devConsole._isConsoleElement(el)) continue

        var info = getVueInfo(el)
        if (!info) continue
        if (!self._showAll && !info.name) continue

        components.push({ el: el, info: info })
      }

      var total = components.length
      var capped = total > MAX_OVERLAYS
      var slice = capped ? components.slice(0, MAX_OVERLAYS) : components

      for (var j = 0; j < slice.length; j++) {
        self._createOverlay(slice[j].el, slice[j].info)
      }

      var compWord = slice.length !== 1 ? t('bnd.components', 'components') : t('bnd.component', 'component')
      var label = slice.length + ' ' + compWord
      if (capped) label += ' (' + t('bnd.showing', 'showing') + ' ' + MAX_OVERLAYS + ' ' + t('bnd.of', 'of') + ' ' + total + ')'
      this._countEl.textContent = label
    },

    // --- Overlay creation ---

    _createOverlay: function (el, info) {
      var rect = el.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) return

      var depth = getComponentDepth(el)
      var color = COLORS[depth % COLORS.length]
      var displayName = info.name || '(anonymous)'

      var overlay = document.createElement('div')
      overlay.setAttribute('data-dev-console', 'boundary')
      overlay.className = 'dc-boundary-overlay'
      overlay.style.cssText = 'position:fixed;pointer-events:none;border:1.5px solid ' + color
        + ';background:' + color + '0a;z-index:2147483644;box-sizing:border-box;left:' + rect.left
        + 'px;top:' + rect.top + 'px;width:' + rect.width + 'px;height:' + rect.height + 'px'

      var label = document.createElement('div')
      label.className = 'dc-boundary-label'
      label.style.cssText = 'position:absolute;top:0;left:0;background:' + color
        + ';color:#fff;font-size:10px;line-height:1;padding:2px 5px;border-radius:0 0 3px 0'
        + ';white-space:nowrap;pointer-events:auto;cursor:pointer;font-family:ui-monospace,monospace'
        + ';max-width:200px;overflow:hidden;text-overflow:ellipsis'
      var w = Math.round(rect.width)
      var h = Math.round(rect.height)
      label.textContent = displayName + ' (' + w + '\u00d7' + h + ')'

      var self = this
      label.addEventListener('click', function (e) {
        e.stopPropagation()
        self._showDetails(info, rect)
      })

      overlay.appendChild(label)
      document.body.appendChild(overlay)
      this._overlays.push({ overlay: overlay, el: el })
    },

    // --- Reposition on scroll/resize ---

    _repositionOverlays: function () {
      for (var i = 0; i < this._overlays.length; i++) {
        var entry = this._overlays[i]
        var el = entry.el
        var ov = entry.overlay

        if (!document.body.contains(el)) {
          ov.style.display = 'none'
          continue
        }

        var rect = el.getBoundingClientRect()
        ov.style.left = rect.left + 'px'
        ov.style.top = rect.top + 'px'
        ov.style.width = rect.width + 'px'
        ov.style.height = rect.height + 'px'
        ov.style.display = ''

        var lbl = ov.querySelector('.dc-boundary-label')
        if (lbl) {
          var name = lbl.textContent.split(' (')[0]
          lbl.textContent = name + ' (' + Math.round(rect.width) + '\u00d7' + Math.round(rect.height) + ')'
        }
      }
    },

    // --- Clear overlays ---

    _clearOverlays: function () {
      for (var i = 0; i < this._overlays.length; i++) {
        var ov = this._overlays[i].overlay
        if (ov.parentNode) ov.parentNode.removeChild(ov)
      }
      this._overlays = []
    },

    // --- Detail panel ---

    _showDetails: function (info, rect) {
      var det = this._detailsEl
      det.innerHTML = ''

      var heading = document.createElement('div')
      heading.style.cssText = 'font-weight:600;font-size:13px;color:var(--dc-text-accent,#a5b4fc);margin-bottom:6px;'
      heading.textContent = info.name || '(anonymous)'
      det.appendChild(heading)

      this._addPropRow(det, 'Vue', 'v' + info.version)
      this._addPropRow(det, 'Size', Math.round(rect.width) + '\u00d7' + Math.round(rect.height))

      if (info.file) {
        this._addPropRow(det, 'File', info.file)
      }

      if (info.slots && info.slots.length) {
        this._addPropRow(det, 'Slots', info.slots.join(', '))
      }

      var props = info.props
      var propKeys = Object.keys(props)
      if (propKeys.length) {
        var propsHeading = document.createElement('div')
        propsHeading.style.cssText = 'font-weight:600;font-size:12px;color:var(--dc-text-accent-alt,#c4b5fd);margin-top:8px;margin-bottom:4px;'
        propsHeading.textContent = t('bnd.props', 'Props') + ' (' + propKeys.length + ')'
        det.appendChild(propsHeading)

        var shown = propKeys.slice(0, 20)
        for (var i = 0; i < shown.length; i++) {
          var key = shown[i]
          var val = props[key]
          var display = this._formatPropValue(val)
          this._addPropRow(det, key, display)
        }

        if (propKeys.length > 20) {
          var more = document.createElement('div')
          more.className = 'dc-boundary-prop'
          more.style.cssText = 'font-size:11px;color:var(--dc-text-tertiary,#a1a1aa);font-style:italic;'
          more.textContent = t('bnd.andMore', '...and {n} more').replace('{n}', propKeys.length - 20)
          det.appendChild(more)
        }
      }
    },

    _addPropRow: function (parent, label, value) {
      var row = document.createElement('div')
      row.className = 'dc-boundary-prop'
      row.style.cssText = 'display:flex;gap:8px;font-size:11px;line-height:1.5;'
      var lbl = document.createElement('span')
      lbl.style.cssText = 'color:var(--dc-text-tertiary,#a1a1aa);min-width:50px;flex-shrink:0;'
      lbl.textContent = label
      var val = document.createElement('span')
      val.style.cssText = 'color:var(--dc-text-primary,#f5f5f4);word-break:break-all;'
      val.textContent = String(value)
      row.appendChild(lbl)
      row.appendChild(val)
      parent.appendChild(row)
    },

    _formatPropValue: function (val) {
      if (val == null) return String(val)
      if (typeof val === 'function') return 'fn()'
      if (typeof val === 'object') {
        try { var j = JSON.stringify(val); return j.length > 80 ? j.slice(0, 77) + '...' : j }
        catch (_) { return '[Object]' }
      }
      var s = String(val)
      return s.length > 80 ? s.slice(0, 77) + '...' : s
    }
  }

  // Register with shell
  if (window.__devConsole) {
    window.__devConsole.registerModule(mod)
  } else {
    console.error('[DevConsole] Shell not found — component-boundaries module must load after shell.js')
  }
})()
