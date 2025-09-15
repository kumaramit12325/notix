import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';

export default function AudienceCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // Criteria state can be expanded as needed
  const [criteria, setCriteria] = useState([{ field: '', operator: '', value: '' }]);

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden bg-[#f7f9fb] min-h-screen">
        <UserSidebarHeader breadcrumbs={[{ title: 'App Dashboard', href: '/user/appdashboard/dashboard' }]} />
        <Head title="Create Audience Group" />
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Create Audience Group
              <span className="inline-block align-middle text-blue-500 cursor-pointer" title="Audience Info">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#3b82f6" fontFamily="Arial" dy="-2">i</text></svg>
              </span>
            </h1>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex-1">
              <form className="space-y-6 bg-white rounded shadow p-8">
                <div>
                  <label className="block text-sm font-medium mb-1 text-red-600">* Name</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter audience group name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter description (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Select Criteria</label>
                  <div className="bg-[#fafbfc] rounded p-6 border">
                    <div className="mb-2 text-gray-600">Select subscribers who meet all of the following criteria</div>
                    {criteria.map((c, idx) => (
                      <div className="flex gap-2 mb-2" key={idx}>
                        <select className="border rounded px-2 py-1" value={c.field} onChange={e => {
                          const newCriteria = [...criteria];
                          newCriteria[idx].field = e.target.value;
                          setCriteria(newCriteria);
                        }}>
                          <option value="">Select Field</option>
                          <option value="state">State</option>
                          {/* Add more fields as needed */}
                        </select>
                        <select className="border rounded px-2 py-1" value={c.operator} onChange={e => {
                          const newCriteria = [...criteria];
                          newCriteria[idx].operator = e.target.value;
                          setCriteria(newCriteria);
                        }}>
                          <option value="">Select Operator</option>
                          <option value="equals">Equals</option>
                          {/* Add more operators as needed */}
                        </select>
                        <input
                          type="text"
                          className="border rounded px-2 py-1"
                          value={c.value}
                          onChange={e => {
                            const newCriteria = [...criteria];
                            newCriteria[idx].value = e.target.value;
                            setCriteria(newCriteria);
                          }}
                          placeholder="Value"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-blue-600 text-sm flex items-center gap-1 mt-2"
                      onClick={() => setCriteria([...criteria, { field: '', operator: '', value: '' }])}
                    >
                      <span className="text-lg">&#8853;</span> Add filter conditions
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 justify-end mt-8">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition flex items-center gap-2"
                  >
                    <span className="text-lg">&#128190;</span> Save Audience Group
                  </button>
                  <a
                    href="/appdashboard/audience"
                    className="border border-gray-300 bg-white text-gray-700 px-6 py-2 rounded hover:bg-gray-50 transition"
                  >
                    Back
                  </a>
                </div>
              </form>
            </div>
            <div className="w-96 flex flex-col items-center">
              <div className="bg-white rounded shadow p-8 w-full flex flex-col items-center">
                <div className="font-semibold mb-2">Selected Subscribers</div>
                <div className="flex items-center justify-center mb-4">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" stroke="#0066ff" strokeWidth="10" fill="none" />
                    <text x="100" y="110" textAnchor="middle" fontSize="40" fill="#22c55e">0</text>
                    <text x="100" y="140" textAnchor="middle" fontSize="20" fill="#222">/ 0</text>
                  </svg>
                </div>
                <button className="border border-gray-300 px-4 py-2 rounded mb-4">Refresh Count</button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition flex items-center gap-2 w-full">
                  <span className="text-lg">&#128190;</span> Save Audience Group
                </button>
                <a
                  href="/appdashboard/audience"
                  className="border border-gray-300 bg-white text-gray-700 px-6 py-2 rounded hover:bg-gray-50 transition w-full mt-2 text-center"
                >
                  Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
