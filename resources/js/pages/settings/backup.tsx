import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, HelpCircle, Download, Trash2, Play, Cloud } from 'lucide-react';
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

// Mock backup data
const mockBackups = [
    { id: 56, created: '11 Jul 2025 06:25 AM', source: 'Automated', status: 'Completed' },
    { id: 50, created: '10 Jul 2025 06:25 AM', source: 'Automated', status: 'Completed' },
    { id: 49, created: '09 Jul 2025 06:25 AM', source: 'Automated', status: 'Completed' },
    { id: 48, created: '08 Jul 2025 06:25 AM', source: 'Automated', status: 'Completed' },
    { id: 47, created: '07 Jul 2025 06:25 AM', source: 'Automated', status: 'Completed' },
    { id: 46, created: '06 Jul 2025 06:25 AM', source: 'Automated', status: 'Completed' },
];

export default function BackupSettings() {
    const [backups] = useState(mockBackups);

    const handleCreateBackup = () => {
        console.log('Creating backup...');
    };

    const handleSetupAutoBackup = () => {
        console.log('Setting up auto backup...');
    };

    const handleDownloadBackup = (id: number) => {
        console.log(`Downloading backup ${id}...`);
    };

    const handleDeleteBackup = (id: number) => {
        console.log(`Deleting backup ${id}...`);
    };

    const handleSendToDrive = (id: number) => {
        console.log(`Sending backup ${id} to drive...`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Backup Settings" />

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
                <SettingsTabs activeTab="backup" />

                {/* Backup Settings Content */}
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                Backups
                                <HelpCircle className="h-5 w-5 text-gray-400 ml-2" />
                            </h2>
                        </div>
                        <div className="flex space-x-3">
                            <Button onClick={handleCreateBackup} className="bg-blue-600 hover:bg-blue-700">
                                Create Backup
                            </Button>
                            <Button 
                                onClick={handleSetupAutoBackup} 
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <Cloud className="h-4 w-4 mr-2" />
                                Setup Auto Backup
                            </Button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                        Backups will be deleted automatically in 7 days.
                    </p>

                    {/* Backups Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-20">S No.</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-48">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {backups.map((backup) => (
                                    <TableRow key={backup.id}>
                                        <TableCell className="font-medium">{backup.id}</TableCell>
                                        <TableCell>{backup.created}</TableCell>
                                        <TableCell>{backup.source}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                                {backup.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                                    onClick={() => handleDownloadBackup(backup.id)}
                                                >
                                                    <Download className="h-4 w-4 mr-1" />
                                                    Download
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-red-200 text-red-700 hover:bg-red-50"
                                                    onClick={() => handleDeleteBackup(backup.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Delete
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                                                    onClick={() => handleSendToDrive(backup.id)}
                                                >
                                                    <Play className="h-4 w-4 mr-1" />
                                                    Send To Drive
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
