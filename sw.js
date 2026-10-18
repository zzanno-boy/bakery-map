/* 서울 빵집 지도 — service worker
   앱 껍데기(index.html, 목록, 아이콘)는 미리 저장해 두고, 글꼴은 처음 한 번 받을 때 저장해 둡니다.
   목록(bakeries.json)과 index.html은 인터넷이 되면 새 것을 받고, 안 되면 저장본을 씁니다. */
const VERSION = 'bbmap-v6';
const SHELL = ['./', './index.html', './bakeries.json', './changelog.json', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (isFont) {
    e.respondWith(caches.open(VERSION).then(async c => { const hit = await c.match(e.request); if (hit) return hit; try { const r = await fetch(e.request); if (r.ok) c.put(e.request, r.clone()); return r; } catch { return hit || Response.error(); } }));
    return;
  }
  if (url.origin !== location.origin) return;
  // same-origin: network first, cache fallback (so new lists arrive, old ones still work offline)
  e.respondWith((async () => {
    const c = await caches.open(VERSION);
    const req = e.request;
    try {
      const r = await fetch(req);
      if (r.ok) c.put(new Request(url.pathname.endsWith('/') ? './index.html' : req.url.split('?')[0]), r.clone());
      return r;
    } catch {
      const hit = await c.match(req.url.split('?')[0]) || await c.match('./index.html');
      return hit || Response.error();
    }
  })());
});
