import { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AttributeItem {
  id: number;
  name: string;
  tag: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface AttributeIndexProps {
  attributes?: {
    data: AttributeItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}

const fallbackAttributes: AttributeItem[] = [
  { id: 1, name: 'First name', tag: '{{first_name}}', description: 'Subscriber\'s first name', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 2, name: 'Last name', tag: '{{last_name}}', description: 'Subscriber\'s last name', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 3, name: 'Email', tag: '{{email}}', description: 'Subscriber\'s email address', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 4, name: 'Phone', tag: '{{phone}}', description: 'Subscriber\'s phone number', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 5, name: 'Gender', tag: '{{gender}}', description: 'Subscriber\'s gender', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 6, name: 'Date Of birth', tag: '{{dob}}', description: 'Subscriber\'s date of birth', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 7, name: 'Language', tag: '{{language}}', description: 'Subscriber\'s preferred language', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 8, name: 'Profile ID', tag: '{{profile_id}}', description: 'Unique profile identifier', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 9, name: 'Country', tag: '{{country}}', description: 'Subscriber\'s country', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 10, name: 'City', tag: '{{city}}', description: 'Subscriber\'s city', is_active: true, created_at: '2025-01-01T00:00:00Z' },
];

function CopyIcon({ copied }: { copied: boolean }) {
  return copied ? (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#2563eb" d="M7.5 10.833 10 13.333l5-5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3.5" y="3.5" width="13" height="13" rx="2.5" stroke="#2563eb" strokeWidth="1.5"/></svg>
  ) : (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="7" y="7" width="7" height="7" rx="1.5" stroke="#64748b" strokeWidth="1.5"/><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="#64748b" strokeWidth="1.5"/></svg>
  );
}

export default function AttributeIndex({ attributes }: AttributeIndexProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState((attributes?.per_page ?? 10).toString());

  const data = useMemo(() => attributes?.data ?? fallbackAttributes, [attributes]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return data;
    return data.filter((attr) =>
      attr.name.toLowerCase().includes(term) ||
      attr.tag.toLowerCase().includes(term) ||
      attr.description.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  const isServerPaginated = Boolean(attributes?.links && attributes?.data && attributes.data.length > 0);
  const perPage = attributes?.per_page ?? (Number(itemsPerPage) || 10);
  const totalCount = attributes?.total ?? filtered.length;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const handleCopy = (tag: string, idx: number) => {
    navigator.clipboard.writeText(tag);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  const handlePageChange = (url: string) => {
    const params: any = {};
    if (searchTerm) params.search = searchTerm;
    router.get(url, params, { preserveState: true });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    if (isServerPaginated) {
      const params: any = { per_page: value };
      if (searchTerm) params.search = searchTerm;
      router.get('/appdashboard/attribute', params, { preserveState: true });
    }
  };

  const handleSearch = () => {
    if (isServerPaginated) {
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      router.get('/appdashboard/attribute', params, { preserveState: true });
    }
  };

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden p-5">
        <UserSidebarHeader breadcrumbs={[{ title: 'System Attributes', href: '/appdashboard/attribute' }]} />
        <Head title="System Attributes" />
        <div className="p-6 w-full">
          <h1 className="text-3xl font-bold mb-2">System Attributes <span className="inline-block align-middle text-blue-500" title="Info">&#9432;</span></h1>
          <p className="text-gray-500 mb-6">These are the default fields available for each subscriber. They allow you to store additional details—such as email, first name, and more enabling you to create personalized engagements tailored to your audience.</p>
          
          {/* Search and Filter Controls */}
          <div className="mb-6 flex gap-4 items-center">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search attributes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full"
              />
            </div>
            <Button onClick={handleSearch} variant="outline">
              Search
            </Button>
            <div className="flex items-center gap-2">
              {/* <span className="text-sm text-gray-600">Show:</span> */}
              <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              {/* <span className="text-sm text-gray-600">per page</span> */}
            </div>
          </div>

          <Card className="w-full">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attribute Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attribute Tag</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filtered.map((attr, idx) => (
                      <tr key={attr.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attr.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">{attr.tag}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{attr.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 hover:bg-blue-50"
                            onClick={() => handleCopy(attr.tag, idx)}
                            aria-label="Copy attribute tag"
                          >
                            <CopyIcon copied={copiedIdx === idx} />
                          </Button>
                          {copiedIdx === idx && (
                            <span className="ml-2 text-xs text-blue-600">Copied!</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {isServerPaginated ? (
                <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg mt-4">
                  <div className="text-sm text-gray-700">Showing {attributes?.from} to {attributes?.to} of {totalCount} entries</div>
                  <div className="flex items-center gap-2">
                    {attributes?.links?.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => link.url && handlePageChange(link.url)}
                        disabled={!link.url || link.active}
                        className={`px-3 py-1 text-sm rounded-md ${
                          link.active
                            ? 'bg-blue-500 text-white cursor-default'
                            : link.url
                            ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                filtered.length > 0 && (
                  <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg mt-4">
                    <div className="text-sm text-gray-700">Showing {filtered.length} of {filtered.length} entries</div>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={true}
                        className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white cursor-default">
                        1
                      </button>
                      <button
                        disabled={true}
                        className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </AppContent>
    </AppShell>
  );
}
