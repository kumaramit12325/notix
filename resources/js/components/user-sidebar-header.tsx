import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell, Mail, Search, User, LogOut, Crown, CreditCard, HelpCircle, Settings, LayoutGrid, ChevronsUpDown } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { router, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, usePage as useInertiaPage } from '@inertiajs/react';
import clsx from 'clsx';

export function UserSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { appearance, updateAppearance } = useAppearance();
    const { auth, site } = usePage<SharedData>().props;
    const user = auth?.user;
    const page = useInertiaPage();
    const currentUrl = page.url;
    const siteId = (site as any)?.id;

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

    const toggleTheme = () => {
        const nextTheme = appearance === 'light' ? 'dark' : 'light';
        updateAppearance(nextTheme);
    };

    // Dropdown links - Make App Dashboard site-specific if we have a siteId
    const dashboards = [
        {
            label: 'App Dashboard',
            href: siteId ? `/sites/${siteId}/dashboard` : '/user-dashboard',
        },
        {
            label: 'User Dashboard',
            href: '/user-dashboard',
        },
    ];

    // Find current dashboard label - improved detection
    const getCurrentDashboard = () => {
        if (currentUrl.startsWith('/sites/')) {
            const siteName = (site as any)?.site_name;
            return siteName ? `App Dashboard - ${siteName}` : 'App Dashboard';
        } else if (currentUrl.startsWith('/user-dashboard')) {
            return 'User Dashboard';
        }
        return 'User Dashboard';
    };
    
    const currentDashboard = getCurrentDashboard();

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4 bg-white">
            {/* Left side - Dropdown and Title */}
            <div className="flex items-center gap-6 flex-1">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                </div>
                {/* Dropdown for Dashboards */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4" />
                            <span>{currentDashboard}</span>
                            <ChevronsUpDown className="w-4 h-4 ml-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {dashboards.map((dashboard) => (
                            <DropdownMenuItem asChild key={dashboard.href}>
                                <Link
                                    href={dashboard.href}
                                    className={clsx(
                                        'w-full px-2 py-1.5 rounded text-sm',
                                        currentUrl === dashboard.href ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                                    )}
                                >
                                    {dashboard.label}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Right side - Actions and User Menu */}
            <div className="flex items-center gap-4">
                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/user/support">
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Support
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/user/subscription">
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade
                        </Link>
                    </Button>
                </div>
                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user?.avatar} alt={getDisplayName()} />
                                <AvatarFallback className="bg-blue-600 text-white">
                                    {getUserInitials()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <div className="flex items-center justify-start gap-2 p-2">
                            <div className="flex flex-col space-y-1 leading-none">
                                <p className="font-medium">{getDisplayName()}</p>
                                <p className="w-[200px] truncate text-sm text-muted-foreground">
                                    {user?.email}
                                </p>
                                <p className="text-xs text-blue-600 font-medium">
                                    Free Plane
                                </p>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/user/profile" className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/user/billing" className="cursor-pointer">
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/user/settings" className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/logout" method="post" as="button" className="cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
