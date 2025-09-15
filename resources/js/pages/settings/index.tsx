import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, User, Globe, Database, Settings, Download, Bell } from 'lucide-react';

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

const settingsTabs = [
    { id: 'general', title: 'General', icon: Settings, href: '/settings/general' },
    { id: 'profile', title: 'Profile', icon: User, href: '/settings/profile' },
    { id: 'language', title: 'Language & Region', icon: Globe, href: '/settings/language' },
    { id: 'backup', title: 'Backup', icon: Database, href: '/settings/backup' },
    { id: 'advanced', title: 'Advanced', icon: Settings, href: '/settings/advanced' },
    { id: 'update', title: 'Update', icon: Download, href: '/settings/update' },
];

export default function SettingsIndex() {
    const { auth } = usePage<SharedData>().props;
    const [activeTab, setActiveTab] = useState('general');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />

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

                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
                    {settingsTabs.map((tab) => (
                        <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? "default" : "ghost"}
                            size="sm"
                            className={cn(
                                "flex-1 justify-center",
                                activeTab === tab.id 
                                    ? "bg-blue-600 text-white" 
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                            onClick={() => setActiveTab(tab.id)}
                            asChild
                        >
                            <Link href={tab.href}>
                                <tab.icon className="h-4 w-4 mr-2" />
                                {tab.title}
                            </Link>
                        </Button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-center py-12">
                        <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Welcome to Settings
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Select a tab above to configure your LaraPush Pro Panel settings
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            {settingsTabs.map((tab) => (
                                <Card key={tab.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center space-x-2">
                                            <tab.icon className="h-5 w-5 text-blue-600" />
                                            <CardTitle className="text-base">{tab.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Configure your {tab.title.toLowerCase()} settings
                                        </CardDescription>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="mt-3 w-full"
                                            asChild
                                        >
                                            <Link href={tab.href}>
                                                Configure {tab.title}
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
