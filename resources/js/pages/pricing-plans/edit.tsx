import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, X } from 'lucide-react';

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
}

interface PricingPlansEditProps {
	pricingPlan: PricingPlan;
}

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Pricing Plans',
		href: '/pricing-plans',
	},
	{
		title: 'Edit',
		href: '#',
	},
];

export default function PricingPlansEdit({ pricingPlan }: PricingPlansEditProps) {
	const { data, setData, put, processing, errors } = useForm({
		name: pricingPlan.name,
		slug: pricingPlan.slug,
		description: pricingPlan.description || '',
		price: pricingPlan.price.toString(),
		currency: pricingPlan.currency,
		billing_period: pricingPlan.billing_period || 'one-time',
		features: pricingPlan.features && pricingPlan.features.length > 0 ? pricingPlan.features : [''],
		is_active: pricingPlan.is_active,
		is_featured: pricingPlan.is_featured,
		sort_order: pricingPlan.sort_order,
		cta_text: pricingPlan.cta_text,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		put(`/pricing-plans/${pricingPlan.id}`);
	};

	const addFeature = () => {
		setData('features', [...data.features, '']);
	};

	const removeFeature = (index: number) => {
		setData('features', data.features.filter((_, i) => i !== index));
	};

	const updateFeature = (index: number, value: string) => {
		const newFeatures = [...data.features];
		newFeatures[index] = value;
		setData('features', newFeatures);
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={`Edit ${pricingPlan.name}`} />

			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Edit Pricing Plan</CardTitle>
						<CardDescription>Update pricing plan details</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="name">Plan Name *</Label>
									<Input
										id="name"
										value={data.name}
										onChange={(e) => setData('name', e.target.value)}
										placeholder="e.g., Pro v5"
									/>
									{errors.name && <Alert variant="destructive"><AlertDescription>{errors.name}</AlertDescription></Alert>}
								</div>

								<div className="space-y-2">
									<Label htmlFor="slug">Slug</Label>
									<Input
										id="slug"
										value={data.slug}
										onChange={(e) => setData('slug', e.target.value)}
										placeholder="Auto-generated from name"
									/>
									{errors.slug && <Alert variant="destructive"><AlertDescription>{errors.slug}</AlertDescription></Alert>}
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									value={data.description}
									onChange={(e) => setData('description', e.target.value)}
									placeholder="Brief description of the plan"
									rows={3}
								/>
								{errors.description && <Alert variant="destructive"><AlertDescription>{errors.description}</AlertDescription></Alert>}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="space-y-2">
									<Label htmlFor="price">Price *</Label>
									<Input
										id="price"
										type="number"
										step="0.01"
										value={data.price}
										onChange={(e) => setData('price', e.target.value)}
										placeholder="799.00"
									/>
									{errors.price && <Alert variant="destructive"><AlertDescription>{errors.price}</AlertDescription></Alert>}
								</div>

								<div className="space-y-2">
									<Label htmlFor="currency">Currency *</Label>
									<Input
										id="currency"
										value={data.currency}
										onChange={(e) => setData('currency', e.target.value)}
										placeholder="USD"
										maxLength={3}
									/>
									{errors.currency && <Alert variant="destructive"><AlertDescription>{errors.currency}</AlertDescription></Alert>}
								</div>

								<div className="space-y-2">
									<Label htmlFor="billing_period">Billing Period</Label>
									<Input
										id="billing_period"
										value={data.billing_period}
										onChange={(e) => setData('billing_period', e.target.value)}
										placeholder="one-time, monthly, yearly"
									/>
									{errors.billing_period && <Alert variant="destructive"><AlertDescription>{errors.billing_period}</AlertDescription></Alert>}
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label>Features</Label>
									<Button type="button" variant="outline" size="sm" onClick={addFeature}>
										<Plus className="h-4 w-4 mr-2" />
										Add Feature
									</Button>
								</div>
								<div className="space-y-2">
									{data.features.map((feature, index) => (
										<div key={index} className="flex gap-2">
											<Input
												value={feature}
												onChange={(e) => updateFeature(index, e.target.value)}
												placeholder="Enter feature"
											/>
											{data.features.length > 1 && (
												<Button
													type="button"
													variant="ghost"
													size="icon"
													onClick={() => removeFeature(index)}
												>
													<X className="h-4 w-4" />
												</Button>
											)}
										</div>
									))}
								</div>
								{errors.features && <Alert variant="destructive"><AlertDescription>{errors.features}</AlertDescription></Alert>}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="cta_text">CTA Button Text</Label>
									<Input
										id="cta_text"
										value={data.cta_text}
										onChange={(e) => setData('cta_text', e.target.value)}
										placeholder="Buy Now"
									/>
									{errors.cta_text && <Alert variant="destructive"><AlertDescription>{errors.cta_text}</AlertDescription></Alert>}
								</div>

								<div className="space-y-2">
									<Label htmlFor="sort_order">Sort Order</Label>
									<Input
										id="sort_order"
										type="number"
										value={data.sort_order}
										onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
									/>
									{errors.sort_order && <Alert variant="destructive"><AlertDescription>{errors.sort_order}</AlertDescription></Alert>}
								</div>
							</div>

							<div className="flex items-center space-x-6">
								<div className="flex items-center space-x-2">
									<Checkbox
										id="is_active"
										checked={data.is_active}
										onCheckedChange={(checked) => setData('is_active', checked as boolean)}
									/>
									<Label htmlFor="is_active">Active</Label>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox
										id="is_featured"
										checked={data.is_featured}
										onCheckedChange={(checked) => setData('is_featured', checked as boolean)}
									/>
									<Label htmlFor="is_featured">Featured</Label>
								</div>
							</div>

							<div className="flex justify-end gap-4">
								<Link href="/pricing-plans">
									<Button type="button" variant="outline">Cancel</Button>
								</Link>
								<Button type="submit" disabled={processing}>
									{processing ? 'Updating...' : 'Update Plan'}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}

