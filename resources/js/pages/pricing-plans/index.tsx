import { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Search, Edit, Trash, Eye } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Pricing Plans',
		href: '/pricing-plans',
	},
];

interface PaginationLink {
	url: string | null;
	label: string;
	active: boolean;
}

interface PricingPlan {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	price: number;
	currency: string;
	billing_period: string | null;
	features: string[];
	is_active: boolean;
	is_featured: boolean;
	sort_order: number;
	cta_text: string;
	created_at: string;
	updated_at: string;
}

interface PricingPlansIndexProps {
	plans?: {
		data: PricingPlan[];
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

export default function PricingPlansIndex({ plans }: PricingPlansIndexProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [itemsPerPage, setItemsPerPage] = useState((plans?.per_page ?? 10).toString());
	const [statusFilter, setStatusFilter] = useState<string>('all');

	const data = useMemo(() => plans?.data ?? [], [plans]);

	const filtered = useMemo(() => {
		let result = data;
		
		if (searchTerm.trim()) {
			const term = searchTerm.trim().toLowerCase();
			result = result.filter((p) =>
				p.name.toLowerCase().includes(term) ||
				p.description?.toLowerCase().includes(term)
			);
		}

		if (statusFilter !== 'all') {
			result = result.filter((p) => 
				statusFilter === 'active' ? p.is_active : !p.is_active
			);
		}

		return result;
	}, [data, searchTerm, statusFilter]);

	const handleDelete = (id: number) => {
		if (confirm('Are you sure you want to delete this pricing plan?')) {
			router.delete(`/pricing-plans/${id}`);
		}
	};

	const handleSearch = () => {
		const params: any = {};
		if (searchTerm) params.search = searchTerm;
		if (statusFilter !== 'all') params.status = statusFilter === 'active';
		router.get('/pricing-plans', params, { preserveState: true });
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Pricing Plans" />

			<div className="space-y-6">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Pricing Plans</CardTitle>
							<Link href="/pricing-plans/create">
								<Button>
									<Plus className="mr-2 h-4 w-4" />
									Add Plan
								</Button>
							</Link>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex gap-4 mb-6">
							<div className="flex-1">
								<Input
									placeholder="Search plans..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
								/>
							</div>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Filter by status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
								</SelectContent>
							</Select>
							<Button onClick={handleSearch}>
								<Search className="mr-2 h-4 w-4" />
								Search
							</Button>
						</div>

						{plans && plans.data.length === 0 && (
							<Alert>
								<AlertDescription>
									No pricing plans found. <Link href="/pricing-plans/create" className="underline">Create one</Link>
								</AlertDescription>
							</Alert>
						)}

						{filtered.length > 0 && (
							<div className="rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>Price</TableHead>
											<TableHead>Features</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Order</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filtered.map((plan) => (
											<TableRow key={plan.id}>
												<TableCell className="font-medium">
													<div>
														{plan.name}
														{plan.is_featured && (
															<Badge variant="default" className="ml-2">Featured</Badge>
														)}
													</div>
													{plan.description && (
														<div className="text-sm text-muted-foreground mt-1">
															{plan.description}
														</div>
													)}
												</TableCell>
												<TableCell>
													{plan.currency} {plan.price.toFixed(2)}
													{plan.billing_period && (
														<span className="text-sm text-muted-foreground"> / {plan.billing_period}</span>
													)}
												</TableCell>
												<TableCell>
													{plan.features?.length || 0} features
												</TableCell>
												<TableCell>
													<Badge variant={plan.is_active ? 'default' : 'secondary'}>
														{plan.is_active ? 'Active' : 'Inactive'}
													</Badge>
												</TableCell>
												<TableCell>{plan.sort_order}</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														<Link href={`/pricing-plans/${plan.id}`}>
															<Button variant="ghost" size="sm">
																<Eye className="h-4 w-4" />
															</Button>
														</Link>
														<Link href={`/pricing-plans/${plan.id}/edit`}>
															<Button variant="ghost" size="sm">
																<Edit className="h-4 w-4" />
															</Button>
														</Link>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => handleDelete(plan.id)}
														>
															<Trash className="h-4 w-4 text-destructive" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						)}

						{plans && plans.links && plans.links.length > 3 && (
							<div className="mt-4 flex items-center justify-between">
								<div className="text-sm text-muted-foreground">
									Showing {plans.from} to {plans.to} of {plans.total} results
								</div>
								<div className="flex gap-2">
									{plans.links.map((link, index) => (
										<Button
											key={index}
											variant={link.active ? 'default' : 'outline'}
											size="sm"
											disabled={!link.url}
											onClick={() => link.url && handleSearch()}
										>
											<span dangerouslySetInnerHTML={{ __html: link.label }} />
										</Button>
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

