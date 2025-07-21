self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' || request.destination === 'style' || request.destination === 'document',
  new workbox.strategies.NetworkFirst()
);
