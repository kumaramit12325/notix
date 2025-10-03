import React, { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';

export default function SiteConfigPage() {
  const { site } = usePage().props as any;
  
  const { data, setData, post, processing, isDirty } = useForm({
    name: site?.name ?? '',
    url: site?.url ?? '',
    notification_icon_url: site?.notification_icon_url ?? '',
    badge_icon_url: site?.badge_icon_url ?? '',
    remove_powered_by: Boolean(site?.remove_powered_by ?? false),
    universal_subscription_link: Boolean(site?.universal_subscription_link ?? false),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('site.config.update', site.id), {
      preserveScroll: true,
      onSuccess: () => {
        // Handle success
      },
    });
  };

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden bg-[#f7f9fb] min-h-screen">
        <UserSidebarHeader breadcrumbs={[{ title: 'App Dashboard', href: '/appdashboard/dashboard' }]} />
        <Head title="Site Configuration" />

        <form onSubmit={handleSubmit} className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Site Configuration
              <span className="inline-block align-middle text-blue-500 cursor-pointer" title="Info">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
              </span>
            </h1>
            <button 
              type="submit" 
              disabled={!isDirty || processing}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                isDirty && !processing 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="text-sm">{processing ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          <div className="bg-white rounded shadow p-8 mb-8">
            <div className="grid grid-cols-1 gap-5 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <label className="md:col-span-1 text-sm font-medium">Site Name</label>
                <input 
                  className="md:col-span-5 border rounded px-3 py-2" 
                  value={data.name} 
                  onChange={(e) => setData('name', e.target.value)} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <label className="md:col-span-1 text-sm font-medium">Site Url</label>
                <input 
                  className="md:col-span-5 border rounded px-3 py-2" 
                  value={data.url} 
                  onChange={(e) => setData('url', e.target.value)} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <label className="md:col-span-1 text-sm font-medium">Notification Icon URL</label>
                <input 
                  className="md:col-span-5 border rounded px-3 py-2" 
                  placeholder="https://yoursite.com/icon.png"
                  value={data.notification_icon_url} 
                  onChange={(e) => setData('notification_icon_url', e.target.value)} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <label className="md:col-span-1 text-sm font-medium">Badge Icon URL</label>
                <input 
                  className="md:col-span-5 border rounded px-3 py-2" 
                  placeholder="https://yoursite.com/badge.png"
                  value={data.badge_icon_url} 
                  onChange={(e) => setData('badge_icon_url', e.target.value)} 
                />
              </div>
              {(!data.notification_icon_url && !data.badge_icon_url) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ <strong>Important:</strong> You must configure at least one icon URL before sending notifications. Icons must be hosted on your own domain (same-origin) to work correctly on your live website.
                  </p>
                </div>
              )}
              {(data.notification_icon_url || data.badge_icon_url) && (
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <p className="text-blue-800 text-sm font-medium mb-2">Current Icons Preview:</p>
                  <div className="flex gap-4 items-center">
                    {data.notification_icon_url && (
                      <div className="flex flex-col gap-2">
                        <img src={data.notification_icon_url} alt="Notification Icon" className="w-16 h-16 rounded object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        <span className="text-xs text-blue-600">Notification</span>
                      </div>
                    )}
                    {data.badge_icon_url && (
                      <div className="flex flex-col gap-2">
                        <img src={data.badge_icon_url} alt="Badge Icon" className="w-16 h-16 rounded object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        <span className="text-xs text-blue-600">Badge</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded shadow p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1">Remove "Powered By Notix"</h3>
                <p className="text-gray-600 max-w-3xl">Enable this option to remove the "Powered by Notix" branding from your notifications.</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={data.remove_powered_by} 
                  onChange={(e) => setData('remove_powered_by', e.target.checked)} 
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative transition-colors">
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded shadow p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1">Universal Subscription Link</h3>
                <p className="text-gray-600 max-w-3xl">This link can be embedded anywhere to get any one subscribed to the current application.</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={data.universal_subscription_link} 
                  onChange={(e) => setData('universal_subscription_link', e.target.checked)} 
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative transition-colors">
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                </div>
              </label>
            </div>

            <button type="button" className="mt-6 border px-4 py-2 rounded flex items-center gap-2">
              <span className="text-gray-700">Click here For Setup Instruction</span>
            </button>

            <div className="flex justify-end mt-6">
              <button 
                type="submit" 
                disabled={!isDirty || processing}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  isDirty && !processing 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span className="text-sm">{processing ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </AppContent>
    </AppShell>
  );
}


