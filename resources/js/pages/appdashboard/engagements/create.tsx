import { useState } from 'react';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';

const steps = [
  { label: 'Message' },
  { label: 'Audience' },
  { label: 'Send/Schedule' },
];

export default function EngagementCreate() {
  const { site } = usePage().props as any;
  
  const siteName = site?.site_name || 'Your Site';
  const siteUrl = site?.site_url || 'https://yoursite.com';
  const siteDomain = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  
  const [step, setStep] = useState(0);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [addActionButtons, setAddActionButtons] = useState(false);
  const [notificationDuration, setNotificationDuration] = useState(false);
  const [utmParameters, setUtmParameters] = useState(false);

  const { data, setData, post, processing } = useForm<{
    title: string;
    message: string;
    url: string;
    icon: File | null;
    audience: string;
    send_immediately: boolean;
  }>({
    title: '',
    message: '',
    url: '',
    icon: null,
    audience: 'all',
    send_immediately: true,
  });

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData('icon', e.target.files[0]);
    }
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
  
  const handleSendNow = () => {
    post(`/sites/${site.id}/engagements`, {
      onSuccess: () => {
        router.visit(`/sites/${site.id}/dashboard`);
      }
    });
  };

  // --- PREVIEW CARDS ---
  const iconUrl = data.icon ? URL.createObjectURL(data.icon) : '/images/rocket.png';
  const previewTitle = data.title || 'Sample notification title!';
  const previewMsg = data.message || 'Sample notification message!!';
  const previewUrl = data.url || siteUrl;
  const previewUrlDisplay = previewUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <UserSidebarHeader breadcrumbs={[{ title: 'App Dashboard', href: '/user/appdashboard/dashboard' }]} />
        <Head title="New Push Notification" />
        <div className="p-6 w-full">
          {/* Header & Steps */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">New Push Notification</h1>
            <div className="flex items-center gap-2">
              <Button className="border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 font-semibold px-4 py-2 rounded">A/B Test</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">Select Audience</Button>
            </div>
          </div>
          {/* --- STEPPER --- */}
          <div className="flex items-center gap-4 mb-8">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-sm ${step === i ? 'border-blue-600 bg-blue-600 text-white scale-110 shadow-blue-100' : 'border-gray-300 bg-white text-gray-400 hover:border-blue-400 hover:text-blue-600'}`}
                >
                  {i + 1}
                </div>
                <span className={`font-semibold transition-colors duration-200 ${step === i ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`}>{s.label}</span>
                {i < steps.length - 1 && <span className="w-8 h-0.5 bg-gray-300" />}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Left: Form Steps */}
            <div className="flex-1">
              {step === 0 && (
                <form className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-1">Notification Title</label>
                    <div className="flex items-center gap-2">
                      <input type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all" value={data.title} onChange={e => setData('title', e.target.value)} maxLength={60} required />
                      <span className="text-xs text-gray-500">{data.title.length} / 60</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Notification Message</label>
                    <div className="flex items-center gap-2">
                      <textarea className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all" value={data.message} onChange={e => setData('message', e.target.value)} maxLength={120} required />
                      <span className="text-xs text-gray-500">{data.message.length} / 120</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Notification Url</label>
                    <input 
                      type="url" 
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all" 
                      value={data.url} 
                      onChange={e => setData('url', e.target.value)}
                      placeholder={siteUrl}
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty to use site URL: {siteUrl}</p>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Notification Icon Url</label>
                    <input type="file" accept="image/*" className="block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all" onChange={handleIconChange} />
                    <p className="text-xs text-gray-500 mt-1">Use a square image (e.g., 192x192px), JPG, PNG, GIF, WEBP, AVIF, or SVG, up to 2MB. Animations not supported.</p>
                    <div className="mt-2 flex items-center gap-2">
                      <img src={iconUrl} alt="icon preview" className="w-16 h-16 rounded-full object-cover border" />
                      {data.icon && <Button size="sm" type="button" onClick={() => setData('icon', null)}>Remove</Button>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {/* --- TOGGLES POLISH --- */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={showLargeImage} onChange={e => setShowLargeImage(e.target.checked)} className="accent-blue-600 w-5 h-5" />
                      <span className="text-gray-700">Show Large Image</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={addActionButtons} onChange={e => setAddActionButtons(e.target.checked)} className="accent-blue-600 w-5 h-5" />
                      <span className="text-gray-700">Add Action Buttons</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={notificationDuration} onChange={e => setNotificationDuration(e.target.checked)} className="accent-blue-600 w-5 h-5" />
                      <span className="text-gray-700">Notification Duration</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={utmParameters} onChange={e => setUtmParameters(e.target.checked)} className="accent-blue-600 w-5 h-5" />
                      <span className="text-gray-700">UTM Parameters</span>
                    </label>
                  </div>
                  {/* --- BUTTONS POLISH --- */}
                  <div className="flex justify-end mt-8">
                    <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition-all w-full disabled:opacity-60 disabled:cursor-not-allowed" onClick={handleNext} disabled={!data.title || !data.message}>Select Audience &rarr;</Button>
                  </div>
                </form>
              )}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="font-semibold text-lg mb-2">Select Audience</div>
                  <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-2 border rounded px-4 py-3 cursor-pointer">
                      <input type="radio" name="audience" checked={data.audience === 'all'} onChange={() => setData('audience', 'all')} />
                      <span>Send to All Subscribers</span>
                      <span className="text-xs text-gray-500 ml-2">This message will be sent to all subscribers.</span>
                    </label>
                    <label className="flex items-center gap-2 border rounded px-4 py-3 cursor-pointer">
                      <input type="radio" name="audience" checked={data.audience === 'group'} onChange={() => setData('audience', 'group')} />
                      <span>Send to Audience Group</span>
                      <span className="text-xs text-gray-500 ml-2">Customize your notification for a targeted audience group.</span>
                    </label>
                    <label className="flex items-center gap-2 border rounded px-4 py-3 cursor-pointer">
                      <input type="radio" name="audience" checked={data.audience === 'custom'} onChange={() => setData('audience', 'custom')} />
                      <span>Send to Custom Audience</span>
                      <span className="text-xs text-gray-500 ml-2">Customize notifications using segments, geolocation, device, and more.</span>
                    </label>
                  </div>
                  {/* --- BUTTONS POLISH --- */}
                  <div className="flex gap-2 justify-between mt-8">
                    <Button type="button" variant="outline" onClick={handlePrev} className="hover:bg-blue-50 transition-all">&larr; Back</Button>
                    <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition-all" onClick={handleNext}>Send/Schedule &rarr;</Button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="font-semibold text-lg mb-2">Send/Schedule</div>
                  <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-2 border rounded px-4 py-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="schedule" 
                        checked={data.send_immediately}
                        onChange={() => setData('send_immediately', true)}
                      />
                      <span>Begin sending immediately</span>
                    </label>
                    <label className="flex items-center gap-2 border rounded px-4 py-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="schedule" 
                        checked={!data.send_immediately}
                        onChange={() => setData('send_immediately', false)}
                      />
                      <span>Begin sending at a particular day and time</span>
                    </label>
                  </div>
                  {/* --- BUTTONS POLISH --- */}
                  <div className="flex gap-2 justify-between mt-8">
                    <Button type="button" variant="outline" onClick={handlePrev} className="hover:bg-blue-50 transition-all">&larr; Back</Button>
                    <Button 
                      type="button" 
                      onClick={handleSendNow}
                      disabled={processing}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition-all disabled:opacity-50"
                    >
                      {processing ? 'Sending...' : 'Send Notification Now'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Preview Cards */}
            <div className="w-[400px] flex flex-col gap-6">
              {/* --- PREVIEW CARDS POLISH --- */}
              <div>
                <div className="font-semibold mb-2">Chrome-windows</div>
                <div className="bg-white rounded-xl shadow-lg flex items-center gap-4 p-4 border border-gray-100">
                  <img src={iconUrl} alt="icon" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold">{previewTitle}</div>
                    <div className="text-gray-600 text-sm">{previewMsg}</div>
                    <div className="text-xs text-gray-400 mt-1">{previewUrlDisplay}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Firefox-windows</div>
                <div className="bg-white rounded-xl shadow-lg flex items-center gap-4 p-4 border border-gray-100">
                  <img src={iconUrl} alt="icon" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold">{previewTitle}</div>
                    <div className="text-gray-600 text-sm">{previewMsg}</div>
                    <div className="text-xs text-gray-400 mt-1">{previewUrlDisplay}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Safari-macos</div>
                <div className="bg-gray-700 rounded-xl shadow-lg flex items-center gap-4 p-4 border border-gray-800">
                  <img src={iconUrl} alt="icon" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-white">{previewTitle}</div>
                    <div className="text-gray-200 text-sm">from {siteName}</div>
                    <div className="text-gray-200 text-sm">{previewMsg}</div>
                  </div>
                  <div className="ml-auto text-xs text-white">now</div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Chrome-android</div>
                <div className="bg-white rounded-xl shadow-lg flex items-center gap-4 p-4 border border-gray-100">
                  <img src={iconUrl} alt="icon" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{siteName}</span>
                      <span className="text-xs text-gray-400">· now</span>
                    </div>
                    <div className="font-bold">{previewTitle}</div>
                    <div className="text-gray-600 text-sm">{previewMsg}</div>
                  </div>
                </div>
              </div>
              {/* --- PREVIEW CARDS POLISH --- */}
              <Button type="button" variant="outline" className="mt-2 hover:bg-blue-50 transition-all">Preview Notification</Button>
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
