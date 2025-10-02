const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
    if (!('serviceWorker' in navigator)) {
        console.warn('Service Worker not supported');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        });
        console.log('Service Worker registered:', registration.scope);
        return registration;
    } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
    }
};

export const subscribeToPushNotifications = async (): Promise<PushSubscription | null> => {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('Notification permission denied');
        }

        const response = await fetch('/push-subscriptions/vapid-public-key', {
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch VAPID public key');
        }
        
        const { publicKey } = await response.json();

        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
        });

        const subscribeResponse = await fetch('/push-subscriptions/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(subscription.toJSON())
        });

        if (!subscribeResponse.ok) {
            throw new Error('Failed to save subscription to server');
        }

        console.log('Successfully subscribed to push notifications');
        return subscription;
    } catch (error) {
        console.error('Failed to subscribe to push notifications:', error);
        throw error;
    }
};

export const unsubscribeFromPushNotifications = async (): Promise<void> => {
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
            console.log('No subscription found');
            return;
        }

        await subscription.unsubscribe();

        await fetch('/push-subscriptions/unsubscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({ endpoint: subscription.endpoint })
        });

        console.log('Successfully unsubscribed from push notifications');
    } catch (error) {
        console.error('Failed to unsubscribe:', error);
        throw error;
    }
};

export const checkSubscriptionStatus = async (): Promise<boolean> => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return false;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        return !!subscription;
    } catch (error) {
        console.error('Error checking subscription:', error);
        return false;
    }
};

export const isPushNotificationSupported = (): boolean => {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
};
