import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';

interface UserSite {
    id: number;
    site_name: string;
    site_url: string;
    badge_icon_url?: string;
    notification_icon_url?: string;
    status: 'Active' | 'Inactive' | 'Pending';
    is_connected: boolean;
    clicks: number;
    conversions: number;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Props {
    site: UserSite;
}

export default function Show({ site }: Props) {
    const { auth } = usePage<SharedData>().props;
    
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this site? This action cannot be undone.')) {
            router.delete(route('admin.user-sites.destroy', site.id));
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'User Sites',
            href: route('admin.user-sites.index'),
        },
        {
            title: site.site_name,
            href: route('admin.user-sites.show', site.id),
        },
    ];

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            'Active': 'bg-green-100 text-green-800',
            'Inactive': 'bg-red-100 text-red-800',
            'Pending': 'bg-yellow-100 text-yellow-800'
        };
        
        return (
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
                {status}
            </span>
        );
    };

    const getConnectionBadge = (isConnected: boolean) => {
        return (
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Site: ${site.site_name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Site Information */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <div className="flex items-center mb-6">
                                        <div className="flex-shrink-0 h-16 w-16">
                                            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-white">
                                                    {site.site_name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-6">
                                            <h1 className="text-2xl font-bold text-gray-900">{site.site_name}</h1>
                                            <p className="text-gray-600">{site.site_url}</p>
                                            <div className="flex items-center space-x-4 mt-2">
                                                {getStatusBadge(site.status)}
                                                {getConnectionBadge(site.is_connected)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Site Details */}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Site Details</h3>
                                            <dl className="space-y-3">
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Site Name</dt>
                                                    <dd className="text-sm text-gray-900">{site.site_name}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Site URL</dt>
                                                    <dd className="text-sm text-gray-900">
                                                        <a 
                                                            href={site.site_url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            {site.site_url}
                                                        </a>
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                                    <dd className="text-sm">{getStatusBadge(site.status)}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Connection Status</dt>
                                                    <dd className="text-sm">{getConnectionBadge(site.is_connected)}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        {/* Analytics */}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics</h3>
                                            <dl className="space-y-3">
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Total Clicks</dt>
                                                    <dd className="text-2xl font-bold text-gray-900">{site.clicks}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Total Conversions</dt>
                                                    <dd className="text-2xl font-bold text-gray-900">{site.conversions}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Conversion Rate</dt>
                                                    <dd className="text-2xl font-bold text-gray-900">
                                                        {site.clicks > 0 ? ((site.conversions / site.clicks) * 100).toFixed(2) : 0}%
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>

                                    {/* Icon URLs */}
                                    {(site.badge_icon_url || site.notification_icon_url) && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Icon URLs</h3>
                                            <dl className="space-y-3">
                                                {site.badge_icon_url && (
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Badge Icon URL</dt>
                                                        <dd className="text-sm text-gray-900">
                                                            <a 
                                                                href={site.badge_icon_url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800 break-all"
                                                            >
                                                                {site.badge_icon_url}
                                                            </a>
                                                        </dd>
                                                    </div>
                                                )}
                                                {site.notification_icon_url && (
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Notification Icon URL</dt>
                                                        <dd className="text-sm text-gray-900">
                                                            <a 
                                                                href={site.notification_icon_url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800 break-all"
                                                            >
                                                                {site.notification_icon_url}
                                                            </a>
                                                        </dd>
                                                    </div>
                                                )}
                                            </dl>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* User Information */}
                            <div className="bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Owner Information</h3>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center">
                                                <span className="text-sm font-medium text-white">
                                                    {site.user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{site.user.name}</div>
                                            <div className="text-sm text-gray-500">{site.user.email}</div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            href={route('users.show', site.user.id)}
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            View User Profile →
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div className="bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Timestamps</h3>
                                    <dl className="space-y-3">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Created</dt>
                                            <dd className="text-sm text-gray-900">
                                                {new Date(site.created_at).toLocaleDateString()} at {new Date(site.created_at).toLocaleTimeString()}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                            <dd className="text-sm text-gray-900">
                                                {new Date(site.updated_at).toLocaleDateString()} at {new Date(site.updated_at).toLocaleTimeString()}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href={route('user-sites.edit', site.id)}
                                            className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Edit Site
                                        </Link>
                                        <button
                                            onClick={handleDelete}
                                            className="block w-full px-4 py-2 text-center bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            Delete Site
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
