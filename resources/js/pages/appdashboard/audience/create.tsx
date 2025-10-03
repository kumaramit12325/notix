import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import { Button } from '@/components/ui/button';

export default function AudienceCreate() {
  const { site } = usePage().props as any;
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/sites/${site.id}/audiences`);
  };

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden bg-[#f7f9fb] min-h-screen">
        <UserSidebarHeader breadcrumbs={[
          { title: 'Audience Groups', href: `/sites/${site?.id}/audiences` },
          { title: 'Create', href: `/sites/${site?.id}/audiences/create` }
        ]} />
        <Head title="Create Audience Group" />
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Create Audience Group
                <span className="inline-block align-middle text-blue-500 cursor-pointer" title="Audience Info">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
                </span>
              </h1>
              <p className="text-sm text-gray-600 mt-1">{site?.site_name}</p>
            </div>
            <Link href={`/sites/${site?.id}/audiences`}>
              <Button variant="outline">Back to Audiences</Button>
            </Link>
          </div>
          
          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded shadow p-8">
              <div>
                <label className="block text-sm font-medium mb-1 text-red-600">* Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  placeholder="Enter audience group name"
                  required
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2 h-24"
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  placeholder="Enter description (optional)"
                />
                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 mb-4">
                  Advanced criteria and segmentation rules coming soon. For now, create simple audience groups to organize your subscribers.
                </p>
                <div className="flex gap-2">
                  <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {processing ? 'Creating...' : 'Create Audience Group'}
                  </Button>
                  <Link href={`/sites/${site?.id}/audiences`}>
                    <Button type="button" variant="outline">Cancel</Button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
