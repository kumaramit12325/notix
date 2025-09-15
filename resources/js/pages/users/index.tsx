import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
}

interface PaginationData {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Props {
    users: PaginationData;
}

export default function Users({ users }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(users.per_page.toString());

    const filteredUsers = users.data.filter((user: User) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'Admin':
                return 'bg-red-500 text-white';
            case 'User':
                return 'bg-blue-500 text-white';
            case 'Agent':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getStatusBadgeColor = (status: string) => {
        return status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white';
    };

    const handleDelete = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', userId));
        }
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(value);
        router.get(route('users.index'), { per_page: value }, { preserveState: true });
    };

    const handlePageChange = (url: string) => {
        router.get(url, { per_page: itemsPerPage }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            
            <div className="flex flex-col gap-6 p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Users List</h1>
                    <div className="flex items-center gap-4">
                        <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                        <Link href={route('users.create')}>
                            <Button className="bg-blue-500 hover:bg-blue-600">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Search Section */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Search users"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge className={getRoleBadgeColor(user.role)}>
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge className={getStatusBadgeColor(user.status)}>
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.created_at}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <Link href={route('users.show', user.id)}>
                                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                                    <Eye className="w-4 h-4 text-green-600" />
                                                </Button>
                                            </Link>
                                            <Link href={route('users.edit', user.id)}>
                                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                                    <Edit className="w-4 h-4 text-blue-600" />
                                                </Button>
                                            </Link>
                                            {user.role !== 'Admin' && (
                                            <Button 
                                                size="sm" 
                                                variant="outline" 
                                                className="h-8 w-8 p-0"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg">
                    <div className="text-sm text-gray-700">
                        Showing {users.from} to {users.to} of {users.total} results
                    </div>
                    <div className="flex items-center gap-2">
                        {users.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => link.url && handlePageChange(link.url)}
                                disabled={!link.url || link.active}
                                className={`px-3 py-1 text-sm rounded-md ${
                                    link.active
                                        ? 'bg-blue-500 text-white cursor-default'
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
        </AppLayout>
    );
}
