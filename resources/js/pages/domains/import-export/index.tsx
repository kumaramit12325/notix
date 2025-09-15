import React, { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Download, Globe, Plus, Upload } from 'lucide-react';

interface Domain {
  id: number;
  domain: string;
  desktop_count: number;
  mobile_count: number;
  total_count: number;
  status: 'Active' | 'Inactive' | 'Pending';
  created_at: string;
  has_warning?: boolean;
  is_wordpress?: boolean;
}

interface PaginationData {
  current_page: number;
  data: Domain[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Props {
  domains: PaginationData;
}

const DomainsImportExport: React.FC<Props> = ({ domains }) => {
  const [query, setQuery] = useState('');
  const [perPage, setPerPage] = useState(domains?.per_page?.toString() || '10');

  const domainsData = domains?.data || [];
  const totalEntries = domains?.total || domainsData.length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return domainsData;
    return domainsData.filter((row: Domain) => row.domain.toLowerCase().includes(q) || String(row.id).includes(q));
  }, [query, domainsData]);

  return (
    <AppLayoutTemplate>
      <Head title="Domains" />

      <div className="space-y-6 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Heading title="Domains" />
            <Breadcrumbs breadcrumbs={[{ title: 'Home', href: '/' }, { title: 'Domains', href: '/domains/import-export' }]} />
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href={route('domains.create')}>
              <Plus className="w-4 h-4 mr-1" /> Add Domain
            </Link>
          </Button>
        </div>

        <Alert className="border-rose-200 bg-rose-50 text-rose-900">
          <AlertDescription>
            <strong>Note:</strong> This is a demo server used to showcase and test features or functions of the panel.
          </AlertDescription>
        </Alert>

        <div className="rounded-md border bg-background">
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <Select value={perPage} onValueChange={setPerPage}>
                <SelectTrigger className="w-20 h-8">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm">entries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Search:</span>
              <Input value={query} onChange={(e) => setQuery(e.target.value)} className="h-8 w-[220px]" placeholder="Search domains..." />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="w-[340px]">Domain</TableHead>
                  <TableHead className="w-[100px]">Desktop</TableHead>
                  <TableHead className="w-[100px]">Mobile</TableHead>
                  <TableHead className="w-[100px]">Total</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[180px]">Action</TableHead>
                  <TableHead className="w-[180px]">Created</TableHead>
                  <TableHead className="w-[80px]">ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-blue-700 hover:underline cursor-pointer">{row.domain}</span>
                        {row.has_warning && (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                        {row.is_wordpress && (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-semibold">W</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{row.desktop_count}</TableCell>
                    <TableCell>{row.mobile_count}</TableCell>
                    <TableCell>{row.total_count}</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">{row.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Download className="w-4 h-4" />
                          Import
                        </Button>
                        <Button size="sm" variant="outline" className="bg-rose-600 hover:bg-rose-700 text-white">
                          <Upload className="w-4 h-4" />
                          Export
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{row.created_at}</TableCell>
                    <TableCell>{row.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 p-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing 1 to {Math.min(Number(perPage), filtered.length)} of {filtered.length} entries
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">1</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayoutTemplate>
  );
};

export default DomainsImportExport;
