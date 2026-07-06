const { app, BrowserWindow, shell, screen } = require('electron');
const path = require('node:path');
const http = require('node:http');
const fs = require('node:fs');

// The Expo web export uses absolute asset paths ("/_expo/..."), which don't
// resolve under file://. Serve dist/ over a loopback-only HTTP server so
// expo-router's client-side history and asset URLs behave exactly as they do
// in a browser, while staying fully offline (nothing binds beyond 127.0.0.1).
//
// dist/ is built by the sibling apps/mobile package and read in place rather
// than copied, so there's a single source of truth. Packaged and dev builds
// land it in different places: electron-builder's extraResources puts it at
// resourcesPath/dist, while in dev it's still sitting in apps/mobile/dist.
const DIST_DIR = app.isPackaged
  ? path.join(process.resourcesPath, 'dist')
  : path.join(__dirname, '..', '..', 'mobile', 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);

      if (!filePath.startsWith(DIST_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      fs.stat(filePath, (err, stat) => {
        if (err || !stat.isFile()) {
          // SPA fallback: unknown paths resolve to index.html so
          // expo-router's client-side navigation always has something to render.
          filePath = path.join(DIST_DIR, 'index.html');
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      });
    });

    server.listen(0, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

async function createWindow() {
  const server = await startServer();
  const { port } = server.address();

  // Size to whatever screen this launches on (kiosk displays, laptops, and
  // ultrawide monitors all differ) instead of a fixed 1280x800 that either
  // leaves letterboxing on large screens or gets clipped on small ones.
  // The app content itself is a landscape-locked, flex-based layout, so it
  // reflows correctly at any window size above the minimum.
  //
  // Capped at 1920x1080: every looping background video in the app (home,
  // masterplan, drone shots, construction progress) is authored at 1080p.
  // Filling a screen larger than that (1440p/4K monitors) would upscale
  // those videos past their native resolution and visibly blur them —
  // capping here keeps 1:1 pixel density on anything up to a 1080p display
  // and avoids unnecessary upscaling beyond it.
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = Math.min(screenWidth, 1920);
  const windowHeight = Math.min(screenHeight, 1080);

  const win = new BrowserWindow({
    title: 'Cignus Windows',
    width: windowWidth,
    height: windowHeight,
    minWidth: 1024,
    minHeight: 640,
    autoHideMenuBar: true,
    backgroundColor: '#0F4C8A',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // Fully offline: never let the renderer navigate to or open an external URL.
  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(`http://127.0.0.1:${port}`)) event.preventDefault();
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(`http://127.0.0.1:${port}`)) {
      shell.openExternal(url).catch(() => {});
    }
    return { action: 'deny' };
  });

  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[renderer] ${message} (${sourceId}:${line})`);
  });
  win.webContents.on('did-fail-load', (event, code, desc, url) => {
    console.error(`[did-fail-load] ${code} ${desc} ${url}`);
  });
  if (process.env.CIGNUS_DEBUG) win.webContents.openDevTools({ mode: 'detach' });

  win.once('ready-to-show', () => win.show());
  win.loadURL(`http://127.0.0.1:${port}/`);

  win.on('closed', () => server.close());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
