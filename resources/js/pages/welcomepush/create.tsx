import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, X, Upload, HelpCircle, Chrome } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Campaigns',
        href: '/campaigns',
    },
    {
        title: 'Create',
        href: '/welcomepush/create',
    },
];

export default function WelcomePushCreate() {
    const [formData, setFormData] = useState({
        domains: ['all'],
        delay: '0',
        delayUnit: 'seconds',
        title: '',
        message: '',
        iconUrl: '',
        imageUrl: '',
        launchUrl: '',
        useUtmLink: true,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const removeDomain = (domain: string) => {
        setFormData(prev => ({
            ...prev,
            domains: prev.domains.filter(d => d !== domain)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await router.post('/welcomepush', formData);
        } catch (error) {
            console.error('Error creating welcome push:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AppLayout>
            <Head title="Create Welcome Push" />
            
            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Create Welcome Push</h1>
                    <div className="text-sm text-blue-600">
                        {breadcrumbs.map((crumb, index) => (
                            <span key={crumb.href}>
                                {index > 0 && ' / '}
                                <Link href={crumb.href} className="hover:underline">
                                    {crumb.title}
                                </Link>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Warning Banner */}
                <Alert className="border-red-200 bg-red-50">
                    <HelpCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        Note: This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert>

                {/* Main Content Area - Two Panel Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel - Notification Configuration */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Notification</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form onSubmit={handleSubmit}>
                                    {/* Domains */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-sm font-medium">Domains</Label>
                                            <HelpCircle className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <div className="space-y-2">
                                            {formData.domains.map((domain) => (
                                                <Badge key={domain} variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                                                    {domain === 'all' ? 'All Domains' : domain}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDomain(domain)}
                                                        className="ml-2 hover:text-red-600"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                            <Input 
                                                placeholder="Add domain" 
                                                className="mt-2"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        const target = e.target as HTMLInputElement;
                                                        if (target.value.trim()) {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                domains: [...prev.domains, target.value.trim()]
                                                            }));
                                                            target.value = '';
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Delay */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 mt-2">
                                            <Label className="text-sm font-medium">Delay</Label>
                                            <HelpCircle className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                min="0"
                                                value={formData.delay}
                                                onChange={(e) => handleInputChange('delay', e.target.value)}
                                                className="w-20"
                                            />
                                            <Select value={formData.delayUnit} onValueChange={(value) => handleInputChange('delayUnit', value)}>
                                                <SelectTrigger className="w-32">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="seconds">seconds</SelectItem>
                                                    <SelectItem value="minutes">minutes</SelectItem>
                                                    <SelectItem value="hours">hours</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            You can use this setting to create drip notification{' '}
                                            <a href="#" className="text-blue-600 hover:underline">Know More</a>
                                        </p>
                                    </div>

                                    {/* Templates */}
                                    <div className="space-y-3 my-2">
                                        <Label className="text-sm font-medium">Templates</Label>
                                        <Button variant="outline" className="w-full justify-start text-gray-600">
                                            Choose Template
                                        </Button>
                                    </div>

                                    {/* Title */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-sm font-medium">Title</Label>
                                            <HelpCircle className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <Input
                                            placeholder="Enter title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-sm font-medium">Message</Label>
                                            <HelpCircle className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <Textarea
                                            placeholder="Enter message"
                                            value={formData.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            rows={3}
                                        />
                                    </div>

                                    {/* Media and Link Inputs */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
                                        {/* Icon URL */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Label className="text-sm font-medium">Icon URL</Label>
                                                <HelpCircle className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Icon URL"
                                                    value={formData.iconUrl}
                                                    onChange={(e) => handleInputChange('iconUrl', e.target.value)}
                                                />
                                                <Button variant="outline" size="sm" type="button">
                                                    <Upload className="h-4 w-4" />
                                                </Button>
                                                <Select>
                                                    <SelectTrigger className="w-8">
                                                        {/* <ChevronDown className="h-4 w-4" /> */}
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="upload">Upload</SelectItem>
                                                        <SelectItem value="url">URL</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <p className="text-xs text-gray-500">Use PNG or JPG Only</p>
                                        </div>

                                        {/* Image URL */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Label className="text-sm font-medium">Image URL</Label>
                                                <HelpCircle className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Image URL"
                                                    value={formData.imageUrl}
                                                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                                />
                                                <Button variant="outline" size="sm" type="button">
                                                    <Upload className="h-4 w-4" />
                                                </Button>
                                                <Select>
                                                    <SelectTrigger className="w-8">
                                                        {/* <ChevronDown className="h-4 w-4" /> */}
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="upload">Upload</SelectItem>
                                                        <SelectItem value="url">URL</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <p className="text-xs text-gray-500">Use PNG or JPG Only</p>
                                        </div>

                                        {/* Launch URL */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Label className="text-sm font-medium">Launch URL</Label>
                                                <HelpCircle className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <Input
                                                placeholder="Launch URL"
                                                value={formData.launchUrl}
                                                onChange={(e) => handleInputChange('launchUrl', e.target.value)}
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="utm-link"
                                                    checked={formData.useUtmLink}
                                                    onCheckedChange={(checked) => handleInputChange('useUtmLink', checked as boolean)}
                                                />
                                                <Label htmlFor="utm-link" className="text-sm">Use UTM Link</Label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Advanced Settings */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between cursor-pointer border border-gray-100 p-2 bg-gray-50 rounded-md">
                                            <Label className="text-sm font-medium">Advanced Settings</Label>
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                    {/* Browser Header */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <Chrome className="h-4 w-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Chrome • Default • now</span>
                                        <ChevronDown className="h-3 w-3 text-gray-400 ml-auto" />
                                    </div>
                                    
                                    {/* Notification Content */}
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-900">
                                            {formData.title || '[Title Here]'}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {formData.message || '[Description Here]'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                    <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                        Live Preview
                    </Button>
                    <Link href="/welcomepush">
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                            Cancel
                        </Button>
                    </Link>
                    <Button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isSubmitting ? 'Adding...' : 'Add To Welcome Push'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
