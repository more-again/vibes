// Workout Tracker – Service Worker
const CACHE_NAME = "workout-tracker-v1";

self.addEventListener("install", function(e){
  self.skipWaiting();
});

self.addEventListener("activate", function(e){
  e.waitUntil(clients.claim());
});

self.addEventListener("notificationclick", function(e){
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList){
      for (var i = 0; i < clientList.length; i++){
        if (clientList[i].url.indexOf("workout-tracker") !== -1 && "focus" in clientList[i]){
          return clientList[i].focus();
        }
      }
      return clients.openWindow("./");
    })
  );
});
