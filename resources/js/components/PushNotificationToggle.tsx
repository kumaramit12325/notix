import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import { 
    subscribeToPushNotifications, 
    unsubscribeFromPushNotifications, 
    checkSubscriptionStatus,
    isPushNotificationSupported,
    registerServiceWorker
} from '@/services/pushNotifications';

export default function PushNotificationToggle() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        initializePushNotifications();
    }, []);

    const initializePushNotifications = async () => {
        if (!isPushNotificationSupported()) {
            setError('Push notifications are not supported in your browser');
            return;
        }

        await registerServiceWorker();
        const status = await checkSubscriptionStatus();
        setIsSubscribed(status);
    };

    const handleSubscribe = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await subscribeToPushNotifications();
            setIsSubscribed(true);
            setSuccess('Successfully enabled push notifications!');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to enable notifications');
        } finally {
            setLoading(false);
        }
    };

    const handleUnsubscribe = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await unsubscribeFromPushNotifications();
            setIsSubscribed(false);
            setSuccess('Successfully disabled push notifications');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to disable notifications');
        } finally {
            setLoading(false);
        }
    };

    if (!isPushNotificationSupported()) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Push notifications are not supported in your browser
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert>
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {isSubscribed ? (
                        <Bell className="w-5 h-5 text-green-600" />
                    ) : (
                        <BellOff className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-gray-500">
                            {isSubscribed 
                                ? 'You will receive push notifications' 
                                : 'Enable push notifications to stay updated'}
                        </p>
                    </div>
                </div>

                <Button
                    onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
                    disabled={loading}
                    variant={isSubscribed ? 'outline' : 'default'}
                >
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isSubscribed ? 'Disable' : 'Enable'}
                </Button>
            </div>
        </div>
    );
}
