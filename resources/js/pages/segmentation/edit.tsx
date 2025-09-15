import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, HelpCircle, AlertTriangle } from 'lucide-react';

interface Condition {
    id: string;
    property: string;
    operator: string;
    value: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface SegmentationRule {
    id: number;
    user_id: number | null;
    name: string;
    domains: string;
    condition: string;
}

interface Props {
    segmentationRule: SegmentationRule;
    users: User[];
}

export default function SegmentationEdit({ segmentationRule, users }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: segmentationRule.name,
        domains: segmentationRule.domains,
        user_id: segmentationRule.user_id?.toString() || '',
        conditions: [] as any[]
    });

    const [conditions, setConditions] = useState<Condition[]>([]);

    const propertyOptions = [
        { value: 'url', label: 'Url' },
        { value: 'country', label: 'Country' },
        { value: 'state', label: 'State' },
        { value: 'city', label: 'City' },
        { value: 'device', label: 'Device' },
        { value: 'operating_system', label: 'Operating System' },
        { value: 'browser', label: 'Browser' },
        { value: 'referrer', label: 'Referrer' },
        { value: 'language', label: 'Language' },
        { value: 'timezone', label: 'Timezone' }
    ];

    const operatorOptions = [
        { value: 'contains', label: 'contains' },
        { value: 'equals', label: 'equals' },
        { value: 'starts_with', label: 'starts with' },
        { value: 'ends_with', label: 'ends with' },
        { value: 'not_contains', label: 'not contains' },
        { value: 'not_equals', label: 'not equals' }
    ];

    // Parse existing conditions from the database
    useEffect(() => {
        try {
            if (segmentationRule.condition) {
                const parsedConditions = JSON.parse(segmentationRule.condition);
                if (Array.isArray(parsedConditions)) {
                    const formattedConditions = parsedConditions.map((condition, index) => ({
                        id: Date.now().toString() + index,
                        property: condition.property || '',
                        operator: condition.operator || 'contains',
                        value: condition.value || ''
                    }));
                    setConditions(formattedConditions);
                }
            }
        } catch (error) {
            console.error('Error parsing conditions:', error);
        }
    }, [segmentationRule.condition]);

    const addCondition = () => {
        const newCondition: Condition = {
            id: Date.now().toString(),
            property: '',
            operator: 'contains',
            value: ''
        };
        setConditions([...conditions, newCondition]);
    };

    const removeCondition = (id: string) => {
        setConditions(conditions.filter(condition => condition.id !== id));
    };

    const updateCondition = (id: string, field: keyof Condition, value: string) => {
        setConditions(conditions.map(condition => 
            condition.id === id ? { ...condition, [field]: value } : condition
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Convert conditions to a format that can be sent with the form
        // Filter out empty conditions
        const conditionsData = conditions
            .filter(condition => condition.property && condition.value)
            .map(condition => ({
                property: condition.property,
                operator: condition.operator || 'contains',
                value: condition.value
            }));
        
        // Set the conditions data in the form
        setData('conditions', conditionsData);
        
        // Put the form to update
        put(`/segmentation/${segmentationRule.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Segmentation" />
            
            <div className="space-y-6 p-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Segmentation</h1>
                    </div>
                    <nav className="text-sm text-gray-500">
                        <span>Home / Segmentation / Edit</span>
                    </nav>
                </div>

                {/* Demo Server Alert */}
                <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        Note: This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content - Left Panel */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardContent className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Segment Name */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Label htmlFor="name" className="text-sm font-medium">Segment Name</Label>
                                            <HelpCircle className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter name"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Domains */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Label className="text-sm font-medium">Domains</Label>
                                            <HelpCircle className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <div className="flex space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="all"
                                                    checked={data.domains === 'All'}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) setData('domains', 'All');
                                                    }}
                                                />
                                                <Label htmlFor="all">All</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="selective"
                                                    checked={data.domains === 'Selective'}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) setData('domains', 'Selective');
                                                    }}
                                                />
                                                <Label htmlFor="selective">Selective</Label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Selection */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Label htmlFor="user_id" className="text-sm font-medium">Select User</Label>
                                            <HelpCircle className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <Select 
                                            value={data.user_id} 
                                            onValueChange={(value: string) => setData('user_id', value)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a user" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map((user) => (
                                                    <SelectItem key={user.id} value={user.id.toString()}>
                                                        {user.name} ({user.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.user_id && (
                                            <p className="text-sm text-red-500">{errors.user_id}</p>
                                        )}
                                    </div>

                                    {/* Extra Conditions */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Label className="text-sm font-medium">Extra Conditions (Optional)</Label>
                                                <HelpCircle className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <Button 
                                                type="button" 
                                                onClick={addCondition}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                Add Condition
                                            </Button>
                                        </div>

                                        {/* Conditions List */}
                                        {conditions.map((condition, index) => (
                                            <div key={condition.id} className="flex items-center space-x-2 p-3 border rounded-lg bg-gray-50">
                                                <Select 
                                                    value={condition.property} 
                                                    onValueChange={(value: string) => updateCondition(condition.id, 'property', value)}
                                                >
                                                    <SelectTrigger className="w-36">
                                                        <SelectValue placeholder="Select Property" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {propertyOptions.map((option) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                <Select 
                                                    value={condition.operator} 
                                                    onValueChange={(value: string) => updateCondition(condition.id, 'operator', value)}
                                                >
                                                    <SelectTrigger className="w-24">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {operatorOptions.map((option) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                <Input
                                                    type="text"
                                                    value={condition.value}
                                                    onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                                                    placeholder="Enter value"
                                                    className="flex-1"
                                                />

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeCondition(condition.id)}
                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end space-x-4 pt-6 border-t">
                                        <Button variant="outline" asChild>
                                            <Link href="/segmentation">Cancel</Link>
                                        </Button>
                                        <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                            Update
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel - Notification Estimate */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6">
                                <div className="text-center space-y-4">
                                    <p className="text-sm text-gray-600">
                                        Your notification in this segment will reach
                                    </p>
                                    <Button 
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                        size="lg"
                                    >
                                        Calculate Estimate
                                    </Button>
                                    <p className="text-xs text-gray-500">
                                        If your tokens count is huge, it might take time.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
