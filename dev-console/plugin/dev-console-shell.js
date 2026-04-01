/**
 * Dev Console Shell — Shadow DOM host + side panel + tab system + window.__devConsole API
 *
 * Injected by vite-plugin-dev-console in dev mode only.
 * All UI lives inside a Shadow DOM to avoid style collisions with the host app.
 * Depends on: dev-console-i18n.js, dev-console-theme.js (loaded before this).
 */

var DC_VERSION = '2.0.0'
var DC_ROOT_ID = '__dev-console-root__'
var DC_ATTR = 'data-dev-console'
var DC_WIDTH_KEY = 'dc-panel-width'
var DC_MIN_W = 280
var DC_MAX_W_RATIO = 0.5

// Idempotent guard (HMR safety)
if (window.__devConsole) {
  console.debug('[DevConsole] Already initialized, skipping (HMR reload)')
} else {
  initDevConsole()
}

function initDevConsole() {
  var t = window.__dcI18n ? window.__dcI18n.t : function (k, fb) { return fb || k }
  var modules = new Map()
  var activeModuleId = null
  var isOpen = false

  // --- Shadow DOM host ---
  var host = document.createElement('div')
  host.id = DC_ROOT_ID
  host.setAttribute(DC_ATTR, 'host')
  document.body.appendChild(host)

  var shadow = host.attachShadow({ mode: 'open' })

  var linkEl = document.createElement('link')
  linkEl.rel = 'stylesheet'
  linkEl.href = '/__dev-console/shell.css'
  shadow.appendChild(linkEl)

  // --- Container (theme-aware root) ---
  var container = document.createElement('div')
  container.className = 'dc-container'
  container.setAttribute(DC_ATTR, 'container')
  var theme = window.__dcTheme ? window.__dcTheme.getTheme() : 'dark'
  container.setAttribute('data-dc-theme', theme)
  shadow.appendChild(container)

  // --- Edge trigger ---
  var trigger = document.createElement('button')
  trigger.className = 'dc-trigger'
  trigger.setAttribute(DC_ATTR, 'trigger')
  trigger.title = t('shell.toggle', 'Dev Console')
  trigger.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>'
  trigger.onclick = function () { api.open() }
  container.appendChild(trigger)

  // --- Side Panel ---
  var panel = document.createElement('div')
  panel.className = 'dc-panel'
  panel.setAttribute(DC_ATTR, 'panel')

  // Restore persisted width
  try {
    var savedW = parseInt(localStorage.getItem(DC_WIDTH_KEY), 10)
    if (savedW >= DC_MIN_W) container.style.setProperty('--dc-panel-width', savedW + 'px')
  } catch { /* */ }

  // Resize handle
  var resizeHandle = document.createElement('div')
  resizeHandle.className = 'dc-panel__resize-handle'
  panel.appendChild(resizeHandle)
  setupResize(resizeHandle, panel, container)

  // Header
  var header = document.createElement('div')
  header.className = 'dc-header'

  var tabBar = document.createElement('div')
  tabBar.className = 'dc-tab-bar'

  var headerActions = document.createElement('div')
  headerActions.className = 'dc-header-actions'

  // Language toggle
  var langBtn = document.createElement('button')
  langBtn.className = 'dc-header-btn'
  langBtn.title = 'Language'
  langBtn.textContent = window.__dcI18n ? window.__dcI18n.getLocale().toUpperCase() : 'EN'
  langBtn.onclick = function () {
    if (!window.__dcI18n) return
    var next = window.__dcI18n.getLocale() === 'en' ? 'zh' : 'en'
    window.__dcI18n.setLocale(next)
  }
  headerActions.appendChild(langBtn)

  // Theme toggle
  var themeBtn = document.createElement('button')
  themeBtn.className = 'dc-header-btn'
  themeBtn.title = 'Theme'
  updateThemeIcon(themeBtn, theme)
  themeBtn.onclick = function () {
    if (!window.__dcTheme) return
    var next = window.__dcTheme.getTheme() === 'dark' ? 'light' : 'dark'
    window.__dcTheme.setTheme(next)
  }
  headerActions.appendChild(themeBtn)

  // Close button
  var closeBtn = document.createElement('button')
  closeBtn.className = 'dc-header-btn'
  closeBtn.title = t('shell.close', 'Close')
  closeBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 2l10 10M12 2L2 12"/></svg>'
  closeBtn.onclick = function () { api.close() }
  headerActions.appendChild(closeBtn)

  header.appendChild(tabBar)
  header.appendChild(headerActions)
  panel.appendChild(header)

  // Content area
  var content = document.createElement('div')
  content.className = 'dc-content'
  panel.appendChild(content)
  container.appendChild(panel)

  // --- Theme change listener ---
  document.addEventListener('dc-theme-change', function (e) {
    container.setAttribute('data-dc-theme', e.detail.theme)
    updateThemeIcon(themeBtn, e.detail.theme)
  })

  // --- Locale change listener ---
  document.addEventListener('dc-locale-change', function (e) {
    t = window.__dcI18n.t
    langBtn.textContent = e.detail.locale.toUpperCase()
    trigger.title = t('shell.toggle', 'Dev Console')
    closeBtn.title = t('shell.close', 'Close')
    // Update tab labels
    modules.forEach(function (entry) {
      if (entry.instance.labelKey) {
        entry.tab.textContent = t(entry.instance.labelKey, entry.instance.label)
      }
    })
  })

  // --- Tab switching ---
  function switchTab(moduleId) {
    if (!modules.has(moduleId)) return
    if (activeModuleId && modules.has(activeModuleId)) {
      modules.get(activeModuleId).instance.deactivate?.()
    }
    activeModuleId = moduleId
    tabBar.querySelectorAll('.dc-tab').forEach(function (tab) {
      tab.classList.toggle('dc-tab--active', tab.dataset.moduleId === moduleId)
    })
    content.querySelectorAll('.dc-module-content').forEach(function (el) {
      el.style.display = el.dataset.moduleId === moduleId ? 'flex' : 'none'
    })
    modules.get(moduleId).instance.activate?.()
  }

  // --- Module registry ---
  function registerModule(mod) {
    if (modules.has(mod.id)) return

    var tab = document.createElement('button')
    tab.className = 'dc-tab'
    tab.dataset.moduleId = mod.id
    tab.textContent = mod.labelKey ? t(mod.labelKey, mod.label) : mod.label
    tab.onclick = function () { switchTab(mod.id) }
    tabBar.appendChild(tab)

    var moduleContent = document.createElement('div')
    moduleContent.className = 'dc-module-content'
    moduleContent.dataset.moduleId = mod.id
    moduleContent.style.display = 'none'
    content.appendChild(moduleContent)

    mod.init({ container: moduleContent, shadow: shadow, host: host, api: api })
    modules.set(mod.id, { instance: mod, tab: tab, contentEl: moduleContent })

    if (modules.size === 1) switchTab(mod.id)
  }

  // --- Public API ---
  var api = {
    version: DC_VERSION,
    isOpen: function () { return isOpen },

    open: function () {
      isOpen = true
      panel.classList.add('dc-panel--open')
      trigger.classList.add('dc-trigger--hidden')
      if (activeModuleId) modules.get(activeModuleId)?.instance.activate?.()
      // Split-pane: push page content to make room
      pushPageContent(panel)
      dispatchResize(true)
    },

    close: function () {
      isOpen = false
      panel.classList.remove('dc-panel--open')
      trigger.classList.remove('dc-trigger--hidden')
      if (activeModuleId) modules.get(activeModuleId)?.instance.deactivate?.()
      // Split-pane: restore page content
      restorePageContent()
      dispatchResize(false)
    },

    toggle: function () { isOpen ? api.close() : api.open() },
    registerModule: registerModule,

    execute: function (moduleId, command, args) {
      var mod = modules.get(moduleId)
      if (!mod) return { error: 'Module "' + moduleId + '" not found' }
      if (typeof mod.instance[command] !== 'function') {
        return { error: 'Command "' + command + '" not found on module "' + moduleId + '"' }
      }
      return mod.instance[command](args)
    },

    annotate: {
      start: function () { return api.execute('annotation', 'start') },
      stop: function () { return api.execute('annotation', 'stop') },
      list: function () { return api.execute('annotation', 'list') },
      resolve: function (i) { return api.execute('annotation', 'resolve', i) },
      exportMarkdown: function () { return api.execute('annotation', 'exportMarkdown') },
      exportJSON: function () { return api.execute('annotation', 'exportJSON') },
    },
  }

  window.__devConsole = api

  // Helper: check if an element belongs to dev-console
  window.__devConsole._isConsoleElement = function (el) {
    if (!el) return false
    if (el === host) return true
    if (el.hasAttribute?.(DC_ATTR)) return true
    var node = el
    while (node) {
      if (node === host || node === shadow) return true
      node = node.parentNode || node.host
    }
    return false
  }

  // --- Keyboard shortcuts ---
  document.addEventListener('keydown', function (e) {
    var tag = e.target.tagName
    if ((tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') &&
        !window.__devConsole._isConsoleElement(e.target)) return

    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault()
      api.toggle()
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault()
      if (!isOpen) api.open()
      var ann = modules.get('annotation')
      if (ann) {
        var st = ann.instance._state
        if (st === 'idle') ann.instance.start()
        else if (st === 'selecting') ann.instance.stop()
      }
    }
    if (e.key === 'Escape') {
      var ann2 = modules.get('annotation')
      if (ann2) {
        var st2 = ann2.instance._state
        if (st2 === 'form_open') { ann2.instance._closeForm(); return }
        if (st2 === 'selecting') { ann2.instance.stop(); return }
      }
      if (isOpen) api.close()
    }
  })

  // --- Split-pane: push/restore page content ---
  // Many apps use `width: 100vw` on layout containers. The `vw` unit is viewport-based
  // and ignores body margin/width. We inject a <style> to override these with a CSS variable.
  var DC_SPLIT_STYLE_ID = 'dc-split-pane-style'

  function pushPageContent(panelEl) {
    var w = panelEl.offsetWidth || parseInt(getComputedStyle(container).getPropertyValue('--dc-panel-width')) || 380
    var pageW = (window.innerWidth - w) + 'px'

    // Set CSS variable on documentElement for any app code that wants to react
    document.documentElement.style.setProperty('--dc-page-width', pageW)
    document.documentElement.setAttribute('data-dc-open', '')

    // Inject style that overrides 100vw on html/body and common layout roots
    var style = document.getElementById(DC_SPLIT_STYLE_ID)
    if (!style) {
      style = document.createElement('style')
      style.id = DC_SPLIT_STYLE_ID
      style.setAttribute(DC_ATTR, 'split-pane')
      document.head.appendChild(style)
    }
    style.textContent =
      'html[data-dc-open], html[data-dc-open] > body { ' +
        'width: ' + pageW + ' !important; overflow-x: hidden !important; ' +
        'transition: width 0.25s ease !important; }' +
      'html[data-dc-open] > body > #app { ' +
        'width: ' + pageW + ' !important; overflow-x: hidden !important; }' +
      'html[data-dc-open] #app * { ' +
        'max-width: ' + pageW + ' !important; }'
  }

  function restorePageContent() {
    document.documentElement.removeAttribute('data-dc-open')
    document.documentElement.style.removeProperty('--dc-page-width')

    // Remove override styles
    var style = document.getElementById(DC_SPLIT_STYLE_ID)
    if (style) {
      // Brief transition before removing
      style.textContent =
        'html, html > body { transition: width 0.25s ease !important; }'
      setTimeout(function () {
        if (!isOpen && style.parentNode) style.parentNode.removeChild(style)
      }, 300)
    }
  }

  function dispatchResize(open) {
    var w = panel.offsetWidth
    document.dispatchEvent(new CustomEvent('dc-panel-resize', { detail: { width: w, open: open } }))
  }

  console.log(
    '%c[DevConsole]%c v' + DC_VERSION + ' loaded — Ctrl+Shift+D to toggle',
    'color: #6366f1; font-weight: bold', 'color: inherit'
  )
}

