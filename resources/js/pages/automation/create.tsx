import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Chrome as ChromeIcon, Plus, Upload, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Automagic Push',
        href: '/automation',
    },
    {
        title: 'Create',
        href: '/automation/create',
    },
];

export default function AutomationCreate() {
    const [audience, setAudience] = useState<'all' | 'manual' | 'segmentation'>('all');
    const [autoPushType, setAutoPushType] = useState<'dynamic' | 'static'>('dynamic');
    const [wordpressUrl, setWordpressUrl] = useState('');
    const [recentPosts, setRecentPosts] = useState('10');
    const [name, setName] = useState('Good Morning AutoPush');
    const [cron, setCron] = useState('0 10 * * *');
    
    // New state for static design
    const [staticTitle, setStaticTitle] = useState('');
    const [staticMessage, setStaticMessage] = useState('');
    const [iconUrl, setIconUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [launchUrl, setLaunchUrl] = useState('');
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

    const cronExamples: { label: string; value: string }[] = [
        { label: 'Every Hour From Morning 6am to Night 12am (Including)', value: '0 6-23 * * *' },
        { label: 'Every 3 Hours From Morning 6am to Night 12am (Including)', value: '0 6-23/3 * * *' },
        { label: 'Every 3 Hours', value: '0 */3 * * *' },
        { label: 'Daily at 10:00 AM, 01:00 PM and 04:00 PM', value: '0 10,13,16 * * *' },
        { label: 'Daily at 01 PM noon', value: '0 13 * * *' },
        { label: 'Every Hour From Morning 9am to Night 10pm', value: '0 9-22 * * *' },
        { label: 'Every Week on Monday at 10am morning', value: '0 10 * * 1' },
        { label: 'Every Week on Wednesday at 10am Morning', value: '0 10 * * 3' },
        { label: 'Every Month on 1st at 10am Morning', value: '0 10 1 * *' },
        { label: 'Every Month on 1st and 15th at 10am Morning', value: '0 10 1,15 * *' },
    ];

    const recentPostOptions = useMemo(() => ['5', '10', '15', '20', '25', '30'], []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create AutoPush" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create AutoPush Campaign</h1>
                        <p className="text-muted-foreground">Configure schedule and WordPress source to send automatic notifications.</p>
                    </div>
                    <Link href={route('automation.index')}>
                        <Button variant="outline">Back to List</Button>
                    </Link>
                </div>

                <Alert className="border-red-300 bg-red-50 text-red-900">
                    <AlertDescription>
                        <span className="font-medium">Note:</span> This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Form side */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Notification</CardTitle>
                            <CardDescription>Define audience, source and schedule.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Audience */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label>Audience</Label>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <ToggleGroup type="single" value={audience} onValueChange={(v) => v && setAudience(v as any)} className="w-full">
                                    <ToggleGroupItem value="all" className="flex-1">All</ToggleGroupItem>
                                    <ToggleGroupItem value="manual" className="flex-1">Manual</ToggleGroupItem>
                                    <ToggleGroupItem value="segmentation" className="flex-1">Segmentation</ToggleGroupItem>
                                </ToggleGroup>
                            </div>

                            {/* AutoPush Type */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label>AutoPush Type</Label>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <ToggleGroup type="single" value={autoPushType} onValueChange={(v) => v && setAutoPushType(v as any)} className="w-full">
                                    <ToggleGroupItem value="dynamic" className="flex-1">Dynamic</ToggleGroupItem>
                                    <ToggleGroupItem value="static" className="flex-1">Static</ToggleGroupItem>
                                </ToggleGroup>
                            </div>

                            {/* Static Design Section - Only show when Manual is selected in Audience */}
                            {audience === 'manual' && (
                                <div className="space-y-6 p-4 border rounded-lg bg-gray-50">
                                    <h3 className="text-lg font-semibold text-gray-800">Manual Design Configuration</h3>
                                    
                                    {/* Templates */}
                                    <div className="space-y-2">
                                        <Label>Templates</Label>
                                        <Button variant="outline" className="w-full justify-start text-gray-600">
                                            Choose Template
                                        </Button>
                                    </div>

                                    {/* Title */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor="static-title">Title</Label>
                                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <Input 
                                            id="static-title" 
                                            value={staticTitle} 
                                            onChange={(e) => setStaticTitle(e.target.value)} 
                                            placeholder="Enter title" 
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor="static-message">Message</Label>
                                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <Input 
                                            id="static-message" 
                                            value={staticMessage} 
                                            onChange={(e) => setStaticMessage(e.target.value)} 
                                            placeholder="Enter message" 
                                        />
                                    </div>

                                    {/* URL Inputs */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Icon URL */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="icon-url">Icon URL</Label>
                                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="flex">
                                                <Input 
                                                    id="icon-url" 
                                                    value={iconUrl} 
                                                    onChange={(e) => setIconUrl(e.target.value)} 
                                                    placeholder="Icon URL" 
                                                    className="flex-1 rounded-r-none" 
                                                />
                                                <Button variant="outline" size="sm" className="rounded-l-none border-l-0">
                                                    <Upload className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" className="rounded-l-none border-l-0">
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Use PNG or JPG Only</p>
                                        </div>

                                        {/* Image URL */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="image-url">Image URL</Label>
                                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="flex">
                                                <Input 
                                                    id="image-url" 
                                                    value={imageUrl} 
                                                    onChange={(e) => setImageUrl(e.target.value)} 
                                                    placeholder="Image URL" 
                                                    className="flex-1 rounded-r-none" 
                                                />
                                                <Button variant="outline" size="sm" className="rounded-l-none border-l-0">
                                                    <Upload className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" className="rounded-l-none border-l-0">
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Use PNG or JPG Only</p>
                                        </div>

                                        {/* Launch URL */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="launch-url">Launch URL</Label>
                                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <Input 
                                                id="launch-url" 
                                                value={launchUrl} 
                                                onChange={(e) => setLaunchUrl(e.target.value)} 
                                                placeholder="Launch URL" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* WordPress URL - Only show when Dynamic is selected and Audience is not Manual */}
                            {autoPushType === 'dynamic' && audience !== 'manual' && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="wp-url">Wordpress Blog URL</Label>
                                        <div className="flex">
                                            <Input id="wp-url" value={wordpressUrl} onChange={(e) => setWordpressUrl(e.target.value)} placeholder="Enter Wordpress Blog Url" className="flex-1" />
                                        </div>
                                    </div>

                                    {/* Recent posts count */}
                                    <div className="space-y-2 ">
                                        <Label>Number of recent posts to consider for random post notification</Label>
                                        <div className='flex gap-2 mt-1'>
                                        <Select value={recentPosts} onValueChange={setRecentPosts}>
                                            <SelectTrigger className="w-full sm:w-3/4">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {recentPostOptions.map((opt) => (
                                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button className="bg-blue-600 text-white">Validate Wordpress API</Button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Name */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="name">AutoPush Name</Label>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Good Morning AutoPush" />
                            </div>

                            {/* Cron */}
                            <div className="space-y-2">
                                <Label htmlFor="cron">
                                    Cron Format (please create a cron for schedule using{' '}
                                    <a className="text-blue-600 underline" href="https://crontab.guru" target="_blank" rel="noreferrer">crontab.guru</a>
                                    )
                                </Label>
                                <Input id="cron" value={cron} onChange={(e) => setCron(e.target.value)} placeholder="0 10 * * *" />
                            </div>

                            {/* Examples */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label>Examples (click to get value)</Label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {cronExamples.map((ex, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setCron(ex.value)}
                                            className="text-left text-blue-600 hover:underline"
                                            title={ex.value}
                                        >
                                            {ex.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Advanced Settings */}
                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                                    className="flex items-center justify-between w-full p-3 text-left bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <span className="font-medium">Advanced Settings</span>
                                    {showAdvancedSettings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                                {showAdvancedSettings && (
                                    <div className="p-4 border rounded-lg bg-white">
                                        <p className="text-sm text-muted-foreground">Advanced configuration options will appear here.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end gap-3">
                            <Link href={route('automation.index')}>
                                <Button className="bg-red-500 text-white">Cancel</Button>
                            </Link>
                            <Button className="bg-green-600 text-white">
                                Add To AutoPush
                            </Button>
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
                                    <div className="flex items-center gap-2">
                                        <ChromeIcon className="h-4 w-4" />
                                        Chrome • Default • now
                                    </div>
                                    <div className="text-xs">^</div>
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="font-semibold">
                                        {audience === 'manual' ? (staticTitle || '[Title Here]') : (name || '[ Title Here ]')}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {audience === 'manual' ? (staticMessage || '[Description Here]') : '[ Description Here ]'}
                                    </div>
                                    <div className="mt-3 h-40 w-full rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                        {audience === 'manual' && imageUrl ? (
                                            <img src={imageUrl} alt="Preview" className="h-full w-full object-cover rounded-md" />
                                        ) : (
                                            'Image Preview'
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Type: {autoPushType.toUpperCase()} • {audience === 'manual' ? 'Manual Content' : (autoPushType === 'dynamic' ? `Posts: ${recentPosts}` : 'Static Content')}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


