import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Icon } from '@/components/icon';
import Heading from '@/components/heading';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { 
  RefreshCw, 
  AlertCircle, 
  ChevronsUpDown, 
  Globe, 
  Triangle, 
  Edit, 
  Code, 
  Bold, 
  Apple, 
  Zap 
} from 'lucide-react';

interface Domain {
  id: number;
  domain: string;
  desktop_count: number;
  mobile_count: number;
  total_count: number;
  status: string;
  created_at: string;
  is_wordpress: boolean;
  is_default?: boolean;
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

const DomainsIntegration: React.FC<Props> = ({ domains }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(domains?.per_page?.toString() || '10');
  const [currentPage, setCurrentPage] = useState(domains?.current_page || 1);

  const domainsData = domains?.data || [];
  const totalEntries = domains?.total || domainsData.length;

  const filteredDomains = domainsData.filter((domain: Domain) =>
    domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const entriesPerPageNum = parseInt(entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPageNum + 1;
  const endEntry = Math.min(currentPage * entriesPerPageNum, totalEntries);

  return (
    <AppLayoutTemplate>
      <Head title="Domains" />
      
      <div className="space-y-6 p-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <Heading title="Domains" />
            <Breadcrumbs
              breadcrumbs={[
                { title: 'Home', href: '/dashboard' },
                { title: 'Domains', href: '/domains/integration' }
              ]}
            />
          </div>
          <Button asChild>
            <Link href="/domains/create">Add Domain</Link>
          </Button>
        </div>

        {/* Alert Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon iconNode={AlertCircle} className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-900">
              Note: This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
            </p>
          </div>
        </div>

        {/* Table Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center flex-wrap gap-3">
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon iconNode={RefreshCw} className="w-4 h-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Show</span>
                  <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-600">entries</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Search:</span>
                <Input
                  type="text"
                  placeholder="Search domains..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer hover:bg-gray-50 min-w-[220px]">
                    <div className="flex items-center space-x-1">
                      <span>Domain</span>
                      <Icon iconNode={ChevronsUpDown} className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50 hidden sm:table-cell w-24 text-center">
                    <div className="flex items-center space-x-1">
                      <span>Desktop</span>
                      <Icon iconNode={ChevronsUpDown} className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50 hidden sm:table-cell w-24 text-center">
                    <div className="flex items-center space-x-1">
                      <span>Mobile</span>
                      <Icon iconNode={ChevronsUpDown} className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50 w-24 text-center">
                    <div className="flex items-center space-x-1">
                      <span>Total</span>
                      <Icon iconNode={ChevronsUpDown} className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50 hidden md:table-cell w-32">
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <Icon iconNode={ChevronsUpDown} className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[380px]">Action</TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50 hidden lg:table-cell">
                    <div className="flex items-center space-x-1">
                      <span>Created</span>
                      <Icon iconNode={ChevronsUpDown} className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50 hidden lg:table-cell w-16 text-center">
                    <div className="flex items-center space-x-1">
                      <span>ID</span>
                      <Icon iconNode={ChevronsUpDown} className="w-4 h-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader> 
              <TableBody>
                {filteredDomains.map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {domain.is_default ? (
                          <Icon iconNode={Triangle} className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Icon iconNode={Globe} className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="font-medium">{domain.domain}</span>
                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                          <Icon iconNode={Edit} className="w-3 h-3" />
                        </Button>
                        {domain.is_wordpress && (
                          <Icon iconNode={Code} className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">{domain.desktop_count}</TableCell>
                    <TableCell className="text-center hidden sm:table-cell">{domain.mobile_count}</TableCell>
                    <TableCell className="text-center font-medium">{domain.total_count}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        {domain.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 h-auto">
                          <Icon iconNode={Code} className="w-2 h-2" />
                          WordPress
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 h-auto">
                          <Icon iconNode={Code} className="w-2 h-2" />
                          Website
                        </Button>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-2 py-1 h-auto">
                          <Icon iconNode={Bold} className="w-2 h-2" />
                          Blogger
                        </Button>
                        <Button size="sm" className="bg-black hover:bg-gray-800 text-white text-xs px-2 py-1 h-auto">
                          <Icon iconNode={Apple} className="w-2 h-2" />
                          IOS
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1 h-auto">
                          <Icon iconNode={Zap} className="w-2 h-2" />
                          AMP
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 hidden lg:table-cell">{domain.created_at}</TableCell>
                    <TableCell className="text-sm text-gray-600 hidden lg:table-cell text-center">{domain.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600 order-2 sm:order-1">
            Showing {startEntry} to {endEntry} of {totalEntries} entries
          </div>
          <div className="flex items-center space-x-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage * entriesPerPageNum >= totalEntries}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </AppLayoutTemplate>
  );
};

export default DomainsIntegration;


