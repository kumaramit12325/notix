import { Head } from '@inertiajs/react'
import UserLayout from '@/layouts/user-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Check, Zap, Shield, Star, Search, Package } from 'lucide-react'

export default function UserPackages() {
    const packages = [
        {
            id: 'basic',
            name: 'Basic',
            price: 19,
            period: 'month',
            features: ['Single project', 'Email support', 'Community access'],
            popular: false,
            badge: 'Starter'
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 49,
            period: 'month',
            features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Team collaboration'],
            popular: true,
            badge: 'Most Popular'
        },
        {
            id: 'business',
            name: 'Business',
            price: 99,
            period: 'month',
            features: ['All Pro features', 'Dedicated manager', 'Custom integrations', 'SLA & security reviews'],
            popular: false,
            badge: 'Best for Teams'
        }
    ]

    return (
        <UserLayout breadcrumbs={[
            { title: 'User Dashboard', href: '/user-dashboard' },
            { title: 'Packages', href: '/user/packages' }
        ]}>
            <Head title="Packages" />
            <div className="p-6">
                <div className="mb-8 flex items-start justify-between gap-4 flex-col md:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
                        <p className="text-gray-600 mt-2">Choose a plan that fits your needs</p>
                    </div>
                    <div className="w-full md:w-72">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input placeholder="Search packages..." className="pl-10" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <Card key={pkg.id} className={pkg.popular ? 'border-blue-500 shadow-md' : ''}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {pkg.popular ? (
                                            <Star className="w-5 h-5 text-yellow-500" />
                                        ) : (
                                            <Package className="w-5 h-5 text-gray-400" />
                                        )}
                                        <CardTitle>{pkg.name}</CardTitle>
                                    </div>
                                    <Badge className={pkg.popular ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                                        {pkg.badge}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                                    <span className="text-gray-500">/{pkg.period}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 mb-6">
                                    {pkg.features.map((feat) => (
                                        <li key={feat} className="flex items-center gap-2 text-gray-700">
                                            <Check className="w-4 h-4 text-green-600" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center gap-3">
                                    <Button className="w-full">Choose {pkg.name}</Button>
                                    {pkg.popular && (
                                        <Button variant="outline" className="w-full">Try Demo</Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Separator className="my-10" />

                <Tabs defaultValue="features">
                    <TabsList>
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="benefits">Benefits</TabsTrigger>
                        <TabsTrigger value="faq">FAQ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="features" className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-blue-600" />
                                    <CardTitle>Performance</CardTitle>
                                </div>
                                <CardDescription>Fast, optimized workflows for productivity</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-700">
                                Get blazing-fast load times, optimized queries, and smart caching across all plans.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    <CardTitle>Security</CardTitle>
                                </div>
                                <CardDescription>Enterprise-grade security features</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-700">
                                2FA, audit logs, role-based access, and compliance options available.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-600" />
                                    <CardTitle>Support</CardTitle>
                                </div>
                                <CardDescription>Get help when you need it</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-700">
                                Priority channels and dedicated support on higher tiers.
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="benefits" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Why upgrade?</CardTitle>
                                <CardDescription>Unlock advanced workflows and collaboration</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-700 space-y-2">
                                <p>• Scale unlimited projects with team access.</p>
                                <p>• Accelerate decisions with advanced analytics.</p>
                                <p>• Improve reliability with SLA options.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="faq" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Frequently Asked Questions</CardTitle>
                                <CardDescription>Common questions about plans and billing</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-700 space-y-4">
                                <div>
                                    <p className="font-medium">Can I change plans later?</p>
                                    <p>Yes, you can upgrade or downgrade anytime. Changes take effect immediately.</p>
                                </div>
                                <div>
                                    <p className="font-medium">Do you offer refunds?</p>
                                    <p>We offer a 14-day money-back guarantee on first-time subscriptions.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </UserLayout>
    )
}
