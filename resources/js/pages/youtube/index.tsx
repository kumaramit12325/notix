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
import { Plus, Search, Pause, Play, Trash2, Copy, Youtube, ExternalLink, Filter } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'YouTube',
        href: '/youtube',
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
    user?: {
        id: number;
        name: string;
        email: string;
    } | null;
}

interface User {
    id: number;
    name: string;
    email: string;
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
    users?: User[];
    isAdmin?: boolean;
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

export default function YouTubeIndex({ channels, users = [], isAdmin = false }: YouTubeIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | ChannelStatus>('all');
    const [userFilter, setUserFilter] = useState<string>('all');
    const [itemsPerPage, setItemsPerPage] = useState((channels?.per_page ?? 10).toString());
    const [copySuccess, setCopySuccess] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const data = useMemo(() => channels?.data ?? fallbackChannels, [channels]);

    const filtered = useMemo(() => {
        let filteredData = data;
        
        const term = searchTerm.trim().toLowerCase();
        if (term) {
            filteredData = filteredData.filter((c) => 
                c.name.toLowerCase().includes(term) || c.handle.toLowerCase().includes(term)
            );
        }
        
        if (statusFilter !== 'all') {
            filteredData = filteredData.filter((c) => c.status === statusFilter);
        }
        
        if (userFilter !== 'all' && isAdmin) {
            filteredData = filteredData.filter((c) => c.user?.id.toString() === userFilter);
        }
        
        return filteredData;
    }, [data, searchTerm, statusFilter, userFilter, isAdmin]);

    const totalCount = channels?.total ?? filtered.length;

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
        if (userFilter !== 'all' && isAdmin) searchParams.user_id = userFilter;
        router.get(url, searchParams, { preserveState: true });
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(value);
        const searchParams: any = { per_page: value };
        if (searchTerm) searchParams.search = searchTerm;
        if (statusFilter !== 'all') searchParams.status = statusFilter;
        if (userFilter !== 'all' && isAdmin) searchParams.user_id = userFilter;
        router.get('/youtube', searchParams, { preserveState: true });
    };

    const handleSearch = () => {
        const searchParams: any = {};
        if (searchTerm) searchParams.search = searchTerm;
        if (statusFilter !== 'all') searchParams.status = statusFilter;
        if (userFilter !== 'all' && isAdmin) searchParams.user_id = userFilter;
        router.get('/youtube', searchParams, { preserveState: true });
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess('Link copied to clipboard!');
            setTimeout(() => setCopySuccess(null), 3000);
        } catch (err) {
            alert('Copy failed. Please try again.');
        }
    };

    const handleToggleStatus = (channelId: number) => {
        router.post(`/youtube/${channelId}/toggle-status`);
    };

    const handleDelete = (channelId: number) => {
        if (confirm('Are you sure you want to delete this channel?')) {
            router.delete(`/youtube/${channelId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="YouTube" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">YouTube</h1>
                        <p className="text-muted-foreground">Collect your subscribers from your YouTube channel.</p>
                    </div>
                    <Button onClick={() => router.get('/youtube/create')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add YouTube Channel
                    </Button>
                </div>

                {/* Copy Success Message */}
                {copySuccess && (
                    <Alert className="border-green-300 bg-green-50 text-green-900">
                        <AlertDescription>
                            <span className="font-medium">Success:</span> {copySuccess}
                        </AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>All Channels</CardTitle>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-2">
                                {isAdmin && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filters
                                    </Button>
                                )}
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
                            </div>
                            
                            {showFilters && isAdmin && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Paused">Paused</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    
                                    <Select value={userFilter} onValueChange={setUserFilter}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="All Users" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Users</SelectItem>
                                            {users.map(user => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    {user.name} ({user.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            
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
                                    <TableHead>Name</TableHead>
                                    {isAdmin && <TableHead>User</TableHead>}
                                    <TableHead>LP Link</TableHead>
                                    <TableHead>Desktop</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((ch) => {
                                    const total = (Number(ch.desktop) || 0) + (Number(ch.mobile) || 0);
                                    return (
                                        <TableRow key={ch.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Youtube className="h-4 w-4 text-red-600" />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{ch.name}</span>
                                                        <span className="text-sm text-muted-foreground">{ch.handle}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            {isAdmin && (
                                                <TableCell>
                                                    {ch.user ? (
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{ch.user.name}</span>
                                                            <span className="text-sm text-muted-foreground">{ch.user.email}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground">No user</span>
                                                    )}
                                                </TableCell>
                                            )}
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
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-8 px-2 hover:bg-blue-50 transition-colors"
                                                                    aria-label="Copy link"
                                                                    onClick={() => handleCopy(ch.lp_link)}
                                                                >
                                                                    <Copy className="h-4 w-4" />
                                                               
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Copy LP link to clipboard</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                            </TableCell>
                                            <TableCell>{ch.desktop}</TableCell>
                                            <TableCell>{ch.mobile}</TableCell>
                                            <TableCell>{total}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(ch.status)}>{ch.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleToggleStatus(ch.id)}
                                                    >
                                                        {ch.status === 'Active' ? (
                                                            <Pause className="h-4 w-4" />
                                                        ) : (
                                                            <Play className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                    <Button 
                                                        variant="destructive" 
                                                        size="sm"
                                                        onClick={() => handleDelete(ch.id)}
                                                    >
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

                        {channels?.links && channels.data.length > 0 && (
                            <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg mt-4">
                                <div className="text-sm text-gray-700">Showing {channels.from} to {channels.to} of {totalCount} results</div>
                                <div className="flex items-center gap-2">
                                    {channels.links.map((link, index) => (
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
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}


