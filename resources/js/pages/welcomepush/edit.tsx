import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, Bell } from 'lucide-react';

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
        title: 'Edit',
        href: '#',
    },
];

export default function WelcomePushEdit() {
    const [formData, setFormData] = useState({
        title: 'Thanks for subscribing',
        message: 'Welcome to our platform! We\'re excited to have you on board.',
        url: '',
        domain: 'all',
        delay_seconds: '0',
        image_url: '',
        button_text: '',
        button_url: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Get the ID from the URL
            const urlParts = window.location.pathname.split('/');
            const id = urlParts[urlParts.length - 2];
            
            await router.put(`/welcomepush/${id}`, formData);
        } catch (error) {
            console.error('Error updating welcome push:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AppLayout>
            <Head title="Edit Welcome Push" />
            
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
                        <h1 className="text-3xl font-bold text-gray-900">Edit Welcome Push Campaign</h1>
                        <p className="text-gray-600 mt-2">
                            Update your welcome push notification campaign settings.
                        </p>
                    </div>
                </div>

                {/* Alert Banner */}
                <Alert className="border-blue-200 bg-blue-50">
                    <Bell className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                        Make changes to your welcome push notification campaign below.
                    </AlertDescription>
                </Alert>

                {/* Main Form Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Campaign Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter campaign title"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="domain">Domain</Label>
                                    <Select value={formData.domain} onValueChange={(value) => handleInputChange('domain', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select domain" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Domains</SelectItem>
                                            <SelectItem value="specific">Specific Domain</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <Label htmlFor="message">Push Message *</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Enter your push notification message"
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    rows={3}
                                    required
                                />
                                <p className="text-sm text-gray-500">
                                    Keep your message concise and engaging (max 150 characters recommended)
                                </p>
                            </div>

                            {/* URL and Delay */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="url">Landing Page URL</Label>
                                    <Input
                                        id="url"
                                        type="url"
                                        placeholder="https://example.com"
                                        value={formData.url}
                                        onChange={(e) => handleInputChange('url', e.target.value)}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="delay_seconds">Delay (seconds)</Label>
                                    <Select value={formData.delay_seconds} onValueChange={(value) => handleInputChange('delay_seconds', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Immediately</SelectItem>
                                            <SelectItem value="5">5 seconds</SelectItem>
                                            <SelectItem value="10">10 seconds</SelectItem>
                                            <SelectItem value="30">30 seconds</SelectItem>
                                            <SelectItem value="60">1 minute</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <Label htmlFor="image_url">Image URL (Optional)</Label>
                                <Input
                                    id="image_url"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.image_url}
                                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                                />
                                <p className="text-sm text-gray-500">
                                    Add an image to make your push notification more engaging
                                </p>
                            </div>

                            {/* Button Configuration */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="button_text">Button Text (Optional)</Label>
                                    <Input
                                        id="button_text"
                                        placeholder="e.g., Learn More, Shop Now"
                                        value={formData.button_text}
                                        onChange={(e) => handleInputChange('button_text', e.target.value)}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="button_url">Button URL (Optional)</Label>
                                    <Input
                                        id="button_url"
                                        type="url"
                                        placeholder="https://example.com/action"
                                        value={formData.button_url}
                                        onChange={(e) => handleInputChange('button_url', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-4 pt-6 border-t">
                                <Link href="/welcomepush">
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Update Campaign
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
