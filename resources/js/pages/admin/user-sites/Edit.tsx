import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserSite {
    id: number;
    user_id: number;
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
}

interface Props {
    site: UserSite;
    users: User[];
}

export default function Edit({ site, users }: Props) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, put, processing, errors } = useForm({
        user_id: site.user_id.toString(),
        site_name: site.site_name,
        site_url: site.site_url,
        badge_icon_url: site.badge_icon_url || '',
        notification_icon_url: site.notification_icon_url || '',
        status: site.status,
        is_connected: site.is_connected,
        clicks: site.clicks,
        conversions: site.conversions,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'User Sites',
            href: route('admin.user-sites.index'),
        },
        {
            title: 'Edit',
            href: route('admin.user-sites.edit', site.id),
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.user-sites.update', site.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${site.site_name}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* User Selection */}
                                <div>
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                                        User *
                                    </label>
                                    <select
                                        id="user_id"
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select a user</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name} ({user.email})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>
                                    )}
                                </div>

                                {/* Site Name */}
                                <div>
                                    <label htmlFor="site_name" className="block text-sm font-medium text-gray-700">
                                        Site Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="site_name"
                                        value={data.site_name}
                                        onChange={(e) => setData('site_name', e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter site name"
                                        required
                                    />
                                    {errors.site_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.site_name}</p>
                                    )}
                                </div>

                                {/* Site URL */}
                                <div>
                                    <label htmlFor="site_url" className="block text-sm font-medium text-gray-700">
                                        Site URL *
                                    </label>
                                    <input
                                        type="url"
                                        id="site_url"
                                        value={data.site_url}
                                        onChange={(e) => setData('site_url', e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://example.com"
                                        required
                                    />
                                    {errors.site_url && (
                                        <p className="mt-1 text-sm text-red-600">{errors.site_url}</p>
                                    )}
                                </div>

                                {/* Badge Icon URL */}
                                <div>
                                    <label htmlFor="badge_icon_url" className="block text-sm font-medium text-gray-700">
                                        Badge Icon URL
                                    </label>
                                    <input
                                        type="url"
                                        id="badge_icon_url"
                                        value={data.badge_icon_url}
                                        onChange={(e) => setData('badge_icon_url', e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://example.com/badge.png"
                                    />
                                    {errors.badge_icon_url && (
                                        <p className="mt-1 text-sm text-red-600">{errors.badge_icon_url}</p>
                                    )}
                                </div>

                                {/* Notification Icon URL */}
                                <div>
                                    <label htmlFor="notification_icon_url" className="block text-sm font-medium text-gray-700">
                                        Notification Icon URL
                                    </label>
                                    <input
                                        type="url"
                                        id="notification_icon_url"
                                        value={data.notification_icon_url}
                                        onChange={(e) => setData('notification_icon_url', e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://example.com/notification.png"
                                    />
                                    {errors.notification_icon_url && (
                                        <p className="mt-1 text-sm text-red-600">{errors.notification_icon_url}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                    )}
                                </div>

                                {/* Connection Status */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_connected"
                                        checked={data.is_connected}
                                        onChange={(e) => setData('is_connected', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_connected" className="ml-2 block text-sm text-gray-900">
                                        Site is connected
                                    </label>
                                </div>
                                {errors.is_connected && (
                                    <p className="mt-1 text-sm text-red-600">{errors.is_connected}</p>
                                )}

                                {/* Clicks */}
                                <div>
                                    <label htmlFor="clicks" className="block text-sm font-medium text-gray-700">
                                        Clicks
                                    </label>
                                    <input
                                        type="number"
                                        id="clicks"
                                        value={data.clicks}
                                        onChange={(e) => setData('clicks', parseInt(e.target.value) || 0)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        min="0"
                                    />
                                    {errors.clicks && (
                                        <p className="mt-1 text-sm text-red-600">{errors.clicks}</p>
                                    )}
                                </div>

                                {/* Conversions */}
                                <div>
                                    <label htmlFor="conversions" className="block text-sm font-medium text-gray-700">
                                        Conversions
                                    </label>
                                    <input
                                        type="number"
                                        id="conversions"
                                        value={data.conversions}
                                        onChange={(e) => setData('conversions', parseInt(e.target.value) || 0)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        min="0"
                                    />
                                    {errors.conversions && (
                                        <p className="mt-1 text-sm text-red-600">{errors.conversions}</p>
                                    )}
                                </div>

                                {/* Site Information */}
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">Site Information</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div>
                                            <span className="font-medium">Created:</span> {new Date(site.created_at).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <span className="font-medium">Last Updated:</span> {new Date(site.updated_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                    <Link
                                        href={route('admin.user-sites.index')}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Updating...' : 'Update Site'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
