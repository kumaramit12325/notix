import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { 
    LayoutGrid, 
    ShoppingCart, 
    CreditCard, 
    User, 
    Settings, 
    Bell, 
    Target, 
    Zap, 
    Link as LinkIcon,
    BarChart3,
    FileText,
    HelpCircle,
    LogOut,
    Package,
    Users,
    Crown,
    Shield,
    Activity,
    MessageSquare,
    BookOpen,
    Gift
} from 'lucide-react';
import AppLogo from './app-logo';

const userNavItems: NavItem[] = [
 
    {
        title: 'Dashboard',
        href: '/user-dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My Account',
        href: '/user/profile',
        icon: User,
    },
    {
        title: 'Upgrade',
        href: '/user/subscription',
        icon: Crown,
    },
    {
        title: 'Billing',
        href: '/user/billing',
        icon: CreditCard,
    },
    {
        title: 'support',
        href: '/user/support',
        icon: CreditCard,
    },
   
    // {
    //     title: 'Settings',
    //     href: '/user/settings',
    //     icon: Settings,
    // },
];

export function UserSidebar() {
    const { auth } = usePage<SharedData>().props;
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-gray-900 text-white">
            <SidebarHeader className="border-b border-gray-800">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="text-black hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200">
                            <Link href="/user-dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-gray-900 pb-3">
                <NavMain items={userNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-800 bg-gray-900 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm">
                            <div className="font-medium text-white">{auth.user.name}</div>
                            <div className="text-gray-400 text-xs">Free Plan</div>
                        </div>
                    </div>
                    <Link 
                        href="/logout" 
                        method="post" 
                        as="button"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

export default UserSidebar;


