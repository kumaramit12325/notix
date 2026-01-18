import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Send,
    Users,
    ShoppingCart,
    CreditCard,
    FileText,
    Globe,
    Youtube,
    Mail,
    Apple,
    SendToBack,
    Settings,
    Server,
    UserCircleIcon,
} from 'lucide-react';
import AppLogo from './app-logo';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Domains',
        icon: Globe,
        hasDropdown: true,
        items: [
            {
                title: 'View/Modify',
                href: '/domains/modify',
            },
            {
                title: 'Integration',
                href: '/domains/integration',
            },
            {
                title: 'Import/Export',
                href: '/domains/import-export',
            }
        ]
    },
    {
        title: 'Users',
        href: '/users',
        icon: Users,
    },
    {
        title: 'YouTube',
        href: '/youtube',
        icon: Youtube,
    },
    {
        title: 'LP Links',
        href: '/lplinks',
        icon: Youtube,
    },
    {
        title: 'Campaigns',
        href: '/campaigns',
        icon: Mail,
    },
    {
        title: 'Automation',
        href: '/automation',
        icon: Send,
        hasDropdown: true,
        items: [
            { title: 'Automagic', href: '/automation' },
            { title: 'Welcome Push', href: '/welcomepush' },
            { title: 'YouTube Push', href: '/youtubpush' },
        ]
    },
    {
        title: 'Statistics',
        href: '/statistics',
        icon: Apple,
    },
    {
        title: 'Segmentation',
        href: '/segmentation',
        icon: SendToBack,
    },
    {
        title: 'Orders',
        href: '/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Payments',
        href: '/payments',
        icon: CreditCard,
    },
    // {
    //     title: 'Contact',
    //     href: '/contact',
    //     icon: Send,
    // },
    // {
    //     title: 'Test PDF',
    //     href: '/test-pdf-page',
    //     icon: FileText,
    // },
    {
        title: 'Setting',
        href: 'settings',
        icon: Settings,
    },
    {
        title: 'User Sites',
        href: '/admin/user-sites',
        icon: UserCircleIcon,
    },
    {
        title: 'Server States',
        href: 'serverStates',
        icon: Server,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     // icon: Briefcase,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: Clock,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-gray-900 text-white">
            <SidebarHeader className="border-b border-gray-800"> 
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="text-black hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200">
                            <Link href="/dashboard" prefetch>
                                <AppLogo />

                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-gray-900 pb-3">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-800 bg-gray-900">
                <NavFooter items={footerNavItems} className="mt-auto" />
                {/* <NavUser /> */}
            </SidebarFooter>
        </Sidebar>
    );
}
