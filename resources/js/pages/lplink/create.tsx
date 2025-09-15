import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'LP links create',
        href: '/lplinks.create',
    },
];



export default function LpLinkCreate() {
   const [forceSubscribe, setForceSubscribe] = useState<boolean>(true);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="LP Links" />

            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-3xl font-bold tracking-tight">Create Link</h1>

                {/* <Alert variant="destructive">
                    <AlertDescription>
                        <b>Note:</b> This is a demo server used to showcase and test features of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert> */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Link Details</CardTitle>
                            <CardDescription>Configure your LP link.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="target">Enter Target Link *</Label>
                                <Input id="target" placeholder="https://your-target-link.com" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="domain">Subscriber Collection Domain</Label>
                                <Select defaultValue="default">
                                    <SelectTrigger id="domain">
                                        <SelectValue placeholder="Select domain" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Default</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prompt">Link Prompt Text *</Label>
                                <Input
                                    id="prompt"
                                    placeholder="Please click 'Allow' when asked about notifications to subscribe to updates"
                                />
                            </div>

                            <Collapsible>
                                <CollapsibleTrigger className="w-full text-left font-medium text-sm py-2">
                                    Advanced Settings
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pt-3 space-y-5">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="force-subscribe"
                                            checked={forceSubscribe}
                                            onCheckedChange={(checked) => setForceSubscribe(!!checked)}
                                        />
                                        <Label htmlFor="force-subscribe" className="font-medium">Force Subscribe</Label>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="denied-url">Denied URL</Label>
                                        <Input id="denied-url" placeholder="" disabled className="bg-muted" />
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div className="rounded-md border">
                                            <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">Desktop Settings</div>
                                            <div className="space-y-4 p-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="desktop-subscribed">Subscribed Target URL</Label>
                                                    <Input id="desktop-subscribed" placeholder="" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="desktop-denied">Denied Target URL</Label>
                                                    <Input id="desktop-denied" placeholder="" disabled className="bg-muted" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-md border">
                                            <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">Mobile Settings</div>
                                            <div className="space-y-4 p-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="mobile-subscribed">Subscribed Target URL</Label>
                                                    <Input id="mobile-subscribed" placeholder="" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="mobile-denied">Denied Target URL</Label>
                                                    <Input id="mobile-denied" placeholder="" disabled className="bg-muted" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                        <CardFooter className="justify-end gap-3">
                            <Button variant="outline">Cancel</Button>
                            <Button>Create Link</Button>
                        </CardFooter>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>Permission Page</CardTitle>
                            <CardDescription>Preview of the browser permission prompt.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg border bg-muted/10">
                                <div className="flex items-center gap-2 border-b px-4 py-2">
                                    <div className="flex items-center gap-1">
                                        <span className="size-3 rounded-full bg-red-400" />
                                        <span className="size-3 rounded-full bg-yellow-400" />
                                        <span className="size-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="mx-auto w-2/3 rounded-md border bg-background px-3 py-1 text-center text-xs text-muted-foreground">
                                        demo.larapu.sh
                                    </div>
                                </div>

                                <div className="relative h-72 bg-background">
                                    <div className="absolute left-8 top-8 w-72 rounded-lg border bg-card p-4 shadow-md">
                                        <div className="text-sm font-medium">demo.larapu.sh wants to</div>
                                        <div className="mt-1 text-sm text-muted-foreground">Show notifications</div>
                                        <div className="mt-3 flex justify-end gap-2">
                                            <Button variant="outline" size="sm">Block</Button>
                                            <Button size="sm">Allow</Button>
                                        </div>
                                    </div>

                                    <div className="absolute inset-x-0 bottom-6 w-full text-center text-sm text-muted-foreground px-6">
                                        Please click 'Allow' when asked about notifications to subscribe to updates
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


