import { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Search, ExternalLink, Trash, Copy } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Campaigns',
		href: '/campaigns',
	},
];

interface PaginationLink {
	url: string | null;
	label: string;
	active: boolean;
}

interface CampaignItem {
	id: number;
	title: string;
	domain_segment: string;
	sent: number;
	clicks: number;
	source: string;
	created_at: string; // ISO or formatted string
}

interface CampaignsIndexProps {
	campaigns?: {
		data: CampaignItem[];
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

const fallbackCampaigns: CampaignItem[] = [
	{ id: 107, title: 'Push Notifications Vs In-App Notifications:', domain_segment: 'All', sent: 119, clicks: 0, source: 'LaraPush Panel', created_at: '2025-08-01 06:36 PM' },
	{ id: 106, title: 'Push Notifications Vs In-App Notifications:', domain_segment: 'All', sent: 119, clicks: 0, source: 'LaraPush Panel', created_at: '2025-08-01 04:58 PM' },
	{ id: 105, title: 'Push Notifications Vs In-App Notifications:', domain_segment: 'All', sent: 118, clicks: 1, source: 'LaraPush Panel', created_at: '2025-07-31 03:13 PM' },
	{ id: 104, title: 'Push Notifications Vs In-App Notifications:', domain_segment: 'All', sent: 116, clicks: 0, source: 'LaraPush Panel', created_at: '2025-07-26 12:52 PM' },
	{ id: 103, title: 'Push Notifications Vs In-App Notifications:', domain_segment: 'All', sent: 116, clicks: 0, source: 'LaraPush Panel', created_at: '2025-07-26 11:15 AM' },
	{ id: 102, title: 'Product Launch Reminder', domain_segment: 'Beta Users', sent: 98, clicks: 6, source: 'LaraPush Panel', created_at: '2025-07-15 09:10 AM' },
	{ id: 101, title: 'Welcome Series Day 1', domain_segment: 'New Users', sent: 150, clicks: 9, source: 'LaraPush Panel', created_at: '2025-07-01 10:00 AM' },
];

export default function CampaignsIndex({ campaigns }: CampaignsIndexProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [itemsPerPage, setItemsPerPage] = useState((campaigns?.per_page ?? 10).toString());
	const [currentPage, setCurrentPage] = useState(1);

	const data = useMemo(() => campaigns?.data ?? fallbackCampaigns, [campaigns]);

	const filtered = useMemo(() => {
		const term = searchTerm.trim().toLowerCase();
		if (!term) return data;
		return data.filter((c) =>
			c.title.toLowerCase().includes(term) ||
			c.domain_segment.toLowerCase().includes(term) ||
			c.source.toLowerCase().includes(term)
		);
	}, [data, searchTerm]);

	const isServerPaginated = Boolean(campaigns?.links && campaigns?.data && campaigns.data.length > 0);
	const perPage = campaigns?.per_page ?? (Number(itemsPerPage) || 10);
	const totalCount = campaigns?.total ?? filtered.length;
	const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
	const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
	const startIndex = (safeCurrentPage - 1) * perPage;
	const endIndex = startIndex + perPage;
	const paginatedData = isServerPaginated ? filtered : filtered.slice(startIndex, endIndex);
	const showingFrom = isServerPaginated ? (campaigns?.from ?? 0) : (filtered.length ? startIndex + 1 : 0);
	const showingTo = isServerPaginated ? (campaigns?.to ?? 0) : Math.min(filtered.length, endIndex);

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
			router.get('/campaigns', params, { preserveState: true });
		} else {
			setCurrentPage(1);
		}
	};

	const handleSearch = () => {
		if (isServerPaginated) {
			const params: any = {};
			if (searchTerm) params.search = searchTerm;
			router.get('/campaigns', params, { preserveState: true });
		} else {
			setCurrentPage(1);
		}
	};

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			alert('Copy failed. Please try again.');
		}
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Campaigns" />

			<div className="flex flex-col gap-6 p-6">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
						<p className="text-muted-foreground">View and manage your campaigns.</p>
					</div>
					<div className='flex gap-2'>
                    <Link href={route('campaigns.create')}>
						<Button className="bg-blue-500 text-white">
							<Plus className="mr-2 h-4 w-4" />
							Create Campaign
						</Button>
					</Link>
					
						<Button className="bg-red-500 text-white" onClick={() => {
							router.delete(route('campaigns.destroy', { id: 1 }), {
								onSuccess: () => {
									router.reload();
								},
							});
						}}>
							<Trash className="mr-2 h-4 w-4" />
							Delete
						</Button>
                    </div>
					
				</div>

				<Alert className="border-red-300 bg-red-50 text-red-900">
					<AlertDescription>
						<span className="font-medium">Note:</span> Demo page to showcase campaigns list & pagination.
					</AlertDescription>
				</Alert>

				<Card>
					<CardHeader>
						<CardTitle>All Campaigns</CardTitle>
						<div className="flex flex-col sm:flex-row gap-4">
							<Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
								<SelectTrigger className="w-full sm:w-[140px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="10">10 per page</SelectItem>
									<SelectItem value="25">25 per page</SelectItem>
									<SelectItem value="50">50 per page</SelectItem>
								</SelectContent>
							</Select>
							<div className="flex-1">
								<Input
									placeholder="Search campaigns..."
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
									<TableHead>Title</TableHead>
									<TableHead>Domain/Segment</TableHead>
									<TableHead>Sent</TableHead>
									<TableHead>Clicks</TableHead>
									<TableHead>Action</TableHead>
									<TableHead>Source</TableHead>
									<TableHead>Created</TableHead>
									<TableHead>ID</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedData.map((c) => (
									<TableRow key={c.id}>
										<TableCell className="font-medium">{c.title}</TableCell>
										<TableCell>{c.domain_segment}</TableCell>
										<TableCell>{c.sent}</TableCell>
										<TableCell>{c.clicks}</TableCell>
										<TableCell>
											<Button size="sm"  className="h-8 w-8 p-0 bg-blue-500 text-white" onClick={() => handleCopy(c.title)}>
												<Copy className="h-4 w-4" />
											</Button>
										</TableCell>
										<TableCell>
											<div className="inline-flex items-center gap-1 text-blue-600">
												{c.source}
												<ExternalLink className="h-3 w-3" />
											</div>
										</TableCell>
										<TableCell>{c.created_at}</TableCell>
										<TableCell>{c.id}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						{filtered.length === 0 && (
							<div className="text-center py-8">
								<p className="text-muted-foreground">No campaigns found.</p>
							</div>
						)}

						{/* Pagination */}
						{isServerPaginated ? (
							<div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg mt-4">
								<div className="text-sm text-gray-700">Showing {campaigns?.from} to {campaigns?.to} of {totalCount} results</div>
								<div className="flex items-center gap-2">
									{campaigns?.links?.map((link, index) => (
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

