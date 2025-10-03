import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';

type TabKey = 'manual' | 'blogger' | 'weebly' | 'opencart' | 'woocommerce' | 'cscart' | 'volusion' | 'instapage' | 'zoho' | 'jimdo' | 'bigcommerce' | 'clickfunnels' | 'squarespace';

export default function SetupPage() {
  const [active, setActive] = useState<TabKey>('manual');
  const { app, settings, site, appUrl } = usePage().props as any;

  const appId = app?.appId ?? settings?.appId ?? 'MISSING-APP-ID';
  const publicKey = app?.publicKey ?? settings?.publicKey ?? 'MISSING-PUBLIC-KEY';
  const apiUrl = appUrl || window.location.origin;

  const codeSnippet = `\
<script src="${apiUrl}/js/alertwise.js"></script>\n\
<script type="text/javascript">\n\
  alertwise = window.alertwise || [];\n\
  alertwise.push(['init', {\n\
    appId: '${appId}',\n\
    apiUrl: '${apiUrl}',\n\
    publicKey: '${publicKey}'\n\
  }]);\n\
</script>`;

  const renderManual = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">Configure Alertwise for your Site
            <span className="inline-block align-middle text-blue-500 cursor-pointer" title="Info">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
            </span>
          </h1>
          <div className="mt-2 text-gray-700 font-medium">{site?.site_name || 'Your Site'}</div>
        </div>
        <div className="text-sm"><span className="font-semibold text-green-700">APP ID</span> : {appId}</div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">Alertwise Manual Setup
          <span className="inline-block align-middle text-blue-500 cursor-pointer" title="Info">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
          </span>
        </h2>

        <div className="flex gap-8">
          {/* Left nav is rendered globally in page layout; only content lives here */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">1</div>
              <h3 className="text-lg font-semibold">Include JS Code</h3>
            </div>
            <div className="mb-6">
              <p className="mb-2">1. Copy the code below into the <code className="bg-gray-100 px-1 rounded">&lt;head&gt;</code> section of your website.</p>
              <pre className="bg-[#0b0f17] text-green-200 rounded p-4 overflow-auto max-w-full whitespace-pre text-sm"><code>{codeSnippet}</code></pre>
              <p className="text-sm text-gray-600 mt-2">Note: Changes may take some time to reflect.</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">2</div>
              <h3 className="text-lg font-semibold">Download service-worker.js</h3>
            </div>
            <div className="border rounded p-4 mb-6">
              <p className="text-gray-700">Place the provided <strong>service-worker.js</strong> file in the root of your site. Ensure it is accessible at <code className="bg-gray-100 px-1 rounded">/service-worker.js</code>.</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">3</div>
              <h3 className="text-lg font-semibold">Verify</h3>
            </div>
            <div className="border rounded p-4">
              <p className="text-gray-700">After deployment, click Verify in the Alertwise dashboard to confirm installation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlogger = () => (
    <div className="bg-white rounded shadow p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">1</div>
        <h3 className="text-lg font-semibold">Include JS Code</h3>
      </div>
      <pre className="bg-[#0b0f17] text-green-200 rounded p-4 overflow-auto max-w-full whitespace-pre text-sm"><code>{codeSnippet}</code></pre>
      <ol className="list-decimal ml-6 mt-6 space-y-2 text-gray-700">
        <li>Log in to your <strong>Blogger Dashboard</strong>.</li>
        <li>Click on <strong>Theme</strong>.</li>
        <li>Select <strong>Customize → Edit HTML</strong>.</li>
        <li>In the code editor, find the <code className="bg-gray-100 px-1 rounded">&lt;head&gt;</code> tag.</li>
        <li>Paste the AlertWise code snippet inside the <code className="bg-gray-100 px-1 rounded">&lt;head&gt;</code> section.</li>
        <li>Click <strong>Save</strong> to apply the changes.</li>
      </ol>
      <p className="text-gray-600 mt-4">Note: Changes may take some time to reflect.</p>
    </div>
  );

  const providers: { key: TabKey; label: string }[] = [
    { key: 'manual', label: 'Manual' },
    { key: 'blogger', label: 'Blogger' },
    { key: 'weebly', label: 'Weebly' },
    { key: 'opencart', label: 'Opencart' },
    { key: 'woocommerce', label: 'Woocommerce' },
    { key: 'cscart', label: 'Cscart' },
    { key: 'volusion', label: 'Volusion' },
    { key: 'instapage', label: 'Instapage' },
    { key: 'zoho', label: 'Zoho' },
    { key: 'jimdo', label: 'Jimdo' },
    { key: 'bigcommerce', label: 'Bigcommerce' },
    { key: 'clickfunnels', label: 'Clickfunnels' },
    { key: 'squarespace', label: 'Squarespace' },
  ];

  const renderContent = () => {
    if (active === 'blogger') return renderBlogger();
    return renderManual();
  };

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden bg-[#f7f9fb] min-h-screen">
        <UserSidebarHeader breadcrumbs={[{ title: 'App Dashboard', href: '/appdashboard/dashboard' }]} />
        <Head title="Setup" />
        <div className="p-6 w-full">
          <div className="flex gap-8">
            <div className="w-56">
              <div className="flex flex-col border rounded overflow-hidden">
                {providers.map((p) => (
                  <button key={p.key} onClick={() => setActive(p.key)} className={`text-left px-4 py-3 border-b last:border-b-0 ${active===p.key?'bg-blue-50 text-blue-700 font-medium':''}`}>{p.label}</button>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}


