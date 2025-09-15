import { useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Search, Pause, Play, Trash2, Copy, Youtube, ExternalLink } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'LP links',
        href: '/lplinks',
    },
    {
        title: 'LP links create',
        href: '/lplinks.create',
    },
];

type ChannelStatus = 'Active' | 'Paused';

interface ChannelItem {
    id: number;
    name: string;
    handle: string;
    lp_link: string;
    desktop: number;
    mobile: number;
    status: ChannelStatus;
    created_at: string; // ISO string
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface YouTubeIndexProps {
    channels?: {
        data: ChannelItem[];
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

const fallbackChannels: ChannelItem[] = [
    { id: 3, name: 'wwe', handle: '@wwe', lp_link: 'https://demo.larapu.sh/yt/4SlikplR', desktop: 4, mobile: 1, status: 'Active', created_at: '2025-04-03T10:45:00Z' },
    { id: 4, name: 'larapush', handle: '@larapush', lp_link: 'https://demo.larapu.sh/yt/VCDTmBTp', desktop: 2, mobile: 0, status: 'Active', created_at: '2025-04-03T10:45:00Z' },
    { id: 5, name: 'ndtv', handle: '@ndtv', lp_link: 'https://demo.larapu.sh/yt/antPdliy', desktop: 0, mobile: 0, status: 'Active', created_at: '2025-04-04T16:05:00Z' },
    { id: 14, name: 'invideoofficial', handle: '@invideoofficial', lp_link: 'https://demo.larapu.sh/yt/5BV2IiTt', desktop: 0, mobile: 0, status: 'Active', created_at: '2025-05-15T15:11:00Z' },
    { id: 19, name: 'kommuneindia', handle: '@kommuneindia', lp_link: 'https://demo.larapu.sh/yt/QTr0p1Ng', desktop: 0, mobile: 0, status: 'Active', created_at: '2025-06-21T11:23:00Z' },
    { id: 21, name: 'watchcartvindia', handle: '@watchcartvindia', lp_link: 'https://demo.larapu.sh/yt/IfdPdWFj', desktop: 1, mobile: 0, status: 'Active', created_at: '2025-07-02T16:25:00Z' },
    { id: 27, name: 'rankknar', handle: '@rankknar', lp_link: 'https://demo.larapu.sh/yt/2KSBUq4R', desktop: 1, mobile: 0, status: 'Active', created_at: '2025-07-18T19:10:00Z' },
];

export default function LPLinksIndex({ channels }: YouTubeIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | ChannelStatus>('all');
    const [itemsPerPage, setItemsPerPage] = useState((channels?.per_page ?? 10).toString());
    const [currentPage, setCurrentPage] = useState(1);

    const data = useMemo(() => channels?.data ?? fallbackChannels, [channels]);

    const filtered = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return data.filter((c) => {
            const matchesTerm = term
                ? c.name.toLowerCase().includes(term) || c.handle.toLowerCase().includes(term)
                : true;
            const matchesStatus = statusFilter === 'all' ? true : c.status === statusFilter;
            return matchesTerm && matchesStatus;
        });
    }, [data, searchTerm, statusFilter]);

    const totalCount = channels?.total ?? filtered.length;

    // Determine whether server-side pagination data is available
    const isServerPaginated = Boolean(channels?.links && channels?.data && channels.data.length > 0);
    const perPage = channels?.per_page ?? (Number(itemsPerPage) || 10);
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (safeCurrentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = isServerPaginated ? filtered : filtered.slice(startIndex, endIndex);
    const showingFrom = isServerPaginated ? (channels?.from ?? 0) : (filtered.length ? startIndex + 1 : 0);
    const showingTo = isServerPaginated ? (channels?.to ?? 0) : Math.min(filtered.length, endIndex);

    const getStatusColor = (status: ChannelStatus) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Paused':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handlePageChange = (url: string) => {
        const searchParams: any = {};
        if (searchTerm) searchParams.search = searchTerm;
        if (statusFilter !== 'all') searchParams.status = statusFilter;
        router.get(url, searchParams, { preserveState: true });
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(value);
        if (isServerPaginated) {
            const searchParams: any = { per_page: value };
            if (searchTerm) searchParams.search = searchTerm;
            if (statusFilter !== 'all') searchParams.status = statusFilter;
            router.get('/lplinks', searchParams, { preserveState: true });
        } else {
            setCurrentPage(1);
        }
    };

    const handleSearch = () => {
        if (isServerPaginated) {
            const searchParams: any = {};
            if (searchTerm) searchParams.search = searchTerm;
            if (statusFilter !== 'all') searchParams.status = statusFilter;
            router.get('/lplinks', searchParams, { preserveState: true });
        } else {
            setCurrentPage(1);
        }
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // For now, rely on the native UX; optionally show a toast here.
        } catch (err) {
            alert('Copy failed. Please try again.');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="LP Links" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">LP Links</h1>
                        <p className="text-muted-foreground">Manage and track your landing page links.</p>
                    </div>
                  <div className='flex gap-2'>
                  <Button className='bg-blue-500 text-white' onClick={() => router.get('/lplinks/create')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add LP Link
                    </Button>
                  <Button className='bg-green-500 text-white'>

                        Get Full Page Script
                    </Button>
                  </div>
                </div>

                {/* <Alert className="border-red-300 bg-red-50 text-red-900">
                    <AlertDescription>
                        <span className="font-medium">Note:</span> This is a demo server used to showcase and test
                        features or functions of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert> */}

                <Card>
                    <CardHeader>
                        <CardTitle>All LP Links</CardTitle>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
                                <SelectTrigger className="w-full sm:w-[140px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5 per page</SelectItem>
                                    <SelectItem value="10">10 per page</SelectItem>
                                    <SelectItem value="25">25 per page</SelectItem>
                                    <SelectItem value="50">50 per page</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex-1">
                                <Input
                                    placeholder="Search channels..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                          
                            <Button onClick={handleSearch}>
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Target Links</TableHead>
                                    <TableHead>LP Link</TableHead>
                                    <TableHead>Clicks</TableHead>
                                    <TableHead>Subscribers</TableHead>
                                
                                    <TableHead>Action</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedData.map((ch) => {
                                    const total = (Number(ch.desktop) || 0) + (Number(ch.mobile) || 0);
                                    return (
                                        <TableRow key={ch.id}>
                                        
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={ch.lp_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                                                    >
                                                        {ch.lp_link}
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                  
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={ch.lp_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className=" inline-flex items-center gap-1"
                                                    >
                                                        {ch.lp_link}
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                 
                                                </div>
                                            </TableCell>
                                            <TableCell>{ch.desktop}</TableCell>
                                     
                                            <TableCell>
                                                <Badge className={getStatusColor(ch.status)}>{ch.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                   
                                                    <Button variant="destructive" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>{new Date(ch.created_at).toLocaleString()}</TableCell>
                                            <TableCell>{ch.id}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        {filtered.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">No channels found.</p>
                            </div>
                        )}

                        {isServerPaginated ? (
                            <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg mt-4">
                                <div className="text-sm text-gray-700">Showing {channels?.from} to {channels?.to} of {totalCount} results</div>
                                <div className="flex items-center gap-2">
                                    {channels?.links?.map((link, index) => (
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
                                    <div className="text-sm text-gray-700">Showing {showingFrom} to {showingTo} of {totalCount} results</div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={safeCurrentPage === 1}
                                            className={`px-3 py-1 text-sm rounded-md ${safeCurrentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            Prev
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 text-sm rounded-md ${
                                                    page === safeCurrentPage
                                                        ? 'bg-blue-500 text-white cursor-default'
                                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                }`}
                                                disabled={page === safeCurrentPage}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={safeCurrentPage === totalPages}
                                            className={`px-3 py-1 text-sm rounded-md ${safeCurrentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
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
        </AppLayout>
    );
}


