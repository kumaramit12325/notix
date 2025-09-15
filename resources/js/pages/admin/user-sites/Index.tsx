import React, { useState, useEffect } from 'react';
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

interface Stats {
    total_sites: number;
    active_sites: number;
    inactive_sites: number;
    connected_sites: number;
    total_clicks: number;
    total_conversions: number;
}

interface Filters {
    search?: string;
    sort_by?: string;
    sort_order?: string;
}

interface Props {
    sites: {
        data: UserSite[];
        links: any[];
        meta: any;
    };
    stats: Stats;
    filters: Filters;
}

export default function Index({ sites, stats, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [selectedSites, setSelectedSites] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at');
    const [sortOrder, setSortOrder] = useState(filters.sort_order || 'desc');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'User Sites',
            href: route('admin.user-sites.index'),
        },
    ];

    const handleSearch = () => {
        router.get(route('admin.user-sites.index'), {
            search: searchTerm,
            sort_by: sortBy,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleBulkDelete = () => {
        if (selectedSites.length === 0) return;
        
        if (confirm(`Are you sure you want to delete ${selectedSites.length} site(s)?`)) {
            router.post(route('admin.user-sites.bulk-delete'), {
                ids: selectedSites
            }, {
                onSuccess: () => {
                    setSelectedSites([]);
                }
            });
        }
    };

    const handleBulkStatusUpdate = (status: string) => {
        if (selectedSites.length === 0) return;
        
        router.post(route('admin.user-sites.bulk-update-status'), {
            ids: selectedSites,
            status: status
        }, {
            onSuccess: () => {
                setSelectedSites([]);
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedSites.length === sites.data.length) {
            setSelectedSites([]);
        } else {
            setSelectedSites(sites.data.map(site => site.id));
        }
    };

    const handleSelectSite = (siteId: number) => {
        setSelectedSites(prev => 
            prev.includes(siteId) 
                ? prev.filter(id => id !== siteId)
                : [...prev, siteId]
        );
    };

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            'Active': 'bg-green-100 text-green-800',
            'Inactive': 'bg-red-100 text-red-800',
            'Pending': 'bg-yellow-100 text-yellow-800'
        };
        
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
                {status}
            </span>
        );
    };

    const getConnectionBadge = (isConnected: boolean) => {
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Sites" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Sites</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.total_sites}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Active Sites</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.active_sites}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Connected Sites</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.connected_sites}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Clicks</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.total_clicks}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters and Actions */}
                    <div className="bg-white shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                {/* Search and Filters */}
                                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search sites, users..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSearch}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Search
                                    </button>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link
                                        href={route('admin.user-sites.create')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Add New Site
                                    </Link>
                                </div>
                            </div>

                            {/* Bulk Actions */}
                            {selectedSites.length > 0 && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-blue-700">
                                            {selectedSites.length} site(s) selected
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleBulkStatusUpdate('Active')}
                                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                            >
                                                Mark Active
                                            </button>
                                            <button
                                                onClick={() => handleBulkStatusUpdate('Inactive')}
                                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                            >
                                                Mark Inactive
                                            </button>
                                            <button
                                                onClick={handleBulkDelete}
                                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sites Table */}
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <input
                                                type="checkbox"
                                                checked={selectedSites.length === sites.data.length && sites.data.length > 0}
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Site
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Connection
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Clicks
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Conversions
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sites.data.map((site) => (
                                        <tr key={site.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSites.includes(site.id)}
                                                    onChange={() => handleSelectSite(site.id)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-white">
                                                                {site.site_name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {site.site_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {site.site_url}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{site.user.name}</div>
                                                <div className="text-sm text-gray-500">{site.user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(site.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getConnectionBadge(site.is_connected)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {site.clicks}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {site.conversions}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(site.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('admin.user-sites.show', site.id)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('admin.user-sites.edit', site.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {sites.links && sites.links.length > 3 && (
                            <div className="px-6 py-3 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Showing {sites.meta.from} to {sites.meta.to} of {sites.meta.total} results
                                    </div>
                                    <div className="flex space-x-1">
                                        {sites.links.map((link, index) => (
                                            <button
                                                key={index}
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                className={`px-3 py-1 text-sm rounded ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : link.url
                                                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
