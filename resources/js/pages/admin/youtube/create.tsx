import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Youtube } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/dashboard',
    },
    {
        title: 'YouTube Channels',
        href: '/admin/youtube',
    },
    {
        title: 'Create Channel',
        href: '/admin/youtube/create',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
}

interface AdminYouTubeCreateProps {
    users: User[];
}

export default function AdminYouTubeCreate({ users }: AdminYouTubeCreateProps) {
    const [formData, setFormData] = useState({
        title: '',
        domain: '',
        subscriber_count: '',
        logo: '',
        user_id: '',
        status: 'Active',
        lp_link: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/admin/youtube', formData, {
            onFinish: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false)
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Create YouTube Channel" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.get('/admin/youtube')}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Channels
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create YouTube Channel</h1>
                        <p className="text-muted-foreground">Add a new YouTube channel to the platform.</p>
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Channel Title *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            placeholder="Enter channel title"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="domain">Domain *</Label>
                                        <Input
                                            id="domain"
                                            value={formData.domain}
                                            onChange={(e) => handleInputChange('domain', e.target.value)}
                                            placeholder="e.g., All, example.com"
                                            required
                                        />
                                    </div>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="user_id">Assign to User</Label>
                                        <Select
                                            value={formData.user_id}
                                            onValueChange={(value) => handleInputChange('user_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a user (optional)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">No User (System Channel)</SelectItem>
                                                {users.map(user => (
                                                    <SelectItem key={user.id} value={user.id.toString()}>
                                                        {user.name} ({user.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status *</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value) => handleInputChange('status', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Paused">Paused</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lp_link">LP Link</Label>
                                    <Input
                                        id="lp_link"
                                        value={formData.lp_link}
                                        onChange={(e) => handleInputChange('lp_link', e.target.value)}
                                        placeholder="https://demo.larapu.sh/yt/your-custom-link"
                                        className="font-mono text-sm"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Leave empty to auto-generate, or enter a custom LP link
                                    </p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        {isSubmitting ? 'Creating...' : 'Create Channel'}
                                    </Button>
                                    
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.get('/admin/youtube')}
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
