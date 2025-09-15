import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { LayoutGrid, User, PlayCircle, LogOut, Globe, AudioLines, GrapeIcon, Settings } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';
import { useState } from 'react';

const customNavItems = [
  {
    title: 'App Dashboard',
    href: '/appdashboard/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Engagements',
    icon: Globe,
    hasDropdown: true,
    items: [
        {
            title: 'Push Notification',
            href: '/appdashboard/engagements',
        },
        {
            title: 'Push Autoresponder',
            href: '/appdashboard/autoresponder',
        },
        {
            title: 'Push Triggers',
            href: '/appdashboard/triggers',
        },
        {
            title: 'Templates',
            href: '/appdashboard/template',
        }
    ]
},
  {
    title: 'Audience',
    icon: AudioLines,
    hasDropdown: true,
    items: [
        {
            title: 'Subscribers',
            href: '/appdashboard/subscriber',
        },
        {
            title: 'Segments',
            href: '/appdashboard/segment',
        },
        {
            title: 'Audiences',
            href: '/appdashboard/audience',
        },
        {
            title: 'Attributes',
            href: '/appdashboard/attribute',
        }
    ]
},
  {
    title: 'Analytics',
    icon: GrapeIcon,
    hasDropdown: true,
    items: [
        {
            title: 'Overview',
            href: '/appdashboard/overview',
        },
        {
            title: 'Subscription',
            href: '/appdashboard/subscription',
        },
      
    ]
},
  {
    title: 'Setting',
    icon: Settings,
    hasDropdown: true,
    items: [
        {
            title: 'Defaults',
            href: '/appdashboard/defaults',
        },
        {
            title: 'Site Config',
            href: '/appdashboard/site-config',
        },
        {
            title: 'Installation',
            href: '/appdashboard/setup',
        },
      
    ]
},
 
];

export function AppDashboardSidebar() {
  // Open dropdown if any subitem is active by default
  const { url } = usePage();
  const currentPath = url;
  const getActiveDropdown = () => {
    const activeDropdown = customNavItems.find(
      (item) => item.items && item.items.some((sub) => currentPath.startsWith(sub.href))
    );
    return activeDropdown ? activeDropdown.title : null;
  };
  const [openDropdown, setOpenDropdown] = useState<string | null>(getActiveDropdown());

  const handleDropdownClick = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

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
        <SidebarMenu className=''>
          {customNavItems.map((item) => {
            const isActive = item.href && currentPath.startsWith(item.href);
            const isDropdownActive = item.items && item.items.some((sub) => currentPath.startsWith(sub.href));
            return (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <SidebarMenuButton
                      asChild
                      className={`text-whith hover:bg-blue-100 my-1 hover:text-blue-900 transition-colors duration-200 cursor-pointer flex items-center justify-between ${isDropdownActive ? 'bg-white text-blue-700' : ''}`}
                      onClick={() => handleDropdownClick(item.title)}
                    >
                      <span className="flex items-center w-full">
                        <item.icon className="w-6 h-6" />
                        <span className="ml-2 flex-1">{item.title}</span>
                        <span className="ml-auto">{openDropdown === item.title || isDropdownActive ? '▼' : '►'}</span>
                      </span>
                    </SidebarMenuButton>
                    {(openDropdown === item.title || isDropdownActive) && (
                      <SidebarMenu className="ps-6">
                        {item.items.map((sub) => {
                          const isSubActive = currentPath.startsWith(sub.href);
                          return (
                            <SidebarMenuItem key={sub.title}>
                              <SidebarMenuButton asChild className={`hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200 ${isSubActive ? 'bg-white text-blue-700' : ''}`}>
                                <Link href={sub.href} prefetch>
                                  <span>{sub.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </SidebarMenu>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton asChild className={`text-whith hover:bg-blue-100 my-1 hover:text-blue-900 transition-colors duration-200 ${isActive ? 'bg-white text-blue-700' : ''}`}>
                    <Link href={item.href!} prefetch>
                      <item.icon className="w-6 h-6" />
                      <span className="ml-2">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-800 bg-gray-900 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-white">User Panel</div>
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

export default AppDashboardSidebar;
