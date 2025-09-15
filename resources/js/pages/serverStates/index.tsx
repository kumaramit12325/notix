import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Trash2 } from 'lucide-react';

export default function serverIndex() {
	const cpuUsagePercent = 2.81;
	const ramUsedGb = 0.49;
	const ramTotalGb = 0.96;
	const storageUsedGb = 7;
	const storageTotalGb = 24;
	const storagePercent = Math.round((storageUsedGb / storageTotalGb) * 10000) / 100;

	return (
		<AppLayout>
			<Head title="Server Status" />

			<div className="space-y-6 p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold tracking-tight">Server Status</h2>
					<div className="flex items-center gap-2">
						<Button variant="secondary" className="gap-2">
							<RefreshCw className="h-4 w-4" />
							<span>Restart Services</span>
						</Button>
						<Button variant="outline" className="gap-2">
							<RefreshCw className="h-4 w-4" />
							<span>Reboot Server</span>
						</Button>
						<Button variant="destructive" className="gap-2">
							<Trash2 className="h-4 w-4" />
							<span>Clear Everything</span>
						</Button>
					</div>
				</div>

				{/* <Alert variant="destructive">
					<AlertDescription>
						<strong>Note:</strong> This is a demo server used to showcase and test features of
						LaraPush Pro Panel.
					</AlertDescription>
				</Alert> */}
<hr />      
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>1 Core CPU | Usage: {cpuUsagePercent}%</CardTitle>
						</CardHeader>
						<CardContent>
							{/* Simple inline chart placeholder */}
							<svg viewBox="0 0 400 120" className="w-full h-28 text-muted-foreground">
								<rect x="0" y="0" width="400" height="120" rx="8" className="fill-muted" />
								<polyline
									points="0,110 50,109 100,109 150,109 200,109 250,109 300,109 350,109 400,109"
									className="fill-none stroke-current"
									strokeWidth="2"
								/>
							</svg>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>
								Ram Usage: {ramUsedGb}GB/{ramTotalGb}GB ({Math.round((ramUsedGb / ramTotalGb) * 10000) / 100}%)
							</CardTitle>
						</CardHeader>
						<CardContent>
							<svg viewBox="0 0 400 120" className="w-full h-28 text-muted-foreground">
								<rect x="0" y="0" width="400" height="120" rx="8" className="fill-muted" />
								<rect x="0" y="60" width="400" height="50" className="fill-emerald-200" />
								<line x1="0" y1="85" x2="400" y2="85" className="stroke-emerald-600" strokeWidth="2" />
							</svg>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Storage Usages ({storageUsedGb}GB / {storageTotalGb}GB)</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-sm font-medium mb-2">{storagePercent}%</div>
						<div className="w-full h-6 rounded-md bg-muted overflow-hidden">
							<div
								className="h-full bg-blue-600"
								style={{ width: `${storagePercent}%` }}
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Services</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
							<div className="flex items-center justify-between">
								<span>Nginx</span>
								<Badge className="bg-emerald-600 text-white">Active</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span>Supervisor</span>
								<Badge className="bg-emerald-600 text-white">Active</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span>Mysql</span>
								<Badge className="bg-emerald-600 text-white">Active</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span>Redis</span>
								<Badge className="bg-emerald-600 text-white">Active</Badge>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
