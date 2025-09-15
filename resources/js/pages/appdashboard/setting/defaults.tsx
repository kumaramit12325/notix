import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';

export default function DefaultsPage() {
  const { defaults } = usePage().props as any;

  const initialUtmSource = defaults?.utm?.source ?? 'alertwise';
  const initialUtmMedium = defaults?.utm?.medium ?? 'pushnotification';
  const initialUtmCampaign = defaults?.utm?.campaign ?? 'alertwise';
  const initialUtmTerm = defaults?.utm?.term ?? '';
  const initialUtmContent = defaults?.utm?.content ?? '';

  const initialTtlDays = defaults?.ttl?.days ?? 28;
  const initialTtlHours = defaults?.ttl?.hours ?? 0;
  const initialTtlMinutes = defaults?.ttl?.minutes ?? 0;

  const [utmSource, setUtmSource] = useState(initialUtmSource);
  const [utmMedium, setUtmMedium] = useState(initialUtmMedium);
  const [utmCampaign, setUtmCampaign] = useState(initialUtmCampaign);
  const [utmTerm, setUtmTerm] = useState(initialUtmTerm);
  const [utmContent, setUtmContent] = useState(initialUtmContent);

  const [ttlDays, setTtlDays] = useState(initialTtlDays);
  const [ttlHours, setTtlHours] = useState(initialTtlHours);
  const [ttlMinutes, setTtlMinutes] = useState(initialTtlMinutes);

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden bg-[#f7f9fb] min-h-screen">
        <UserSidebarHeader breadcrumbs={[{ title: 'App Dashboard', href: '/appdashboard/dashboard' }]} />
        <Head title="Site Defaults" />

        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Site Defaults
              <span className="inline-block align-middle text-blue-500 cursor-pointer" title="Info">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
              </span>
            </h1>
            <button className="border border-gray-300 bg-gray-100 text-gray-500 px-4 py-2 rounded cursor-not-allowed flex items-center gap-2">
              <span className="text-sm">Save Changes</span>
            </button>
          </div>

          {/* UTM Parameters */}
          <div className="bg-white rounded shadow p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">UTM Parameters
              <span className="inline-block align-middle text-blue-500 cursor-pointer" title="What are UTM parameters?">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
              </span>
            </h2>
            <p className="text-gray-600 mb-6">It is a reliable way to track the traffic that comes to your website through web push campaigns. By adding default parameters you can avoid campaigns going out without any UTM parameters.</p>

            <div className="grid grid-cols-1 gap-5 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <label className="md:col-span-1 text-sm font-medium">UTM Source</label>
                <input className="md:col-span-5 border rounded px-3 py-2" value={utmSource} onChange={(e) => setUtmSource(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <label className="md:col-span-1 text-sm font-medium">UTM Medium</label>
                <input className="md:col-span-5 border rounded px-3 py-2" value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <label className="md:col-span-1 text-sm font-medium">UTM Campaign</label>
                <input className="md:col-span-5 border rounded px-3 py-2" value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <label className="md:col-span-1 text-sm font-medium">UTM Term(optional)</label>
                <input className="md:col-span-5 border rounded px-3 py-2" value={utmTerm} onChange={(e) => setUtmTerm(e.target.value)} placeholder="Add UTM term" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-3">
                <label className="md:col-span-1 text-sm font-medium">UTM Content(optional)</label>
                <input className="md:col-span-5 border rounded px-3 py-2" value={utmContent} onChange={(e) => setUtmContent(e.target.value)} placeholder="Add UTM content" />
              </div>
            </div>
          </div>

          {/* TTL */}
          <div className="bg-white rounded shadow p-8">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">Default Notification Expiry Time (TTL)
              <span className="inline-block align-middle text-blue-500 cursor-pointer" title="TTL Info">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
              </span>
            </h2>
            <div className="bg-[#fafbfc] rounded p-6 border max-w-5xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-700">Expires in</span>
                <select className="border rounded px-3 py-2" value={ttlDays} onChange={(e) => setTtlDays(parseInt(e.target.value))}>
                  {[0, 1, 7, 14, 28].map((d) => (
                    <option key={d} value={d}>{d} days</option>
                  ))}
                </select>
                <select className="border rounded px-3 py-2" value={ttlHours} onChange={(e) => setTtlHours(parseInt(e.target.value))}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i}>{i} hours</option>
                  ))}
                </select>
                <select className="border rounded px-3 py-2" value={ttlMinutes} onChange={(e) => setTtlMinutes(parseInt(e.target.value))}>
                  {Array.from({ length: 60 }).map((_, i) => (
                    <option key={i} value={i}>{i} minutes</option>
                  ))}
                </select>
              </div>
              <p className="text-gray-600 mt-6">This is the notification's expiry time. If the user is offline, the notification will be retried until it expires, with a maximum limit of 28 days.</p>
            </div>

            <div className="flex justify-end mt-6">
              <button className="border border-gray-300 bg-gray-100 text-gray-500 px-4 py-2 rounded cursor-not-allowed flex items-center gap-2">
                <span className="text-sm">Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}


