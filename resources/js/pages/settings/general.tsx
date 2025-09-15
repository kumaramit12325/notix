import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info, HelpCircle, ExternalLink } from 'lucide-react';
import SettingsTabs from '@/components/settings/settings-tabs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Profile',
        href: '/settings',
    },
];

export default function GeneralSettings() {
    const [sendingSpeed, setSendingSpeed] = useState([80]);
    const [defaultAudience, setDefaultAudience] = useState('all');
    const [autoCodeIntegration, setAutoCodeIntegration] = useState(true);
    const [hostRedirect, setHostRedirect] = useState(false);
    const [useCdn, setUseCdn] = useState(true);
    const [useUtm, setUseUtm] = useState(true);
    const [dailyUnsubscribeCleanup, setDailyUnsubscribeCleanup] = useState(false);
    const [apiAccess, setApiAccess] = useState(true);
    const [lpLinksDeletedTarget, setLpLinksDeletedTarget] = useState('404');

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('General settings saved');
    };

    const getSpeedLabel = (value: number) => {
        if (value <= 30) return 'Slow';
        if (value <= 60) return 'Medium';
        return 'Fast';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="General Settings" />

            <div className="px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                    <div className="text-sm text-gray-500 mt-1">
                        Home / Profile
                    </div>
                </div>

                {/* Demo Server Warning */}
                <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        Note: This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert>

                {/* Settings Tabs */}
                <SettingsTabs activeTab="general" />

                {/* General Settings Content */}
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            General Settings
                            <HelpCircle className="h-5 w-5 text-gray-400 ml-2" />
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Default Audience Selection */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-gray-700">
                                        Default Audience Selection
                                    </Label>
                                    <RadioGroup 
                                        value={defaultAudience} 
                                        onValueChange={setDefaultAudience}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="all" />
                                            <Label htmlFor="all" className="text-sm">All</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="manual" id="manual" />
                                            <Label htmlFor="manual" className="text-sm">Manual</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="segmentation" id="segmentation" />
                                            <Label htmlFor="segmentation" className="text-sm">Segmentation</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Sending Speed */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-gray-700">
                                        Sending Speed (decrease if panel is crashing)
                                    </Label>
                                    <div className="space-y-2">
                                        <Slider
                                            value={sendingSpeed}
                                            onValueChange={setSendingSpeed}
                                            max={100}
                                            step={1}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>Slow</span>
                                            <span className="font-medium text-blue-600">
                                                {getSpeedLabel(sendingSpeed[0])}
                                            </span>
                                            <span>Fast</span>
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
                                        <p className="text-sm text-purple-700">
                                            Sending Speed also depends on FCM API Response time.
                                        </p>
                                    </div>
                                </div>

                                {/* Auto Code Integration */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-700">
                                            Auto Code Integration
                                        </Label>
                                    </div>
                                    <Switch
                                        checked={autoCodeIntegration}
                                        onCheckedChange={setAutoCodeIntegration}
                                    />
                                </div>

                                {/* Host Redirect */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-700">
                                            Host Redirect
                                        </Label>
                                    </div>
                                    <Switch
                                        checked={hostRedirect}
                                        onCheckedChange={setHostRedirect}
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Use CDN */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-700">
                                            Use CDN
                                        </Label>
                                    </div>
                                    <Switch
                                        checked={useCdn}
                                        onCheckedChange={setUseCdn}
                                    />
                                </div>

                                {/* Use UTM */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-700">
                                            Use UTM
                                        </Label>
                                    </div>
                                    <Switch
                                        checked={useUtm}
                                        onCheckedChange={setUseUtm}
                                    />
                                </div>

                                {/* Daily Unsubscribe Cleanup */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium text-gray-700">
                                            Daily Unsubscribe Cleanup
                                        </Label>
                                    </div>
                                    <Switch
                                        checked={dailyUnsubscribeCleanup}
                                        onCheckedChange={setDailyUnsubscribeCleanup}
                                    />
                                </div>

                                {/* API Access */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-medium text-gray-700">
                                                API Access
                                            </Label>
                                        </div>
                                        <Switch
                                            checked={apiAccess}
                                            onCheckedChange={setApiAccess}
                                        />
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="w-full"
                                        type="button"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View Documentation
                                    </Button>
                                </div>

                                {/* LP Links Deleted Target URL */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">
                                        LP Links Deleted Target URL (Default: 404)
                                    </Label>
                                    <Input
                                        value={lpLinksDeletedTarget}
                                        onChange={(e) => setLpLinksDeletedTarget(e.target.value)}
                                        placeholder="404"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end mt-8">
                            <Button type="submit" className="px-8">
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
