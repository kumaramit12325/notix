(function (window) {
  'use strict';

  var alertwise = window.alertwise || [];
  var config = {};
  var isInitialized = false;

  // Process queued commands
  var processQueue = function () {
    while (alertwise.length > 0) {
      var command = alertwise.shift();
      var action = command[0];
      var params = command[1];

      if (action === 'init') {
        initialize(params);
      }
    }
  };

  // Initialize the push notification system
  var initialize = function (params) {
    if (isInitialized) {
      console.warn('Alertwise already initialized');
      return;
    }

    config = params || {};
    config.vapidPublicKey = config.publicKey || config.vapidPublicKey;
    isInitialized = true;

    if (!config.appId) {
      console.error('Alertwise: appId is required');
      return;
    }

    if (!config.apiUrl) {
      console.error('Alertwise: apiUrl is required');
      return;
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    } else {
      console.warn('Service Workers are not supported in this browser');
    }
  };

  // Register the service worker
  var registerServiceWorker = function () {
    var swUrl = config.serviceWorkerUrl || '/service-worker.js';

    navigator.serviceWorker.register(swUrl)
      .then(function (registration) {
        console.log('Service Worker registered successfully:', registration);

        // Check for push permission
        if ('Notification' in window) {
          if (Notification.permission === 'granted') {
            subscribeToPush(registration);
          } else if (Notification.permission === 'default') {
            // Detect Safari (which blocks auto-prompts)
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

            if (!isSafari) {
              // Auto-request for Chrome, Firefox, Edge after 1 second
              setTimeout(function () {
                console.log('Auto-requesting notification permission...');
                alertwise.requestPermission();
              }, 1000);
            } else {
              console.log('Safari detected - permission must be requested via user click');
            }
          }
        }
      })
      .catch(function (error) {
        console.error('Service Worker registration failed:', error);
      });
  };

  // Subscribe to push notifications
  var subscribeToPush = function (registration) {
    if (!config.vapidPublicKey) {
      console.error('Alertwise: VAPID public key is required for push notifications');
      return;
    }

    var applicationServerKey = urlBase64ToUint8Array(config.vapidPublicKey);

    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
      .then(function (subscription) {
        console.log('Push subscription successful:', subscription);
        sendSubscriptionToServer(subscription);
      })
      .catch(function (error) {
        console.log('Push subscription error:', error);

        if (error.name === 'InvalidAccessError') {
          console.warn('Subscription failed with InvalidAccessError. This implies a key mismatch. Unsubscribing and retrying...');
          registration.pushManager.getSubscription()
            .then(function (subscription) {
              if (subscription) {
                return subscription.unsubscribe();
              }
              return Promise.resolve();
            })
            .then(function () {
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
              });
            })
            .then(function (subscription) {
              console.log('Re-subscription successful:', subscription);
              sendSubscriptionToServer(subscription);
            })
            .catch(function (retryError) {
              console.error('Push subscription retry failed:', retryError);
            });
        } else {
          console.error('Push subscription failed:', error);
        }
      });
  };

  // Convert VAPID key
  var urlBase64ToUint8Array = function (base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // Send subscription to server
  var sendSubscriptionToServer = function (subscription) {
    console.log('Sending subscription to server:', subscription);
    var subscriptionData = subscription.toJSON();
    fetch(config.apiUrl + '/api/push-subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        app_id: config.appId,
        endpoint: subscriptionData.endpoint,
        keys: subscriptionData.keys
      })
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to send subscription to server');
        }
        return response.json();
      })
      .then(function (data) {
        console.log('Subscription sent to server successfully:', data);
      })
      .catch(function (error) {
        console.error('Error sending subscription to server:', error);
      });
  };

  // Request notification permission
  alertwise.requestPermission = function () {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return Promise.reject(new Error('Notifications not supported'));
    }

    // Detect Safari
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      console.log('Safari detected - requesting permission from user gesture');
    }

    return Notification.requestPermission().then(function (permission) {
      console.log('Notification permission result:', permission);

      if (permission === 'granted') {
        console.log('Notification permission granted');
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(function (registration) {
            subscribeToPush(registration);
          });
        }
      } else if (permission === 'denied') {
        console.warn('Notification permission denied - check browser settings');
      } else {
        console.log('Notification permission dismissed');
      }
      return permission;
    }).catch(function (error) {
      console.error('Error requesting notification permission:', error);
      throw error;
    });
  };

  // Process initial queue
  processQueue();

  // Override push to process new commands
  alertwise.push = function (command) {
    var action = command[0];
    var params = command[1];

    if (action === 'init') {
      initialize(params);
    } else if (action === 'requestPermission') {
      alertwise.requestPermission();
    }
  };

  window.alertwise = alertwise;

})(window);
