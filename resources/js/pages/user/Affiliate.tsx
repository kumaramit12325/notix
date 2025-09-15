import { Head } from '@inertiajs/react'
import UserLayout from '@/layouts/user-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link as LinkIcon, Copy, Users, MousePointerClick, Wallet, BarChart3, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function UserAffiliate() {
    const referralLink = 'https://example.com/signup?ref=USER123'
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referralLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch (e) {
            // no-op
        }
    }

    const stats = {
        clicks: 1284,
        signups: 236,
        conversions: 94,
        earnings: 1249.75,
    }

    const referrals = [
        { id: 'REF-001', name: 'John Doe', email: 'john@example.com', status: 'Active', date: '2024-02-11', commission: 29.99 },
        { id: 'REF-002', name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', date: '2024-02-12', commission: 0 },
        { id: 'REF-003', name: 'Alice Brown', email: 'alice@example.com', status: 'Active', date: '2024-02-14', commission: 49.00 },
        { id: 'REF-004', name: 'Bob Taylor', email: 'bob@example.com', status: 'Cancelled', date: '2024-02-15', commission: 0 },
    ]

    const payouts = [
        { id: 'PAY-001', amount: 150.00, method: 'PayPal', status: 'Completed', date: '2024-02-01' },
        { id: 'PAY-002', amount: 200.00, method: 'Bank Transfer', status: 'Processing', date: '2024-02-15' },
        { id: 'PAY-003', amount: 99.50, method: 'PayPal', status: 'Completed', date: '2024-03-01' },
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Active':
                return <Badge className="bg-green-100 text-green-800">Active</Badge>
            case 'Pending':
                return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            case 'Cancelled':
                return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
            case 'Completed':
                return <Badge className="bg-green-100 text-green-800">Completed</Badge>
            case 'Processing':
                return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <UserLayout breadcrumbs={[
            { title: 'User Dashboard', href: '/user-dashboard' },
            { title: 'Affiliate', href: '/user/affiliate' }
        ]}>
            <Head title="Affiliate" />
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Affiliate Program</h1>
                    <p className="text-gray-600 mt-2">Share your referral link and earn commissions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.clicks}</div>
                            <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Signups</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.signups}</div>
                            
                            <p className="text-xs text-muted-foreground">Referred users</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.conversions}</div>
                            <p className="text-xs text-muted-foreground">Paid customers</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.earnings.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <LinkIcon className="w-4 h-4 text-gray-500" />
                                <CardTitle>Your Referral Link</CardTitle>
                            </div>
                            <div className="w-full md:w-3/5 flex gap-2">
                                <Input readOnly value={referralLink} />
                                <Button onClick={handleCopy} variant="outline" className="whitespace-nowrap">
                                    {copied ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 mr-1" /> Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4 mr-1" /> Copy
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                        <CardDescription>Share this link to earn commission on new subscriptions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="referrals">
                            <TabsList>
                                <TabsTrigger value="referrals">Referrals</TabsTrigger>
                                <TabsTrigger value="payouts">Payouts</TabsTrigger>
                            </TabsList>
                            <TabsContent value="referrals" className="mt-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Ref ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Commission</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {referrals.map((r) => (
                                            <TableRow key={r.id}>
                                                <TableCell className="font-medium">{r.id}</TableCell>
                                                <TableCell>{r.name}</TableCell>
                                                <TableCell>{r.email}</TableCell>
                                                <TableCell>{getStatusBadge(r.status)}</TableCell>
                                                <TableCell>{r.commission > 0 ? `$${r.commission.toFixed(2)}` : '-'}</TableCell>
                                                <TableCell>{r.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="payouts" className="mt-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Payout ID</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {payouts.map((p) => (
                                            <TableRow key={p.id}>
                                                <TableCell className="font-medium">{p.id}</TableCell>
                                                <TableCell>${p.amount.toFixed(2)}</TableCell>
                                                <TableCell>{p.method}</TableCell>
                                                <TableCell>{getStatusBadge(p.status)}</TableCell>
                                                <TableCell>{p.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>How it works</CardTitle>
                            <CardDescription>Simple steps to start earning</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-700 space-y-3">
                            <p>1. Share your unique referral link with your audience.</p>
                            <p>2. Visitors sign up using your link.</p>
                            <p>3. You earn commission on qualifying purchases.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Program rules</CardTitle>
                            <CardDescription>Guidelines to keep the program fair</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-700 space-y-3">
                            <p>• No spam or misleading promotions.</p>
                            <p>• Commissions are approved after refund windows.</p>
                            <p>• Payouts are processed monthly.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </UserLayout>
    )
}
