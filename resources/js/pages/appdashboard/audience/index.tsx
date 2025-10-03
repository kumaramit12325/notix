import { Head, Link, usePage, router } from '@inertiajs/react';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import React from 'react';

export default function AudienceIndex() {
  const { site, audiences } = usePage().props as any;
  
  const handleDelete = (audienceId: number) => {
    if (confirm('Are you sure you want to delete this audience group?')) {
      router.delete(`/sites/${site.id}/audiences/${audienceId}`);
    }
  };
  
  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden bg-[#f7f9fb] min-h-screen">
        <UserSidebarHeader breadcrumbs={[{ title: 'Audience Groups', href: `/sites/${site?.id}/audiences` }]} />
        <Head title="Audience Groups" />
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Audience Groups
                <span className="inline-block align-middle text-blue-500 cursor-pointer" title="Audience Info">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
                </span>
              </h1>
              <p className="text-sm text-gray-600 mt-1">{site?.site_name} - Manage audience groups</p>
            </div>
            <Link
              href={`/sites/${site?.id}/audiences/create`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition flex items-center gap-2"
            >
              Create Audience Group
            </Link>
          </div>
          <div className="bg-white rounded shadow border overflow-hidden">
            <div className="grid grid-cols-12 border-b px-6 py-3 font-semibold text-gray-700 text-sm">
              <div className="col-span-11">Audience Group Name</div>
              <div className="col-span-1"></div>
            </div>
            {audiences && audiences.length > 0 ? (
              audiences.map((audience: any) => (
                <div key={audience.id} className="grid grid-cols-12 px-6 py-4 items-center border-b last:border-b-0 hover:bg-gray-50">
                  <div className="col-span-11">
                    <div className="font-semibold text-gray-900">{audience.name}</div>
                    <div className="text-gray-400 text-sm mt-1">{audience.description || 'No description'}</div>
                  </div>
                  <div className="col-span-1 flex gap-2 justify-end">
                    <button 
                      onClick={() => handleDelete(audience.id)}
                      className="rounded-full border border-gray-200 p-2 hover:bg-red-50 hover:border-red-300 transition" 
                      title="Delete"
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z" stroke="#d11a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                <p className="text-lg font-semibold mb-2">No audience groups yet</p>
                <p className="text-sm">Create your first audience group to segment subscribers</p>
              </div>
            )}
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
