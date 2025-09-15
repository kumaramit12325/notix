import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import { Link } from '@inertiajs/react';

export default function EngagementsIndex() {
  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <UserSidebarHeader breadcrumbs={[{ title: 'App Dashboard', href: '/user/appdashboard/dashboard' }]} />
        <Head title="Engagements" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Push Notification <span className="inline-block align-middle text-blue-500" title="Engagements Info">&#9432;</span></h1>
            <Link href="/appdashboard/engagements/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2">
                <span className="text-lg">&#8853;</span> New Push Notification
              </Button>
            </Link>
          </div>
          <div className="flex gap-6 mb-4">
            {['All', 'Active', 'Draft', 'Paused'].map((tab) => (
              <div key={tab} className="flex items-center gap-1">
                <span className="text-blue-600 font-semibold cursor-pointer">{tab}</span>
                <span className="bg-gray-200 text-gray-600 rounded-full px-2 text-xs">0</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded shadow">
            <div className="grid grid-cols-3 border-b px-6 py-3 font-semibold text-gray-700">
              <div>Notifications</div>
              <div>Stats</div>
              <div>Action</div>
            </div>
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#f3f4f6"/><path d="M8 12h8M8 16h8M8 8h8" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/></svg>
              <span>No Data</span>
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
