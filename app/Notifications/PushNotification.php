<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushChannel;
use NotificationChannels\WebPush\WebPushMessage;

class PushNotification extends Notification
{
    use Queueable;

    protected $payload;

    /**
     * Create a new notification instance.
     */
    public function __construct($payload)
    {
        $this->payload = is_string($payload) ? json_decode($payload, true) : $payload;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return [WebPushChannel::class];
    }

    /**
     * Get the WebPush representation of the notification.
     */
    public function toWebPush($notifiable, $notification)
    {
        return (new WebPushMessage)
            ->title($this->payload['title'] ?? 'Notification')
            ->body($this->payload['body'] ?? '')
            ->icon($this->payload['icon'] ?? '/notix.jpg')
            ->badge($this->payload['badge'] ?? '/notix.jpg')
            ->data([
                'url' => $this->payload['url'] ?? '/',
            ])
            ->options([
                'TTL' => 3600,
            ]);
    }
}
