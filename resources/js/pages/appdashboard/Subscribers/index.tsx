import { Head, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import React from 'react';

interface Subscriber {
  id: number;
  endpoint: string;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  site: {
    id: number;
    name: string;
    url: string;
  };
  subscribers: Subscriber[];
}

export default function SubscribersIndex() {
  const { site, subscribers } = usePage<PageProps>().props;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden p-5">
        <UserSidebarHeader breadcrumbs={[
          { title: 'Sites', href: '/user-dashboard' },
          { title: site.name, href: `/sites/${site.id}/dashboard` },
          { title: 'Subscribers', href: `/sites/${site.id}/subscribers` }
        ]} />
        <Head title={`Subscribers - ${site.name}`} />
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Subscriber Details
              <span className="inline-block align-middle text-blue-500 cursor-pointer" title="Subscriber Info">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
              </span>
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <span role="img" aria-label="broom">🧹</span> Clean up subscribers
              </Button>
              <Button variant="outline" size="icon" className="ml-2">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="bg-white rounded shadow border">
            <div className="grid grid-cols-4 border-b px-6 py-3 font-semibold text-gray-700">
              <div>Subscriber ID</div>
              <div className="col-span-2">Endpoint</div>
              <div>Subscribed At</div>
            </div>
            {subscribers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-56 text-gray-400">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2">
                  <rect width="24" height="24" rx="4" fill="#f3f4f6"/>
                  <path d="M7 10v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 10V8a3 3 0 1 1 6 0v2" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-base mb-2">No Subscribers Yet</span>
                <span className="text-sm text-gray-500">Once visitors subscribe to push notifications on your site, they will appear here.</span>
              </div>
            ) : (
              <div className="divide-y">
                {subscribers.map((subscriber) => (
                  <div key={subscriber.id} className="grid grid-cols-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="text-sm font-medium text-gray-900">#{subscriber.id}</div>
                    <div className="col-span-2 text-sm text-gray-600 truncate" title={subscriber.endpoint}>
                      {subscriber.endpoint}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(subscriber.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
