import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, HelpCircle } from 'lucide-react';
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

export default function AdvancedSettings() {
    const [workerCount, setWorkerCount] = useState([1]);
    const [allowDuplicates, setAllowDuplicates] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Advanced settings saved');
    };

    const handleResetToDefault = () => {
        setWorkerCount([1]);
        setAllowDuplicates(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Advanced Settings" />

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
                <SettingsTabs activeTab="advanced" />

                {/* Advanced Settings Content */}
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            Advanced Settings
                            <HelpCircle className="h-5 w-5 text-gray-400 ml-2" />
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Worker Count Setting */}
                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-gray-700 flex items-center">
                                Worker Count (decrease if panel is crashing)
                                <HelpCircle className="h-4 w-4 text-gray-400 ml-2" />
                            </Label>
                            <div className="space-y-3">
                                <Slider
                                    value={workerCount}
                                    onValueChange={setWorkerCount}
                                    max={10}
                                    min={1}
                                    step={1}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>1</span>
                                    <span className="font-medium text-blue-600">
                                        Current: {workerCount[0]}
                                    </span>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>

                        {/* Allow Duplicates Setting */}
                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-gray-700 flex items-center">
                                Allow Duplicates From Wordpress Plugin
                                <HelpCircle className="h-4 w-4 text-gray-400 ml-2" />
                            </Label>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-sm text-gray-500">
                                        Enable this option to allow duplicate entries from WordPress plugin
                                    </p>
                                </div>
                                <Switch
                                    checked={allowDuplicates}
                                    onCheckedChange={setAllowDuplicates}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-6">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={handleResetToDefault}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Default
                            </Button>
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
