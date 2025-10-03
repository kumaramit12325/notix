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
    console.log('Parsed push payload:', JSON.stringify(payload, null, 2));
  } catch (e) {
    console.error('Failed to parse push data:', e);
    payload = {
      title: 'New Notification',
      body: event.data.text()
    };
  }

  const title = payload.title || 'New Notification';
  const notificationUrl = payload.data?.url || payload.url || '/';
  const options = {
    body: payload.body || '',
    icon: payload.icon || '/notix.jpg',
    badge: payload.badge || '/notix.jpg',
    data: {
      url: notificationUrl
    },
    requireInteraction: payload.requireInteraction || false,
    actions: payload.actions || [],
    tag: 'notification-' + Date.now(),
    renotify: true
  };

  console.log('Notification URL extracted:', notificationUrl);
  console.log('Showing notification with options:', JSON.stringify(options, null, 2));

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('=== NOTIFICATION CLICKED ===');
  console.log('Event:', event);
  console.log('Notification object:', event.notification);
  console.log('Notification data:', JSON.stringify(event.notification.data, null, 2));
  
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';
  console.log('URL to open:', urlToOpen);
  console.log('URL type:', typeof urlToOpen);

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      console.log('Found clients:', clientList.length);
      
      // Try to find existing tab with same URL
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        console.log('Checking client:', client.url);
        if (client.url === urlToOpen && 'focus' in client) {
          console.log('Focusing existing window:', urlToOpen);
          return client.focus();
        }
      }
      
      // No existing tab found, open new window
      if (clients.openWindow) {
        console.log('Opening new window with URL:', urlToOpen);
        return clients.openWindow(urlToOpen).then(function(windowClient) {
          console.log('Window opened successfully:', windowClient);
          return windowClient;
        });
      } else {
        console.error('clients.openWindow is not available');
      }
    }).catch(function(error) {
      console.error('Error in notificationclick handler:', error);
      console.error('Error stack:', error.stack);
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
// Version: 1759502954
// Updated: 1759506752
