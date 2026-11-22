// Remove all existing caches
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // Delete the Pawa cache
      caches.delete("Pawa"),

      // Unregister this service worker
      self.registration.unregister(),
    ])
      .then(() => {
        return self.clients.matchAll();
      })
      .then((clients) => {
        clients.forEach((client) => {
          client.navigate(client.url);
        });
      }),
  );
});
