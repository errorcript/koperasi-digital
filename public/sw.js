// Simple Service Worker for PWA
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Pass-through for now, can be used for caching
    event.respondWith(fetch(event.request));
});
