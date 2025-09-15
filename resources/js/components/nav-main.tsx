import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

    const toggleDropdown = (title: string) => {
        const newOpenDropdowns = new Set(openDropdowns);
        if (newOpenDropdowns.has(title)) {
            newOpenDropdowns.delete(title);
        } else {
            newOpenDropdowns.add(title);
        }
        setOpenDropdowns(newOpenDropdowns);
    };

    const renderNavItem = (item: NavItem, isDropdownItem = false) => {
        // Check if any dropdown item is active for parent dropdown
        const isDropdownActive = item.hasDropdown && item.items && 
            item.items.some(dropdownItem => page.url.split('?')[0].startsWith((dropdownItem.href || '').split('?')[0]));
        
        // Check if current item is active
        const isActive = isDropdownItem ? 
            page.url === (item.href || '') : 
            (page.url.split('?')[0].startsWith((item.href || '').split('?')[0]) || isDropdownActive);
        
        // Auto-open dropdown if any child is active
        if (item.hasDropdown && isDropdownActive && !openDropdowns.has(item.title)) {
            setTimeout(() => toggleDropdown(item.title), 0);
        }

        // Only the actual active clickable item should be white.
        // Parent dropdown container should NOT become white when a child is active.
        const shouldWhite = isActive && (!item.hasDropdown || isDropdownItem);

        return (
            <SidebarMenuItem key={item.title}>
                {item.hasDropdown && !isDropdownItem ? (
                    <SidebarMenuButton 
                        onClick={() => toggleDropdown(item.title)}
                        isActive={shouldWhite}
                        tooltip={{ children: item.title }}
                        className={`w-full ${shouldWhite ? 'bg-white text-black' : 'text-white hover:bg-blue-800'}`}
                    >
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                                <span>{item.title}</span>
                            </div>
                            <ChevronDown 
                                className={`h-4 w-4 transition-transform duration-200 ${
                                    openDropdowns.has(item.title) ? 'rotate-180' : ''
                                }`} 
                            />
                        </div>
                    </SidebarMenuButton>
                ) : (
                    <SidebarMenuButton 
                        asChild 
                        isActive={shouldWhite} 
                        tooltip={{ children: item.title }}
                        className={`${shouldWhite ? 'bg-white text-black' : 'text-white hover:bg-blue-800'} mt-1 ${
                            isDropdownItem ? 'ml-1 text-sm' : ''
                        }`}
                    >
                        <Link href={item.href || '#'} prefetch className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                )}
                
                {item.hasDropdown && item.items && openDropdowns.has(item.title) && (
                    <div className="ml-2 border-l border-gray-700">
                        {item.items.map((dropdownItem) => renderNavItem(dropdownItem, true))}
                    </div>
                )}
            </SidebarMenuItem>
        );
    };

    return (
        <SidebarGroup className="px-2  py-0 mt-2">
            <SidebarMenu>
                {items.map((item) => renderNavItem(item))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
