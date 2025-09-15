import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell, Mail, Maximize2, Search, ChevronDown, Lightbulb, Moon, Sun, Monitor, User, LogOut } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { router, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { appearance, updateAppearance } = useAppearance();
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user?.name) return 'U';
        return user.name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Get display name
    const getDisplayName = () => {
        if (!user?.name) return 'User';
        return user.name;
    };

    // Get user role
    const getUserRole = () => {
        if (!user) return 'Guest';
        // Check for role in user properties
        if (user.role) return user.role;
        if (user.membership) return user.membership;
        return 'Member';
    };

    // Get last login time
    const getLastLoginTime = () => {
        if (!user?.updated_at) return 'Recently';
        const lastUpdate = new Date(user.updated_at);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    };

    const getCurrentIcon = () => {
        switch (appearance) {
            case 'dark':
                return <Moon className="h-5 w-5" />;
            case 'light':
                return <Sun className="h-5 w-5" />;
            default:
                return <Monitor className="h-5 w-5" />;
        }
    };

    const toggleTheme = () => {
        const nextTheme = appearance === 'light' ? 'dark' : 'light';
        updateAppearance(nextTheme);
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            {/* Left side - Title and Search */}
            <div className="flex items-center gap-6 flex-1">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold text-gray-700"> Dashboard</h1>
                        {user?.name && (
                            <p className="text-sm text-gray-500">
                                {auth.user.role === 'Admin' && (
                                    <span className="text-green-500">Admin</span>
                                )}
                                {auth.user.role === 'User' && (
                                    <span className="text-blue-500">User</span>
                                )}
                            </p>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-5xl">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none border border-1 border-gray-500 focus:ring-blue-500"
                    />
                </div>
             
               
                <div className='flex items-center gap-2'>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                        Create New Campaign
                    </button>
                </div>
           

    
               
                <div className='flex items-center gap-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[400px] max-h-[500px] overflow-y-auto">
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-medium text-lg">Notifications</span>
                                    <button className="text-sm text-blue-600 hover:text-blue-700">Mark all as read</button>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bell className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Campaign 107 Ended</p>
                                                <span className="text-xs text-gray-500">1 min ago</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">Completed in 1 minute and 53 seconds</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bell className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Campaign 107 Started</p>
                                                <span className="text-xs text-gray-500">2 mins ago</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">Campaign has been initiated successfully</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bell className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Campaign 106 Ended</p>
                                                <span className="text-xs text-gray-500">1 hour ago</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">Completed in 1 minute and 54 seconds</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className='flex items-center gap-2 px-2'>
                        <button
                            onClick={toggleTheme}
                            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title={`Switch to ${appearance === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {getCurrentIcon()}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right side - User Profile */}
            <div className="flex items-center gap-4">
                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                                {user?.avatar ? (
                                    <img 
                                        src={user.avatar} 
                                        alt={getDisplayName()} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white text-sm font-medium">{getUserInitials()}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium text-gray-700">{getDisplayName()}</span>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-3 py-2 border-b border-gray-100">
                            <div className="text-sm font-medium">{getDisplayName()}</div>
                            <div className="text-xs text-gray-500">{user?.email || 'user@example.com'}</div>
                            {/* <div className="text-xs text-blue-600 font-medium mt-1">{getUserRole()}</div> */}
                            <div className="text-xs text-gray-400 mt-1">Last active: {getLastLoginTime()}</div>
                        </div>
                        <DropdownMenuItem
                            onClick={() => router.visit('/user/profile')}
                            className="cursor-pointer"
                        >
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => router.post('/logout')}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
