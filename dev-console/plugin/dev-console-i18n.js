/**
 * Dev Console i18n — lightweight bilingual string system (EN/ZH)
 *
 * Loaded before shell.js. Exposes window.__dcI18n with t(key, fallback).
 * Dispatches 'dc-locale-change' CustomEvent on document when locale changes.
 */
;(function () {
  'use strict'

  var STORAGE_KEY = 'dc-locale'
  var DEFAULT_LOCALE = 'en'

  var strings = {
    en: {
      // Shell
      'shell.title': 'Dev Console',
      'shell.close': 'Close',
      'shell.toggle': 'Dev Console',
      // Annotation module
      'ann.tab': 'Annotate',
      'ann.startAnnotating': 'Start Annotating',
      'ann.stopAnnotating': 'Stop Annotating',
      'ann.copyMd': 'Copy MD',
      'ann.feedback': 'Feedback',
      'ann.describe': 'Describe the issue...',
      'ann.save': 'Save',
      'ann.cancel': 'Cancel',
      'ann.noAnnotations': 'No annotations yet',
      'ann.clickStart': 'Click "Start Annotating" to begin',
      'ann.resolve': 'Resolve',
      'ann.annotating': 'Annotating:',
      'ann.high': 'High',
      'ann.medium': 'Medium',
      'ann.low': 'Low',
      'ann.bug': 'Bug',
      'ann.styling': 'Styling',
      'ann.improvement': 'Improvement',
      'ann.question': 'Question',
      // CSS Vars module
      'vars.tab': 'CSS Vars',
      'vars.filter': 'Filter variables...',
      'vars.resetAll': 'Reset All',
      'vars.export': 'Export',
      'vars.rescan': 'Re-scan',
      'vars.noMatch': 'No matching variables',
      'vars.noVars': 'No CSS variables found',
      'vars.computed': 'Computed:',
      'vars.reset': 'Reset',
      // Boundaries module
      'bnd.tab': 'Boundaries',
      'bnd.show': 'Show Boundaries',
      'bnd.hide': 'Hide Boundaries',
      'bnd.refresh': 'Refresh',
      'bnd.showAll': 'Show All',
      'bnd.namedOnly': 'Named Only',
      'bnd.component': 'component',
      'bnd.components': 'components',
      'bnd.showing': 'showing',
      'bnd.of': 'of',
      'bnd.clickInspect': 'Click a component label on the page to inspect it',
      'bnd.props': 'Props',
      'bnd.andMore': '...and {n} more',
    },
    zh: {
      'shell.title': 'Dev Console',
      'shell.close': '\u5173\u95ed',
      'shell.toggle': 'Dev Console',
      'ann.tab': '\u6807\u6ce8',
      'vars.tab': 'CSS \u53d8\u91cf',
      'bnd.tab': '\u8fb9\u754c',
      'ann.startAnnotating': '\u5f00\u59cb\u6807\u6ce8',
      'ann.stopAnnotating': '\u505c\u6b62\u6807\u6ce8',
      'ann.copyMd': '\u590d\u5236 MD',
      'ann.feedback': '\u53cd\u9988',
      'ann.describe': '\u63cf\u8ff0\u95ee\u9898...',
      'ann.save': '\u4fdd\u5b58',
      'ann.cancel': '\u53d6\u6d88',
      'ann.noAnnotations': '\u6682\u65e0\u6807\u6ce8',
      'ann.clickStart': '\u70b9\u51fb\u201c\u5f00\u59cb\u6807\u6ce8\u201d\u5f00\u59cb',
      'ann.resolve': '\u5df2\u89e3\u51b3',
      'ann.annotating': '\u6b63\u5728\u6807\u6ce8:',
      'ann.high': '\u9ad8',
      'ann.medium': '\u4e2d',
      'ann.low': '\u4f4e',
      'ann.bug': 'Bug',
      'ann.styling': '\u6837\u5f0f',
      'ann.improvement': '\u6539\u8fdb',
      'ann.question': '\u95ee\u9898',
      'vars.filter': '\u7b5b\u9009\u53d8\u91cf...',
      'vars.resetAll': '\u5168\u90e8\u91cd\u7f6e',
      'vars.export': '\u5bfc\u51fa',
      'vars.rescan': '\u91cd\u65b0\u626b\u63cf',
      'vars.noMatch': '\u65e0\u5339\u914d\u53d8\u91cf',
      'vars.noVars': '\u672a\u53d1\u73b0 CSS \u53d8\u91cf',
      'vars.computed': '\u8ba1\u7b97\u503c:',
      'vars.reset': '\u91cd\u7f6e',
      'bnd.show': '\u663e\u793a\u8fb9\u754c',
      'bnd.hide': '\u9690\u85cf\u8fb9\u754c',
      'bnd.refresh': '\u5237\u65b0',
      'bnd.showAll': '\u663e\u793a\u5168\u90e8',
      'bnd.namedOnly': '\u4ec5\u547d\u540d\u7ec4\u4ef6',
      'bnd.component': '\u4e2a\u7ec4\u4ef6',
      'bnd.components': '\u4e2a\u7ec4\u4ef6',
      'bnd.showing': '\u663e\u793a',
      'bnd.of': '/',
      'bnd.clickInspect': '\u70b9\u51fb\u9875\u9762\u4e0a\u7684\u7ec4\u4ef6\u6807\u7b7e\u67e5\u770b\u8be6\u60c5',
      'bnd.props': '\u5c5e\u6027',
      'bnd.andMore': '...\u8fd8\u6709 {n} \u4e2a',
    },
  }

  var currentLocale = DEFAULT_LOCALE

  // Restore from localStorage
  try {
    var saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') currentLocale = saved
  } catch { /* localStorage unavailable */ }

  window.__dcI18n = {
    t: function (key, fallback) {
      var dict = strings[currentLocale] || strings[DEFAULT_LOCALE]
      return dict[key] !== undefined ? dict[key] : (fallback || key)
    },

    setLocale: function (locale) {
      if (locale !== 'en' && locale !== 'zh') return
      currentLocale = locale
      try { localStorage.setItem(STORAGE_KEY, locale) } catch { /* */ }
      document.dispatchEvent(new CustomEvent('dc-locale-change', { detail: { locale: locale } }))
    },

    getLocale: function () {
      return currentLocale
    },
  }
})()
