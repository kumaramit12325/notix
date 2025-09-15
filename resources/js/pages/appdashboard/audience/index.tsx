import { Head } from '@inertiajs/react';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import React from 'react';

export default function AudienceIndex() {
  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden bg-[#f7f9fb] min-h-screen">
        <UserSidebarHeader breadcrumbs={[{ title: 'App Dashboard', href: '/user/appdashboard/dashboard' }]} />
        <Head title="Audience Groups" />
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Audience Groups
              <span className="inline-block align-middle text-blue-500 cursor-pointer" title="Audience Info">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
              </span>
            </h1>
            <a
              href="/appdashboard/audience/create"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition flex items-center gap-2"
            >
              Create Audience Group
            </a>
          </div>
          <div className="bg-white rounded shadow border overflow-hidden">
            <div className="grid grid-cols-12 border-b px-6 py-3 font-semibold text-gray-700 text-sm">
              <div className="col-span-11">Audience Group Name</div>
              <div className="col-span-1"></div>
            </div>
            {/* Sample Row */}
            <div className="grid grid-cols-12 px-6 py-4 items-center border-b last:border-b-0 hover:bg-gray-50">
              <div className="col-span-11">
                <div className="font-semibold text-gray-900">29-Aug-2025 Audience Group</div>
                <div className="text-gray-400 text-sm mt-1">aaaaa</div>
              </div>
              <div className="col-span-1 flex gap-2 justify-end">
                <button className="rounded-full border border-gray-200 p-2 hover:bg-gray-100" title="Edit">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 0 0 .707-.293l9.414-9.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0l-9.414 9.414A1 1 0 0 0 4 20z" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="rounded-full border border-gray-200 p-2 hover:bg-gray-100" title="Delete">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z" stroke="#d11a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
