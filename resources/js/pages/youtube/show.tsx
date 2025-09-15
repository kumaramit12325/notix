import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Youtube, ExternalLink, Copy, Calendar, Globe } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'YouTube',
        href: '/youtube',
    },
    {
        title: 'Channel Details',
        href: '/youtube/show',
    },
];

interface YouTubeChannel {
    id: number;
    title: string;
    handle: string;
    lp_link: string;
    desktop: number;
    mobile: number;
    status: string;
    created_at: string;
    subscriber_count: string;
    domain: string;
    logo: string;
}

interface YouTubeShowProps {
    channel: YouTubeChannel;
}

export default function YouTubeShow({ channel }: YouTubeShowProps) {
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            alert('Copy failed. Please try again.');
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this channel?')) {
            router.delete(`/youtube/${channel.id}`);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Paused':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const total = (Number(channel.desktop) || 0) + (Number(channel.mobile) || 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="YouTube Channel Details" />

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
                        <h1 className="text-3xl font-bold tracking-tight">Channel Details</h1>
                        <p className="text-muted-foreground">View detailed information about your YouTube channel.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Channel Info */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Youtube className="h-5 w-5 text-red-600" />
                                    Channel Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Channel Title</label>
                                        <p className="text-lg font-semibold">{channel.title}</p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Handle</label>
                                        <p className="text-lg font-semibold text-muted-foreground">{channel.handle}</p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Domain</label>
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-muted-foreground" />
                                            <p className="text-lg font-semibold">{channel.domain}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Subscriber Count</label>
                                        <p className="text-lg font-semibold">{channel.subscriber_count || 'N/A'}</p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                                        <Badge className={getStatusColor(channel.status)}>{channel.status}</Badge>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Created</label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <p className="text-lg font-semibold">
                                                {new Date(channel.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">LP Link</label>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={channel.lp_link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 hover:underline inline-flex items-center gap-1 text-lg font-semibold"
                                        >
                                            {channel.lp_link}
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Copy link"
                                            onClick={() => handleCopy(channel.lp_link)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Share this link to collect subscribers from your YouTube channel
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">{channel.desktop}</p>
                                        <p className="text-sm text-muted-foreground">Desktop</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-600">{channel.mobile}</p>
                                        <p className="text-sm text-muted-foreground">Mobile</p>
                                    </div>
                                </div>
                                <div className="text-center pt-2 border-t">
                                    <p className="text-3xl font-bold text-purple-600">{total}</p>
                                    <p className="text-sm text-muted-foreground">Total</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    onClick={() => router.get(`/youtube/${channel.id}/edit`)}
                                    className="w-full"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Channel
                                </Button>
                                
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    className="w-full"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Channel
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
