// Writing Timer – Service Worker
// Handles notification display and basic offline caching

const CACHE_NAME = "writing-timer-v1";

// Install: cache the app shell
self.addEventListener("install", function(e){
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", function(e){
  e.waitUntil(clients.claim());
});

// Listen for messages from main thread to show notifications
self.addEventListener("message", function(e){
  if (e.data && e.data.type === "show-notification"){
    var d = e.data;
    self.registration.showNotification(d.title, {
      body: d.body,
      tag: "writing-timer-phase",
      renotify: true,
      vibrate: d.vibrate || [200, 100, 200],
      silent: false
    });
  }
});

// Clicking the notification focuses or opens the app
self.addEventListener("notificationclick", function(e){
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList){
      for (var i = 0; i < clientList.length; i++){
        if (clientList[i].url.indexOf("writing-timer") !== -1 && "focus" in clientList[i]){
          return clientList[i].focus();
        }
      }
      return clients.openWindow("./");
    })
  );
});
