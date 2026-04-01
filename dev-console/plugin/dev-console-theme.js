/**
 * Dev Console Theme — dark/light mode with host page auto-detection
 *
 * Loaded before shell.js. Exposes window.__dcTheme.
 * Dispatches 'dc-theme-change' CustomEvent on document when theme changes.
 * Auto-detects host page theme via html.dark, data-theme, prefers-color-scheme.
 * MutationObserver + matchMedia listener for runtime host theme changes.
 */
;(function () {
  'use strict'

  var STORAGE_KEY = 'dc-theme'
  var currentTheme = 'dark'
  var autoMode = true // track if user has manually set a theme
  var observer = null

  function detectHostTheme() {
    var html = document.documentElement
    // 1. Check class-based dark mode (html.dark, html.theme-dark)
    if (html.classList.contains('dark') || html.classList.contains('theme-dark')) return 'dark'
    // 2. Check data-theme attribute
    var dt = html.getAttribute('data-theme')
    if (dt === 'dark') return 'dark'
    if (dt === 'light') return 'light'
    // 3. Check prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
    return 'dark' // default
  }

  // Restore from localStorage or auto-detect
  try {
    var saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') {
      currentTheme = saved
      autoMode = false
    } else {
      currentTheme = detectHostTheme()
    }
  } catch {
    currentTheme = detectHostTheme()
  }

  function applyTheme(theme) {
    currentTheme = theme
    document.dispatchEvent(new CustomEvent('dc-theme-change', { detail: { theme: theme } }))
  }

  // Watch for host page theme changes (only react if in auto mode)
  function setupHostObserver() {
    // MutationObserver for class/data-theme changes on <html>
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(function () {
        if (!autoMode) return
        var detected = detectHostTheme()
        if (detected !== currentTheme) applyTheme(detected)
      })
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme'],
      })
    }

    // matchMedia listener for system theme changes
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)')
      var handler = function () {
        if (!autoMode) return
        var detected = detectHostTheme()
        if (detected !== currentTheme) applyTheme(detected)
      }
      if (mq.addEventListener) mq.addEventListener('change', handler)
      else if (mq.addListener) mq.addListener(handler)
    }
  }

  setupHostObserver()

  window.__dcTheme = {
    getTheme: function () {
      return currentTheme
    },

    setTheme: function (theme) {
      if (theme !== 'dark' && theme !== 'light') return
      autoMode = false
      currentTheme = theme
      try { localStorage.setItem(STORAGE_KEY, theme) } catch { /* */ }
      applyTheme(theme)
    },

    detectHostTheme: detectHostTheme,

    // Reset to auto-detection mode
    setAuto: function () {
      autoMode = true
      try { localStorage.removeItem(STORAGE_KEY) } catch { /* */ }
      var detected = detectHostTheme()
      if (detected !== currentTheme) applyTheme(detected)
    },
  }
})()
