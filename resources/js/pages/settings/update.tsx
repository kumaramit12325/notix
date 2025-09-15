import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, HelpCircle, Download, CheckCircle } from 'lucide-react';
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

export default function UpdateSettings() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateProgress, setUpdateProgress] = useState(0);

    const handleUpdate = async () => {
        setIsUpdating(true);
        setUpdateProgress(0);
        
        // Simulate update process
        const interval = setInterval(() => {
            setUpdateProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUpdating(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Update" />

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
                <SettingsTabs activeTab="update" />

                {/* System Update Content */}
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            System Update
                            <HelpCircle className="h-5 w-5 text-gray-400 ml-2" />
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Installed Version */}
                        <Card className="border-orange-200 bg-orange-50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg text-orange-800">Installed Version</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-900">
                                    premium-prod-5.1.22
                                </div>
                                <CardDescription className="text-orange-700 mt-2">
                                    Current system version
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Available Version */}
                        <Card className="border-green-200 bg-green-50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg text-green-800">Available Version</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-900">
                                    premium-prod-5.1.24
                                </div>
                                <CardDescription className="text-green-700 mt-2">
                                    Latest available version
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Update Progress */}
                    {isUpdating && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center space-x-3 mb-3">
                                <Download className="h-5 w-5 text-blue-600 animate-pulse" />
                                <span className="text-sm font-medium text-blue-800">Update in progress...</span>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${updateProgress}%` }}
                                ></div>
                            </div>
                            <div className="text-right text-sm text-blue-600 mt-1">
                                {updateProgress}%
                            </div>
                        </div>
                    )}

                    {/* Update Status */}
                    {updateProgress === 100 && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-800">
                                    Update completed successfully!
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Update Button */}
                    <div className="flex justify-end">
                        <Button 
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className="px-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isUpdating ? 'Updating...' : 'Update'}
                        </Button>
                    </div>

                    {/* Update Information */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Update Information</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Version 5.1.24 includes performance improvements and bug fixes</li>
                            <li>• Estimated update time: 2-5 minutes</li>
                            <li>• System will remain available during the update process</li>
                            <li>• Backup is automatically created before update</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