// --- Resize handle logic (E025: iframe protection overlay) ---
function setupResize(handle, panel, container) {
  var isResizing = false
  var overlay = null

  handle.addEventListener('mousedown', function (e) {
    e.preventDefault()
    isResizing = true
    handle.classList.add('dc-panel__resize-handle--active')

    // Create full-viewport overlay to prevent iframe from swallowing events
    overlay = document.createElement('div')
    overlay.className = 'dc-resize-overlay'
    container.appendChild(overlay)

    var onMove = function (me) {
      if (!isResizing) return
      var w = window.innerWidth - me.clientX
      var maxW = window.innerWidth * DC_MAX_W_RATIO
      if (w < DC_MIN_W) w = DC_MIN_W
      if (w > maxW) w = maxW
      container.style.setProperty('--dc-panel-width', w + 'px')
      // Split-pane: update page width via injected style (no transition during drag)
      var pageW = (window.innerWidth - w) + 'px'
      document.documentElement.style.setProperty('--dc-page-width', pageW)
      var style = document.getElementById('dc-split-pane-style')
      if (style) {
        style.textContent =
          'html[data-dc-open], html[data-dc-open] > body { ' +
            'width: ' + pageW + ' !important; overflow-x: hidden !important; }' +
          'html[data-dc-open] > body > #app { ' +
            'width: ' + pageW + ' !important; overflow-x: hidden !important; }' +
          'html[data-dc-open] #app * { ' +
            'max-width: ' + pageW + ' !important; }'
      }
    }

    var onUp = function () {
      isResizing = false
      handle.classList.remove('dc-panel__resize-handle--active')
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay)
      overlay = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      // Persist width + restore transition
      var finalW = panel.offsetWidth
      try { localStorage.setItem(DC_WIDTH_KEY, String(finalW)) } catch { /* */ }
      var pageW = (window.innerWidth - finalW) + 'px'
      document.documentElement.style.setProperty('--dc-page-width', pageW)
      var style = document.getElementById('dc-split-pane-style')
      if (style) {
        style.textContent =
          'html[data-dc-open], html[data-dc-open] > body { ' +
            'width: ' + pageW + ' !important; overflow-x: hidden !important; ' +
            'transition: width 0.25s ease !important; }' +
          'html[data-dc-open] > body > #app { ' +
            'width: ' + pageW + ' !important; overflow-x: hidden !important; }' +
          'html[data-dc-open] #app * { ' +
            'max-width: ' + pageW + ' !important; }'
      }
      document.dispatchEvent(new CustomEvent('dc-panel-resize', { detail: { width: finalW, open: true } }))
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  })
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === 'dark'
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
}
