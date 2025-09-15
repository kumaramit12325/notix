import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Mail, Phone, User, Calendar, Shield } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'User Details',
        href: '/users/show',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    user: User;
}

export default function ShowUser({ user }: Props) {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User Details - ${user.name}`} />
            
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
                    </div>
                     <div className="flex items-center gap-2">
                     <Link href={route('users.index')}>
                            <Button variant="outline" >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back to Users
                            </Button>
                        </Link>
                    <Link href={route('users.edit', user.id)}>
                        <Button className="bg-blue-500 hover:bg-blue-600">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                        </Button>
                    </Link>
                     </div>
                </div>

                {/* User Information Card */}
                <Card className="max-w-7xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            {user.name}
                        </CardTitle>
                        <CardDescription>
                            Complete user information and account details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    Basic Information
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <p className="font-medium">{user.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email Address</p>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Phone Number</p>
                                            <p className="font-medium">{user.phone || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    Account Information
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Role</p>
                                            <Badge className={getRoleBadgeColor(user.role)}>
                                                {user.role}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 text-gray-500 flex items-center justify-center">
                                            <div className={`w-2 h-2 rounded-full ${
                                                user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                                            }`}></div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <Badge className={getStatusBadgeColor(user.status)}>
                                                {user.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">User ID</p>
                                            <p className="font-medium">#{user.id}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className="mt-8 pt-6 border-t">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Account Timestamps
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Created At</p>
                                    <p className="font-medium">{user.created_at}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Last Updated</p>
                                    <p className="font-medium">{user.updated_at}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common actions for this user account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Link href={route('users.edit', user.id)}>
                                <Button variant="outline">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                </Button>
                            </Link>
                            <Button 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this user?')) {
                                        // Handle delete
                                    }
                                }}
                            >
                                Delete User
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
