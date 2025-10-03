self.addEventListener('install', function(event) {
  console.log('Service Worker: Installing...');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activating...');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
  console.log('Service Worker: Push notification received', event);
  
  if (!event.data) {
    console.log('Push event has no data');
    return;
  }

  let payload;
  try {
    payload = event.data.json();
    console.log('Parsed push payload:', payload);
  } catch (e) {
    console.error('Failed to parse push data:', e);
    payload = {
      title: 'New Notification',
      body: event.data.text()
    };
  }

  const title = payload.title || 'New Notification';
  const options = {
    body: payload.body || '',
    icon: payload.icon || '/notix.jpg',
    badge: payload.badge || '/notix.jpg',
    data: {
      url: payload.data?.url || payload.url || '/'
    },
    requireInteraction: payload.requireInteraction || false,
    actions: payload.actions || [],
    tag: 'notification-' + Date.now(),
    renotify: true
  };

  console.log('Showing notification:', title, options);

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('Service Worker: Notification clicked', event);
  
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Service Worker: Push subscription changed', event);
  
  event.waitUntil(
    self.registration.pushManager.subscribe(event.oldSubscription.options)
      .then(function(subscription) {
        console.log('Service Worker: Subscription renewed', subscription);
        
        return fetch('/api/push-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription: subscription.toJSON(),
            app_id: self.appId
          })
        });
      })
  );
});
