/**
 * Vite Plugin: Dev Console
 *
 * apply: 'serve' — zero production footprint.
 * Serves console resources via middleware, injects a small loader into HTML.
 * Persists annotations with atomic writes (C3).
 */

import fs from 'node:fs'
import path from 'node:path'

const MAX_BODY_SIZE = 1024 * 1024 // 1MB

export default function devConsolePlugin(options = {}) {
  const projectRoot = options.projectRoot || findProjectRoot(process.cwd())
  const pluginsDir = path.join(projectRoot, '.claude', 'plugins')
  const feedbackDir = path.join(projectRoot, '.claude', 'feedback')
  const feedbackPath = path.join(feedbackDir, 'annotations.json')

  // Module discovery — hoisted so both configureServer and transformIndexHtml can access
  const modulesDir = path.join(pluginsDir, 'modules')
  let availableModules = fs.existsSync(modulesDir)
    ? fs.readdirSync(modulesDir).filter(f => f.endsWith('.js')).map(f => f.replace('.js', ''))
    : ['annotation']

  return {
    name: 'dev-console',
    apply: 'serve',

    configureServer(server) {
      // Ensure feedback dir + file exist
      if (!fs.existsSync(feedbackDir)) fs.mkdirSync(feedbackDir, { recursive: true })
      if (!fs.existsSync(feedbackPath)) fs.writeFileSync(feedbackPath, '[]')

      // Re-scan modules (may have changed since plugin init)
      availableModules = fs.existsSync(modulesDir)
        ? fs.readdirSync(modulesDir).filter(f => f.endsWith('.js')).map(f => f.replace('.js', ''))
        : ['annotation']

      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith('/__dev-console/')) return next()

        const route = req.url.replace('/__dev-console/', '')

        // --- List available modules ---
        if (req.method === 'GET' && route === 'modules') {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify(availableModules))
        }

        // --- Serve static resources ---
        if (req.method === 'GET' && route.startsWith('shell.')) {
          return serveFile(res, path.join(pluginsDir, `dev-console-${route}`))
        }
        if (req.method === 'GET' && (route === 'i18n.js' || route === 'theme.js')) {
          return serveFile(res, path.join(pluginsDir, `dev-console-${route}`))
        }
        if (req.method === 'GET' && route.startsWith('modules/')) {
          return serveFile(res, path.join(pluginsDir, route))
        }

        // --- GET /annotations ---
        if (req.method === 'GET' && route === 'annotations') {
          return serveFile(res, feedbackPath)
        }

        // --- GET /config ---
        if (req.method === 'GET' && route === 'config') {
          const configPath = path.join(projectRoot, '.claude', 'dev-console.config.json')
          if (fs.existsSync(configPath)) return serveFile(res, configPath)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          return res.end('{}')
        }

        // --- POST /save (atomic write — C3) ---
        if (req.method === 'POST' && route === 'save') {
          return handleSave(req, res, feedbackPath)
        }

        next()
      })
    },

    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const loader = buildLoaderScript(availableModules)
        return html.replace('</body>', `${loader}\n</body>`)
      },
    },
  }
}

// --- Serve file with correct MIME ---
function serveFile(res, filePath) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404)
    return res.end('Not found')
  }

  const ext = path.extname(filePath)
  const mimeTypes = {
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
  }

  res.writeHead(200, {
    'Content-Type': mimeTypes[ext] || 'text/plain',
    'Cache-Control': 'no-store',
  })
  res.end(fs.readFileSync(filePath, 'utf-8'))
}

// --- Atomic write with validation (C3) ---
function handleSave(req, res, feedbackPath) {
  let body = ''
  let size = 0

  req.on('data', (chunk) => {
    size += chunk.length
    if (size > MAX_BODY_SIZE) {
      res.writeHead(413, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Payload too large (max 1MB)' }))
      req.destroy()
      return
    }
    body += chunk
  })

  req.on('end', () => {
    // Validate JSON
    try {
      JSON.parse(body)
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ error: 'Invalid JSON' }))
    }

    // Atomic write: write to tmp, then rename
    const tmpPath = feedbackPath + '.tmp.' + Date.now()
    try {
      fs.writeFileSync(tmpPath, body, 'utf-8')
      fs.renameSync(tmpPath, feedbackPath)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: true }))
    } catch (err) {
      // Clean up tmp on failure
      try { fs.unlinkSync(tmpPath) } catch { /* ignore */ }
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Write failed' }))
    }
  })
}

// --- Loader script injected into HTML (C2: small loader, not monolith) ---
function buildLoaderScript(moduleNames) {
  const moduleLoads = moduleNames
    .map(name => `  await loadScript('/__dev-console/modules/${name}.js');`)
    .join('\n')

  return `<script>
;(async function __devConsoleLoader() {
  if (window.__devConsole) return; // HMR guard
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function() { console.warn('[DevConsole] Failed to load: ' + src); resolve(); };
      document.head.appendChild(s);
    });
  }
  // Load i18n + theme first, then shell, then modules
  await loadScript('/__dev-console/i18n.js');
  await loadScript('/__dev-console/theme.js');
  await loadScript('/__dev-console/shell.js');
${moduleLoads}
})();
</script>`
}

// --- Project root detection (C1) ---
function findProjectRoot(dir) {
  let current = dir
  while (current !== path.dirname(current)) {
    // .git directory = project root
    if (fs.existsSync(path.join(current, '.git'))) return current
    current = path.dirname(current)
  }
  // Fallback: use the starting directory
  return dir
}
