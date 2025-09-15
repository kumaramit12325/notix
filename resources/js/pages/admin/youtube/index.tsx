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
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Search, Pause, Play, Trash2, Copy, Youtube, ExternalLink, Filter, Download, Upload } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/dashboard',
    },
    {
        title: 'YouTube Channels',
        href: '/admin/youtube',
    },
];

type ChannelStatus = 'Active' | 'Paused';

interface ChannelItem {
    id: number;
    title: string;
    handle: string;
    lp_link: string;
    desktop: number;
    mobile: number;
    status: ChannelStatus;
    created_at: string;
    subscriber_count: string;
    domain: string;
    logo: string;
    user: {
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

interface AdminYouTubeIndexProps {
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
    users: User[];
}

export default function AdminYouTubeIndex({ channels, users }: AdminYouTubeIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | ChannelStatus>('all');
    const [userFilter, setUserFilter] = useState<string>('all');
    const [itemsPerPage, setItemsPerPage] = useState((channels?.per_page ?? 15).toString());
    const [selectedChannels, setSelectedChannels] = useState<number[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const data = useMemo(() => channels?.data ?? [], [channels]);

    const filtered = useMemo(() => {
        let filteredData = data;
        
        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            filteredData = filteredData.filter((c) => 
                c.title.toLowerCase().includes(term) || 
                c.handle.toLowerCase().includes(term) ||
                c.domain.toLowerCase().includes(term)
            );
        }
        
        if (statusFilter !== 'all') {
            filteredData = filteredData.filter((c) => c.status === statusFilter);
        }
        
        if (userFilter !== 'all') {
            filteredData = filteredData.filter((c) => c.user?.id.toString() === userFilter);
        }
        
        return filteredData;
    }, [data, searchTerm, statusFilter, userFilter]);

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
        if (userFilter !== 'all') searchParams.user_id = userFilter;
        router.get(url, searchParams, { preserveState: true });
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(value);
        const searchParams: any = { per_page: value };
        if (searchTerm) searchParams.search = searchTerm;
        if (statusFilter !== 'all') searchParams.status = statusFilter;
        if (userFilter !== 'all') searchParams.user_id = userFilter;
        router.get('/admin/youtube', searchParams, { preserveState: true });
    };

    const handleSearch = () => {
        const searchParams: any = {};
        if (searchTerm) searchParams.search = searchTerm;
        if (statusFilter !== 'all') searchParams.status = statusFilter;
        if (userFilter !== 'all') searchParams.user_id = userFilter;
        router.get('/admin/youtube', searchParams, { preserveState: true });
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            alert('Copy failed. Please try again.');
        }
    };

    const handleToggleStatus = (channelId: number) => {
        router.post(`/admin/youtube/${channelId}/toggle-status`);
    };

    const handleDelete = (channelId: number) => {
        if (confirm('Are you sure you want to delete this channel?')) {
            router.delete(`/admin/youtube/${channelId}`);
        }
    };

    const handleBulkDelete = () => {
        if (selectedChannels.length === 0) return;
        if (confirm(`Are you sure you want to delete ${selectedChannels.length} selected channels?`)) {
            router.post('/admin/youtube/bulk-delete', { ids: selectedChannels });
        }
    };

    const handleBulkStatusUpdate = (status: ChannelStatus) => {
        if (selectedChannels.length === 0) return;
        router.post('/admin/youtube/bulk-update-status', { 
            ids: selectedChannels, 
            status 
        });
    };

    const handleSelectAll = () => {
        if (selectedChannels.length === filtered.length) {
            setSelectedChannels([]);
        } else {
            setSelectedChannels(filtered.map(c => c.id));
        }
    };

    const handleSelectChannel = (channelId: number) => {
        setSelectedChannels(prev => 
            prev.includes(channelId) 
                ? prev.filter(id => id !== channelId)
                : [...prev, channelId]
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - YouTube Channels" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">YouTube Channels Management</h1>
                        <p className="text-muted-foreground">Manage all YouTube channels across the platform.</p>
                    </div>
                    <Button onClick={() => router.get('/admin/youtube/create')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Channel
                    </Button>
                </div>

                {/* Bulk Actions */}
                {selectedChannels.length > 0 && (
                    <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-700">
                                    {selectedChannels.length} channel(s) selected
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleBulkStatusUpdate('Active')}
                                    >
                                        <Play className="mr-2 h-4 w-4" />
                                        Activate All
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleBulkStatusUpdate('Paused')}
                                    >
                                        <Pause className="mr-2 h-4 w-4" />
                                        Pause All
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleBulkDelete}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete All
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>All Channels</CardTitle>
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filters
                                </Button>
                                <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10 per page</SelectItem>
                                        <SelectItem value="15">15 per page</SelectItem>
                                        <SelectItem value="25">25 per page</SelectItem>
                                        <SelectItem value="50">50 per page</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {showFilters && (
                                <div className="flex flex-col lg:flex-row gap-4 flex-1">
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
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selectedChannels.length === filtered.length && filtered.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Channel</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>LP Link</TableHead>
                                    <TableHead>Desktop</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                    <TableHead>Created</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((ch) => {
                                    const total = (Number(ch.desktop) || 0) + (Number(ch.mobile) || 0);
                                    const isSelected = selectedChannels.includes(ch.id);
                                    
                                    return (
                                        <TableRow key={ch.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={isSelected}
                                                    onCheckedChange={() => handleSelectChannel(ch.id)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Youtube className="h-4 w-4 text-red-600" />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{ch.title}</span>
                                                        <span className="text-sm text-muted-foreground">{ch.handle}</span>
                                                        <span className="text-xs text-muted-foreground">{ch.domain}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
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
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={ch.lp_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-600 hover:underline inline-flex items-center gap-1 text-sm"
                                                    >
                                                        {ch.lp_link}
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label="Copy link"
                                                        onClick={() => handleCopy(ch.lp_link)}
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>{ch.desktop}</TableCell>
                                            <TableCell>{ch.mobile}</TableCell>
                                            <TableCell className="font-medium">{total}</TableCell>
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
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => router.get(`/admin/youtube/${ch.id}/edit`)}
                                                    >
                                                        Edit
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
                                <div className="text-sm text-gray-700">
                                    Showing {channels.from} to {channels.to} of {totalCount} results
                                </div>
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
