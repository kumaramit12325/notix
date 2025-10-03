import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';

export default function AppDashboard() {
  const { site, stats } = usePage().props as any;

  const statCards = [
    { 
      title: 'Total Subscribers', 
      value: stats?.total_subscribers || 0, 
      change: stats?.subscribers_last_30_days || 0 
    },
    { 
      title: 'Total Notification', 
      value: stats?.total_notifications || 0, 
      change: 0 
    },
    { 
      title: 'Delivered', 
      value: stats?.delivered || 0, 
      change: 0 
    },
    { 
      title: 'Clicked', 
      value: stats?.clicked || 0, 
      change: stats?.clicked_last_30_days || 0 
    },
  ];

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <UserSidebarHeader breadcrumbs={[
          { title: site?.site_name || 'Dashboard', href: `/sites/${site?.id}/dashboard` }
        ]} />
        <Head title="Dashboard" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard <span className="inline-block align-middle text-blue-500" title="Dashboard Overview">&#9432;</span></h1>
              <p className="text-sm text-gray-600 mt-1">{site?.site_name} - Overview & Statistics</p>
            </div>
            <Link href={`/sites/${site?.id}/engagements/create`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2">
                <span className="text-lg">&#8853;</span> New Push Notification
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => (
              <div key={stat.title} className="bg-white rounded shadow p-6 flex flex-col items-start">
                <span className="text-gray-600 text-sm mb-2">{stat.title}</span>
                <span className="text-3xl font-bold mb-1">{stat.value}</span>
                <span className={`text-xs flex items-center gap-1 ${stat.change > 0 ? 'text-green-500' : 'text-gray-400'}`}>
                  {stat.change > 0 && '↑'} {stat.change} <span className="text-gray-400">vs prev 30 days</span>
                </span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded shadow p-6 mb-8">
            <div className="flex items-center gap-6 mb-4">
              <span className="text-blue-600 text-sm font-semibold">● New Subscribers</span>
              <span className="text-green-600 text-sm font-semibold">● Unsubscribers</span>
              <span className="text-gray-600 text-sm font-semibold">● Notifications Sent</span>
              <span className="text-yellow-500 text-sm font-semibold">● Sent(Subscribers)</span>
              <span className="text-red-500 text-sm font-semibold">● Delivered(Subscribers)</span>
              <span className="text-fuchsia-600 text-sm font-semibold">● Clicked</span>
            </div>
            <div className="h-40 flex items-center justify-center text-gray-400">0</div>
            <div className="text-xs text-gray-500 mt-2">Last 7 Days : Aug 20, 2025 - Aug 27, 2025</div>
          </div>
          <div className="bg-white rounded shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Recent Notifications <span className="inline-block align-middle text-blue-500" title="Recent Notifications">&#9432;</span></span>
              <a href="#" className="text-blue-600 text-xs">See more</a>
            </div>
            <div className="flex flex-col items-center justify-center h-32 text-gray-400">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#f3f4f6"/><path d="M8 12h8M8 16h8M8 8h8" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/></svg>
              <span>No Data</span>
            </div>
          </div>
          <div className="bg-white rounded shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Demographic Overview <span className="inline-block align-middle text-blue-500" title="Demographic Overview">&#9432;</span></span>
              <a href="#" className="text-blue-600 text-xs">View Full Report</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Countries Distribution', 'Browsers Distribution', 'Devices Distribution', 'Operating Systems'].map((title) => (
                <div key={title} className="bg-gray-50 rounded p-4 flex flex-col items-center">
                  <span className="font-semibold mb-2">{title}</span>
                  <table className="w-full text-xs mb-2">
                    <thead>
                      <tr>
                        <th className="text-left font-normal text-gray-500">Name</th>
                        <th className="text-left font-normal text-gray-500">Users</th>
                        <th className="text-left font-normal text-gray-500">% Users</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="flex flex-col items-center justify-center h-16 text-gray-400">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#f3f4f6"/><path d="M8 12h8M8 16h8M8 8h8" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span>No Data</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
