import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import UserSidebar from '@/components/user-sidebar';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function UserLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <UserSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <UserSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}


