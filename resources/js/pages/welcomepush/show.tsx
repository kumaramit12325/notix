import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash, Bell } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Automation',
        href: '/automation',
    },
    {
        title: 'Welcome Push',
        href: '/welcomepush',
    },
    {
        title: 'View',
        href: '#',
    },
];

export default function WelcomePushShow() {
    // Mock data - in real app this would come from props
    const campaign = {
        id: 1,
        title: 'Thanks for subscribing',
        message: 'Welcome to our platform! We\'re excited to have you on board.',
        url: 'https://example.com/welcome',
        domain: 'all',
        delay_seconds: '0',
        image_url: 'https://example.com/image.jpg',
        button_text: 'Learn More',
        button_url: 'https://example.com/learn',
        created_at: '2025-01-17 16:45:00',
        updated_at: '2025-01-17 16:45:00',
        status: 'active'
    };

    return (
        <AppLayout>
            <Head title="View Welcome Push" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center gap-4">
                    <Link 
                        href="/welcomepush"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Welcome Push
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Push Campaign Details</h1>
                        <p className="text-gray-600 mt-2">
                            View and manage your welcome push notification campaign.
                        </p>
                    </div>
                </div>

                {/* Alert Banner */}
                <div className="flex items-center justify-between p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-800 font-medium">
                            This campaign is currently active and sending welcome notifications to new subscribers.
                        </span>
                    </div>
                    <Badge variant="default" className="bg-green-600">
                        {campaign.status}
                    </Badge>
                </div>

                {/* Campaign Details Card */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle>Campaign Information</CardTitle>
                            <div className="flex gap-2">
                                <Link href={`/welcomepush/${campaign.id}/edit`}>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="destructive" size="sm">
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Campaign Title</h3>
                                <p className="text-gray-900">{campaign.title}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Domain</h3>
                                <Badge variant="outline">
                                    {campaign.domain === 'all' ? 'All Domains' : 'Specific Domain'}
                                </Badge>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Push Message</h3>
                            <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                                {campaign.message}
                            </p>
                        </div>

                        {/* URL and Delay */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Landing Page URL</h3>
                                {campaign.url ? (
                                    <a 
                                        href={campaign.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 break-all"
                                    >
                                        {campaign.url}
                                    </a>
                                ) : (
                                    <p className="text-gray-500 italic">No URL specified</p>
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Delay</h3>
                                <p className="text-gray-900">
                                    {campaign.delay_seconds === '0' ? 'Immediately' : `${campaign.delay_seconds} seconds`}
                                </p>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Image URL</h3>
                            {campaign.image_url ? (
                                <div className="space-y-2">
                                    <a 
                                        href={campaign.image_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 break-all block"
                                    >
                                        {campaign.image_url}
                                    </a>
                                    <img 
                                        src={campaign.image_url} 
                                        alt="Campaign image" 
                                        className="w-32 h-32 object-cover rounded-md border"
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No image specified</p>
                            )}
                        </div>

                        {/* Button Configuration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Button Text</h3>
                                {campaign.button_text ? (
                                    <p className="text-gray-900">{campaign.button_text}</p>
                                ) : (
                                    <p className="text-gray-500 italic">No button text specified</p>
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Button URL</h3>
                                {campaign.button_url ? (
                                    <a 
                                        href={campaign.button_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 break-all"
                                    >
                                        {campaign.button_url}
                                    </a>
                                ) : (
                                    <p className="text-gray-500 italic">No button URL specified</p>
                                )}
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Created At</h3>
                                <p className="text-gray-900">{campaign.created_at}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Last Updated</h3>
                                <p className="text-gray-900">{campaign.updated_at}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
