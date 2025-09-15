import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const initialSegments = [
  {
    id: 1,
    name: 'VIP Customers',
    description: 'High value, repeat buyers',
    subscribers: 120,
    image: '/images/heart-hand.png',
  },
  {
    id: 2,
    name: 'New Signups',
    description: 'Users who joined in last 30 days',
    subscribers: 45,
    image: '/images/rocket.png',
  },
];

export default function SegmentIndex() {
  const [segments, setSegments] = useState(initialSegments);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });

  const handleCreate = () => {
    if (!form.name) return;
    setSegments([
      ...segments,
      {
        id: segments.length + 1,
        name: form.name,
        description: form.description,
        subscribers: 0,
        image: '/images/wow.png',
      },
    ]);
    setForm({ name: '', description: '' });
    setShowModal(false);
  };

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden p-5">
        <UserSidebarHeader breadcrumbs={[{ title: 'Segments', href: '/appdashboard/segment' }]} />
        <Head title="Segments" />
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Segments <span className="inline-block align-middle text-blue-500" title="Segments Info">&#9432;</span></h1>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2" onClick={() => setShowModal(true)}>
              <span className="text-lg">&#8853;</span> Create Segment
            </Button>
          </div>
          <div className="bg-white rounded shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {segments.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center h-48 text-gray-400">
                  <img src="/images/empty-box.png" alt="No Data" className="w-16 h-16 mb-2 opacity-60" />
                  <span>No Data</span>
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
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Create a Segment</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input type="text" className="w-full border rounded px-3 py-2" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Description:</label>
                <input type="text" className="w-full border rounded px-3 py-2" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreate}>Create</Button>
              </div>
            </div>
          </div>
        )}
      </AppContent>
    </AppShell>
  );
}
