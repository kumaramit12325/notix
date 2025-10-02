self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    const data = event.data ? event.data.json() : {};
    const title = data.title || 'New Notification';
    const options = {
        body: data.body || 'You have a new notification',
        icon: data.icon || '/notix.jpg',
        badge: data.badge || '/notix.jpg',
        data: data.data || {},
        actions: data.actions || [],
        vibrate: [200, 100, 200],
        tag: data.tag || 'notix-notification',
        requireInteraction: data.requireInteraction || false
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const urlToOpen = event.notification.data.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];
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

self.addEventListener('pushsubscriptionchange', (event) => {
    console.log('Push subscription change event triggered');
    
    event.waitUntil(
        (async () => {
            try {
                let options = event.oldSubscription?.options;
                
                if (!options || !options.applicationServerKey) {
                    const keyResponse = await fetch('/push-subscriptions/vapid-public-key', {
                        credentials: 'same-origin'
                    });
                    
                    if (!keyResponse.ok) {
                        throw new Error('Failed to fetch VAPID public key');
                    }
                    
                    const { publicKey } = await keyResponse.json();
                    
                    const urlBase64ToUint8Array = (base64String) => {
                        const padding = '='.repeat((4 - base64String.length % 4) % 4);
                        const base64 = (base64String + padding)
                            .replace(/\-/g, '+')
                            .replace(/_/g, '/');
                        const rawData = atob(base64);
                        const outputArray = new Uint8Array(rawData.length);
                        for (let i = 0; i < rawData.length; ++i) {
                            outputArray[i] = rawData.charCodeAt(i);
                        }
                        return outputArray;
                    };
                    
                    options = {
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(publicKey)
                    };
                }
                
                const subscription = await self.registration.pushManager.subscribe(options);
                console.log('Resubscribed successfully:', subscription);
                
                const subscribeResponse = await fetch('/push-subscriptions/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(subscription.toJSON()),
                    credentials: 'same-origin'
                });
                
                if (!subscribeResponse.ok) {
                    throw new Error(`Failed to update subscription on server: ${subscribeResponse.status}`);
                }
                
                console.log('Server subscription updated successfully');
                
                self.clients.matchAll().then((clients) => {
                    clients.forEach((client) => {
                        client.postMessage({
                            type: 'SUBSCRIPTION_UPDATED',
                            subscription: subscription.toJSON()
                        });
                    });
                });
                
            } catch (error) {
                console.error('Push resubscription failed:', error);
                
                self.clients.matchAll().then((clients) => {
                    clients.forEach((client) => {
                        client.postMessage({
                            type: 'SUBSCRIPTION_UPDATE_FAILED',
                            error: error.message
                        });
                    });
                });
            }
        })()
    );
});
