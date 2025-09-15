import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
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

const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' },
];

const timezones = [
    { value: 'UTC+00:00', label: '(UTC+00:00) Europe/London' },
    { value: 'UTC+01:00', label: '(UTC+01:00) Europe/Paris' },
    { value: 'UTC+02:00', label: '(UTC+02:00) Europe/Kiev' },
    { value: 'UTC+03:00', label: '(UTC+03:00) Europe/Moscow' },
    { value: 'UTC+04:00', label: '(UTC+04:00) Asia/Dubai' },
    { value: 'UTC+05:00', label: '(UTC+05:00) Asia/Tashkent' },
    { value: 'UTC+05:30', label: '(UTC+05:30) Asia/Kolkata (selected)' },
    { value: 'UTC+06:00', label: '(UTC+06:00) Asia/Almaty' },
    { value: 'UTC+07:00', label: '(UTC+07:00) Asia/Bangkok' },
    { value: 'UTC+08:00', label: '(UTC+08:00) Asia/Shanghai' },
    { value: 'UTC+09:00', label: '(UTC+09:00) Asia/Tokyo' },
    { value: 'UTC+10:00', label: '(UTC+10:00) Australia/Sydney' },
    { value: 'UTC+11:00', label: '(UTC+11:00) Pacific/Guadalcanal' },
    { value: 'UTC+12:00', label: '(UTC+12:00) Pacific/Auckland' },
    { value: 'UTC-05:00', label: '(UTC-05:00) America/New_York' },
    { value: 'UTC-06:00', label: '(UTC-06:00) America/Chicago' },
    { value: 'UTC-07:00', label: '(UTC-07:00) America/Denver' },
    { value: 'UTC-08:00', label: '(UTC-08:00) America/Los_Angeles' },
];

export default function LanguageSettings() {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [selectedTimezone, setSelectedTimezone] = useState('UTC+05:30');
    const [readMoreText, setReadMoreText] = useState('...Read More');

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Language settings saved');
    };

    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value);
    };

    const handleTimezoneChange = (value: string) => {
        setSelectedTimezone(value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Language & Region Settings" />

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
                <SettingsTabs activeTab="language" />

                {/* Language & Region Settings Content */}
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            Language & Region Settings
                            <HelpCircle className="h-5 w-5 text-gray-400 ml-2" />
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Language Selection */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700 flex items-center">
                                Language
                                <HelpCircle className="h-4 w-4 text-gray-400 ml-2" />
                            </Label>
                            <div className="flex space-x-3">
                                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map((language) => (
                                            <SelectItem key={language.value} value={language.value}>
                                                {language.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleLanguageChange(selectedLanguage)}
                                >
                                    Change to {languages.find(l => l.value === selectedLanguage)?.label}
                                </Button>
                            </div>
                        </div>

                        {/* Timezone Selection */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700 flex items-center">
                                Timezone
                                <HelpCircle className="h-4 w-4 text-gray-400 ml-2" />
                            </Label>
                            <Select value={selectedTimezone} onValueChange={handleTimezoneChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timezones.map((timezone) => (
                                        <SelectItem key={timezone.value} value={timezone.value}>
                                            {timezone.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* ReadMore Text */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700 flex items-center">
                                ReadMore Text
                                <HelpCircle className="h-4 w-4 text-gray-400 ml-2" />
                            </Label>
                            <Input
                                value={readMoreText}
                                onChange={(e) => setReadMoreText(e.target.value)}
                                placeholder="...Read More"
                                className="w-full"
                            />
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-center pt-4">
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
