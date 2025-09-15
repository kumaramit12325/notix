import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  RefreshCw, 
  Plus, 
  Trash2, 
  Play, 
  Edit3, 
  ChevronUp, 
  ChevronDown,
  AlertTriangle
} from 'lucide-react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';



interface YouTubeChannel {
  id: number;
  title: string;
  domain: string;
  subscriber_count: string;
  created: string;
  logo: string;
}

interface Props {
  channels: YouTubeChannel[];
}

const YouTubePushPage: React.FC<Props> = ({ channels }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredChannels = channels.filter(channel =>
    channel.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredChannels.length;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">YouTube Push</h1>
          <p className="text-gray-600 text-lg">
            Send or schedule push notification when you upload a new video.
          </p>
        </div>

      {/* Success Message */}
      {(window as any).flash && (window as any).flash.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <div className="text-green-500 h-5 w-5 flex-shrink-0">✓</div>
          <p className="text-green-700 font-medium">
            {(window as any).flash.success}
          </p>
        </div>
      )}

      {/* Warning Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
        <AlertTriangle className="text-red-500 h-5 w-5 flex-shrink-0" />
        <p className="text-red-700 font-medium">
          Note: This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
        </p>
      </div>

      {/* Main Content Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <RefreshCw className="h-5 w-5" />
            </Button>
          
          </div>
          
                     <div className="flex items-center gap-3">
                        
             <Button 
               className="bg-blue-600 hover:bg-blue-700 text-white"
               onClick={() => router.get('/youtubpush/create')}
             >
               <Plus className="h-4 w-4" />
               Add YouTube Channel
             </Button>
             <Button variant="destructive">
               <Trash2 className="h-4 w-4" />
               Delete
             </Button>
           </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Search:</span>
            <Input
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-1">
                    Title
                    <div className="flex flex-col">
                      <ChevronUp className="h-3 w-3 text-gray-400" />
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-1">
                    Domain
                    <div className="flex flex-col">
                      <ChevronUp className="h-3 w-3 text-gray-400" />
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-1">
                    Action
                    <div className="flex flex-col">
                      <ChevronUp className="h-3 w-3 text-gray-400" />
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-1">
                    YouTube Subscriber Count
                    <div className="flex flex-col">
                      <ChevronUp className="h-3 w-3 text-gray-400" />
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-1">
                    Created
                    <div className="flex flex-col">
                      <ChevronUp className="h-3 w-3 text-gray-400" />
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-1">
                    Id
                    <div className="flex flex-col">
                      <ChevronUp className="h-3 w-3 text-gray-400" />
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChannels.map((channel) => (
                <TableRow key={channel.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {channel.logo}
                      </div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                          onClick={() => router.get(`/youtubpush/${channel.id}`)}
                        >
                          {channel.title}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-gray-500 hover:text-gray-700"
                          onClick={() => router.get(`/youtubpush/${channel.id}/edit`)}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{channel.domain}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this channel?')) {
                            router.delete(`/youtubpush/${channel.id}`);
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                                     <TableCell className="text-gray-600 font-medium">{channel.subscriber_count}</TableCell>
                  <TableCell className="text-gray-600">{channel.created}</TableCell>
                  <TableCell className="text-gray-600">{channel.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startEntry} to {endEntry} of {totalEntries} entries
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {currentPage}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={endEntry >= totalEntries}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
    </AppLayout>
  );
};

export default YouTubePushPage;
