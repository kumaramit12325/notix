import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SegmentIndex() {
  const { site, segments } = usePage().props as any;
  const [showModal, setShowModal] = useState(false);

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden p-5">
        <UserSidebarHeader breadcrumbs={[{ title: 'Segments', href: `/sites/${site?.id}/segments` }]} />
        <Head title="Segments" />
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Segments <span className="inline-block align-middle text-blue-500" title="Segments Info">&#9432;</span></h1>
              <p className="text-sm text-gray-600 mt-1">{site?.site_name} - Subscriber segments</p>
            </div>
            <Button className="bg-gray-400 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 cursor-not-allowed" disabled title="Custom segments coming soon">
              <span className="text-lg">&#8853;</span> Create Segment
            </Button>
          </div>
          <div className="bg-white rounded shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {!segments || segments.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center h-48 text-gray-400">
                  <img src="/images/empty-box.png" alt="No Data" className="w-16 h-16 mb-2 opacity-60" />
                  <p className="text-lg font-semibold">No subscribers yet</p>
                  <p className="text-sm">Install the script on your website to start collecting subscribers</p>
                </div>
              ) : (
                segments.map((seg) => (
                  <Card key={seg.id} className="relative">
                    <CardContent className="flex flex-col items-center gap-3 pt-6 pb-4">
                      <div className="w-full flex flex-col items-center">
                        <div className="bg-white rounded-xl shadow-lg w-[320px] flex flex-col items-center p-4 border border-gray-100 relative">
                          <img src={seg.image} alt={seg.name} className="w-16 h-16 object-cover rounded mb-2" />
                          <div className="font-bold text-gray-900 text-lg mb-1">{seg.name}</div>
                          <div className="text-gray-600 text-sm mb-1">{seg.description}</div>
                          <div className="text-xs text-gray-400">Subscribers: {seg.subscribers}</div>
                        </div>
                      </div>
                    </CardContent>
                    <Separator className="my-2" />
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
