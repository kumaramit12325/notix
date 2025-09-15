import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Upload, Link2, Image as ImageIcon, Rocket, Chrome as ChromeIcon, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Campaigns',
        href: '/campaigns',
    },
    {
        title: 'Create',
        href: '/campaigns/create',
    },
];

export default function CampaignsCreate() {
    const [fetchUrl, setFetchUrl] = useState<string>('');
    const [audience, setAudience] = useState<'all' | 'manual' | 'segmentation'>('all');
    // Manual audience fields (UI only for now)
    const [domain, setDomain] = useState<string>('');
    const [country, setCountry] = useState<string>('all');
    const [stateName, setStateName] = useState<string>('all');
    const [device, setDevice] = useState<string>('all');
    const [operatingSystem, setOperatingSystem] = useState<string>('all');
    const [browser, setBrowser] = useState<string>('all');
    const [subscribedFrom, setSubscribedFrom] = useState<string>('1999-01-01');
    const [subscribedTo, setSubscribedTo] = useState<string>('2100-01-01');
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [iconUrl, setIconUrl] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [launchUrl, setLaunchUrl] = useState<string>('');
    const [useUtm, setUseUtm] = useState<boolean>(false);
    const [sendNotificationNow, setSendNotificationNow] = useState('yes');
    const [isTemplateOpen, setIsTemplateOpen] = useState<boolean>(false);
    const [templateSearch, setTemplateSearch] = useState<string>('');

    const templates = [
        {
            id: 1,
            channel: 'Chrome • Default • now',
            title: 'Winter time table in Punjab schools Bell time from 1st Nov.',
            message: 'Winter time table in Punjab schools Bell time from 1st November to 28th February...Read More',
            image: 'https://i.imgur.com/6w8YcVj.jpeg',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/OOjs_UI_icon_bell.svg',
            url: 'https://punjab.gov.in',
        },
        {
            id: 2,
            channel: 'Chrome • Default • now',
            title: 'Larapush - Self Hosted Push Notification Panel',
            message: 'LaraPush is the best self hosted push notification tool that enables efficient and independent delivery...Read More',
            image: 'https://larapush.com/assets/larapush/social/banner.jpg',
            icon: 'https://larapush.com/assets/images/favicon/favicon-32x32.png',
            url: 'https://larapush.com',
        },
        {
            id: 3,
            channel: 'Chrome • Default • now',
            title: 'Make Money From Blogging in 2025',
            message: 'Checkout Omnisend and subscribe to my channel for more...',
            image: 'https://i.imgur.com/2d6n2yT.jpeg',
            icon: 'https://i.imgur.com/5b8v3xC.png',
            url: 'https://youtube.com',
        },
    ];

    useEffect(() => {
        const scheduleInputs = document.getElementById('schedule-inputs');
        if (scheduleInputs) {
            if (sendNotificationNow === 'no') {
                scheduleInputs.classList.remove('hidden');
            } else {
                scheduleInputs.classList.add('hidden');
            }
        }
    }, [sendNotificationNow]);

    const handleSendNotificationChange = (value: string) => {
        setSendNotificationNow(value);
    };

    const handleFetchContent = () => {
        // Demo autofill based on URL
        if (!fetchUrl) return;
        setTitle('Larapush - Self Hosted Push Notification Panel');
        setMessage('LaraPush is the best self hosted push notification tool that enables efficient and independent delivery...Read More');
        setIconUrl('https://larapush.com/assets/images/favicon/favicon-32x32.png');
        setImageUrl('https://larapush.com/assets/larapush/social/banner.jpg');
        setLaunchUrl(fetchUrl.startsWith('http') ? fetchUrl : `https://${fetchUrl.replace(/^https?:\/\//, '')}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Campaign" />

            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>

                <Alert className="border-red-300 bg-red-50 text-red-900">
                    <AlertDescription>
                        <span className="font-medium">Note:</span> This is a demo server used to showcase and test
                        features or functions of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert>

                {/* Fetch Content URL */}
                <Card>
                    <CardHeader>
                        <CardTitle>Enter URL to Fetch Content</CardTitle>
                        <CardDescription>Auto-fill notification details from a web page.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Input value={fetchUrl} onChange={(e) => setFetchUrl(e.target.value)} placeholder="https://example.com" className="flex-1" />
                            <Button className="bg-green-500 text-white" onClick={handleFetchContent}>
                                <Rocket className="mr-2 h-4 w-4" />
                                Fetch Content
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Form side */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Notification</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Audience</Label>
                                <ToggleGroup type="single" value={audience} onValueChange={(v) => v && setAudience(v as any)} className="w-full">
                                    <ToggleGroupItem value="all" className="flex-1">All</ToggleGroupItem>
                                    <ToggleGroupItem value="manual" className="flex-1">Manual</ToggleGroupItem>
                                    <ToggleGroupItem value="segmentation" className="flex-1">Segmentation</ToggleGroupItem>
                                </ToggleGroup>
                            </div>

                            {/* Manual audience filters */}
                            {audience === 'manual' && (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Domains</Label>
                                        <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Select a domain" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Countries</Label>
                                        <Select value={country} onValueChange={setCountry}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Countries" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Countries</SelectItem>
                                                <SelectItem value="in">India</SelectItem>
                                                <SelectItem value="us">United States</SelectItem>
                                                <SelectItem value="gb">United Kingdom</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>State</Label>
                                        <Select value={stateName} onValueChange={setStateName}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All states" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All states</SelectItem>
                                                <SelectItem value="pb">Punjab</SelectItem>
                                                <SelectItem value="dl">Delhi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Devices</Label>
                                        <Select value={device} onValueChange={setDevice}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Devices" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Devices</SelectItem>
                                                <SelectItem value="desktop">Desktop</SelectItem>
                                                <SelectItem value="mobile">Mobile</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Operating Systems</Label>
                                        <Select value={operatingSystem} onValueChange={setOperatingSystem}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Operating Systems" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Operating Systems</SelectItem>
                                                <SelectItem value="windows">Windows</SelectItem>
                                                <SelectItem value="macos">macOS</SelectItem>
                                                <SelectItem value="linux">Linux</SelectItem>
                                                <SelectItem value="android">Android</SelectItem>
                                                <SelectItem value="ios">iOS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Browsers</Label>
                                        <Select value={browser} onValueChange={setBrowser}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Browsers" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Browsers</SelectItem>
                                                <SelectItem value="chrome">Chrome</SelectItem>
                                                <SelectItem value="firefox">Firefox</SelectItem>
                                                <SelectItem value="edge">Edge</SelectItem>
                                                <SelectItem value="safari">Safari</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Show notification to users, who subscribed</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <Input type="date" value={subscribedFrom} onChange={(e) => setSubscribedFrom(e.target.value)} />
                                            <Input type="date" value={subscribedTo} onChange={(e) => setSubscribedTo(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2 ">
                                <Label>Templates</Label>
                                <Button variant="outline" className="w-fit" onClick={() => setIsTemplateOpen(true)}>Choose Template</Button>
                                <Sheet open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
                                    <SheetContent side="right" className="w-full sm:w-3/4 sm:max-w-none p-2">
                                        <SheetHeader>
                                            <SheetTitle>Templates</SheetTitle>
                                        </SheetHeader>

                                        <div className="mt-4 space-y-4">
                                            <Input placeholder="Search templates..." value={templateSearch} onChange={(e) => setTemplateSearch(e.target.value)} />

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {templates
                                                    .filter(t =>
                                                        [t.title, t.message, t.channel]
                                                            .join(' ')
                                                            .toLowerCase()
                                                            .includes(templateSearch.toLowerCase())
                                                    )
                                                    .map((t) => (
                                                        <button
                                                            key={t.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setTitle(t.title);
                                                                setMessage(t.message);
                                                                setImageUrl(t.image);
                                                                setIconUrl(t.icon);
                                                                setLaunchUrl(t.url);
                                                                setIsTemplateOpen(false);
                                                            }}
                                                            className="text-left rounded-xl border bg-white shadow-sm hover:shadow transition-shadow"
                                                        >
                                                            <div className="p-3">
                                                                <div className="flex items-center justify-between border-b pb-2 text-xs text-muted-foreground">
                                                                    <div className="flex items-center gap-2">
                                                                        <ChromeIcon className="h-4 w-4 text-red-500" />
                                                                        <div>{t.channel}</div>
                                                                    </div>
                                                                    <Trash2 className="h-4 w-4 text-gray-400" />
                                                                </div>
                                                                <div className="pt-2 space-y-1">
                                                                    <div className="font-semibold text-sm leading-snug line-clamp-2">{t.title}</div>
                                                                    <div className="text-xs text-muted-foreground line-clamp-2">{t.message}</div>
                                                                    <div className="mt-2">
                                                                        {t.image ? (
                                                                            <img src={t.image} alt="template" className="h-36 w-full rounded-md object-cover" />
                                                                        ) : (
                                                                            <div className="h-36 w-full rounded-md bg-muted" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message" />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2 md:col-span-1">
                                    <Label htmlFor="icon">Icon URL</Label>
                                    <div className="flex gap-2">
                                        <Input id="icon" value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} placeholder="https://...png" />
                                        <Button variant="outline" size="icon"><Upload className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-1">
                                    <Label htmlFor="image">Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input id="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://...jpg" />
                                        <Button variant="outline" size="icon"><ImageIcon className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-1">
                                    <Label htmlFor="launch">Launch URL</Label>
                                    <div className="flex gap-2">
                                        <Input id="launch" value={launchUrl} onChange={(e) => setLaunchUrl(e.target.value)} placeholder="https://..." />
                                        <Button variant="outline" size="icon"><Link2 className="h-4 w-4" /></Button>
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                        <Checkbox id="utm" checked={useUtm} onCheckedChange={(c) => setUseUtm(!!c)} />
                                        <Label htmlFor="utm">Use UTM Link</Label>
                                    </div>
                                </div>


                            </div>
                                <div className="space-y-2">
                                    <Label htmlFor="launch">Send Notification Now</Label>
                                    <div className="flex items-center gap-4 pt-1">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="send-now-yes"
                                                name="send-now"
                                                value="yes"
                                                checked={sendNotificationNow === 'yes'}
                                                onChange={() => handleSendNotificationChange('yes')}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <Label htmlFor="send-now-yes" className="text-sm font-medium text-gray-700">
                                                Yes
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="send-now-no"
                                                name="send-now"
                                                value="no"
                                                checked={sendNotificationNow === 'no'}
                                                onChange={() => handleSendNotificationChange('no')}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <Label htmlFor="send-now-no" className="text-sm font-medium text-gray-700">
                                                No
                                            </Label>
                                        </div>
                                        {/* Conditional inputs - shown only when "No" is selected */}
                                        <div id="schedule-inputs" className="hidden pt-3">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="schedule-at">Schedule At</Label>
                                                    <div className="relative">
                                                        <input
                                                            type="datetime-local"
                                                            id="schedule-at"
                                                            name="schedule_at"
                                                            className="w-full px-3 py-1 h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="timezone">Timezone</Label>
                                                    <select
                                                        id="timezone"
                                                        name="timezone"
                                                        className="w-full px-3 py-1 h-10  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="UTC+05:30">(UTC+05:30) Asia/Kolkata</option>
                                                        <option value="UTC+00:00">(UTC+00:00) UTC</option>
                                                        <option value="UTC-05:00">(UTC-05:00) Eastern Time</option>
                                                        <option value="UTC-08:00">(UTC-08:00) Pacific Time</option>
                                                        <option value="UTC+01:00">(UTC+01:00) Central European Time</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            <Collapsible>
                                <CollapsibleTrigger className="w-full text-left font-medium text-sm py-2 border border-gray-200 bg-gray-200 rounded-md px-2">Advanced Settings</CollapsibleTrigger>
                                <CollapsibleContent className="pt-3 space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="rounded-md border">
                                            <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">Desktop Settings</div>
                                            <div className="space-y-3 p-4">
                                                <Label>Subscribed Target URL</Label>
                                                <Input placeholder="https://..." />
                                                <Label>Denied Target URL</Label>
                                                <Input placeholder="https://..." disabled className="bg-muted" />
                                            </div>
                                        </div>
                                        <div className="rounded-md border">
                                            <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium">Mobile Settings</div>
                                            <div className="space-y-3 p-4">
                                                <Label>Subscribed Target URL</Label>
                                                <Input placeholder="https://..." />
                                                <Label>Denied Target URL</Label>
                                                <Input placeholder="https://..." disabled className="bg-muted" />
                                            </div>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                        <CardFooter className="justify-end gap-3">
                            <Button variant="outline">Live Preview</Button>
                            <Link href={route('campaigns.index')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button variant="outline">Create Template</Button>
                            <Button className="bg-green-600 text-white">Send</Button>
                        </CardFooter>
                    </Card>

                    {/* Preview side */}
                    <Card className="lg:col-span-1 overflow-hidden">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>Live preview of the notification.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg border bg-white">
                                <div className="flex items-center justify-between border-b px-4 py-2 text-sm text-muted-foreground">
                                    <div>Chrome • Default • now</div>
                                    <div className="text-xs">^</div>
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="font-semibold">{title || '[ Title Here ]'}</div>
                                    <div className="text-sm text-muted-foreground">{message || '[ Description Here ]'}</div>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="preview" className="mt-3 h-40 w-full rounded-md object-cover" />
                                    ) : (
                                        <div className="mt-3 h-40 w-full rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                            Image Preview
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


