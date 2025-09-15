import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Youtube } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'YouTube',
        href: '/youtube',
    },
    {
        title: 'Edit Channel',
        href: '/youtube/edit',
    },
];

interface YouTubeChannel {
    id: number;
    title: string;
    domain: string;
    subscriber_count: string;
    logo: string;
}

interface YouTubeEditProps {
    channel: YouTubeChannel;
}

export default function YouTubeEdit({ channel }: YouTubeEditProps) {
    const [formData, setFormData] = useState({
        title: '',
        domain: '',
        subscriber_count: '',
        logo: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setFormData({
            title: channel.title || '',
            domain: channel.domain || '',
            subscriber_count: channel.subscriber_count || '',
            logo: channel.logo || ''
        });
    }, [channel]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.put(`/youtube/${channel.id}`, formData, {
            onFinish: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false)
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit YouTube Channel" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.get('/youtube')}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Channels
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit YouTube Channel</h1>
                        <p className="text-muted-foreground">Modify your YouTube channel information.</p>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Youtube className="h-5 w-5 text-red-600" />
                                Channel Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Channel Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Enter your YouTube channel title"
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="domain">Domain *</Label>
                                    <Input
                                        id="domain"
                                        value={formData.domain}
                                        onChange={(e) => handleInputChange('domain', e.target.value)}
                                        placeholder="e.g., All, yourdomain.com"
                                        required
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Use "All" for general channels or specify your domain
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="subscriber_count">Subscriber Count</Label>
                                        <Input
                                            id="subscriber_count"
                                            value={formData.subscriber_count}
                                            onChange={(e) => handleInputChange('subscriber_count', e.target.value)}
                                            placeholder="e.g., 10K, 1M"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="logo">Logo/Initial</Label>
                                        <Input
                                            id="logo"
                                            value={formData.logo}
                                            onChange={(e) => handleInputChange('logo', e.target.value)}
                                            placeholder="e.g., YT, Logo URL"
                                            maxLength={10}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        {isSubmitting ? 'Updating...' : 'Update Channel'}
                                    </Button>
                                    
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.get('/youtube')}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
