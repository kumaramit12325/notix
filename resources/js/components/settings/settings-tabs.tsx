import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
    Settings, 
    User, 
    Globe, 
    Database, 
    Download 
} from 'lucide-react';

interface SettingsTabsProps {
    activeTab: string;
}

const settingsTabs = [
    { id: 'general', title: 'General', icon: Settings, href: '/settings/general' },
    { id: 'profile', title: 'Profile', icon: User, href: '/settings/profile' },
    { id: 'language', title: 'Language & Region', icon: Globe, href: '/settings/language' },
    { id: 'backup', title: 'Backup', icon: Database, href: '/settings/backup' },
    { id: 'advanced', title: 'Advanced', icon: Settings, href: '/settings/advanced' },
    { id: 'update', title: 'Update', icon: Download, href: '/settings/update' },
];

export default function SettingsTabs({ activeTab }: SettingsTabsProps) {
    return (
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
            {settingsTabs.map((tab) => (
                <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                        "flex-1 justify-center transition-all duration-200",
                        activeTab === tab.id 
                            ? "bg-blue-600 text-white shadow-sm" 
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                    asChild
                >
                    <Link href={tab.href}>
                        <tab.icon className="h-4 w-4 mr-2" />
                        {tab.title}
                    </Link>
                </Button>
            ))}
        </div>
    );
}
