import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Users, Clock, Cloud, MessageCircle, Facebook, Twitter, Linkedin, Mail, TrendingUp, BarChart3, PieChart, ShoppingCart, CreditCard, DollarSign, Calendar, BarChart, Clipboard, Sprout, ArrowRight } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
 
    },
];

// Sample data for charts
const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: 'rgb(147, 51, 234)',
            backgroundColor: 'rgba(147, 51, 234, 0.1)',
            tension: 0.4,
        },
        {
            label: 'Revenue',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: true,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4,
        },
    ],
};

const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Users',
            data: [12, 19, 3, 5, 2, 3, 7],
            backgroundColor: [
                'rgba(239, 68, 68, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(147, 51, 234, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(6, 182, 212, 0.8)',
            ],
            borderColor: [
                'rgba(239, 68, 68, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(147, 51, 234, 1)',
                'rgba(236, 72, 153, 1)',
                'rgba(6, 182, 212, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const pieChartData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
        {
            data: [300, 150, 100],
            backgroundColor: [
                'rgba(239, 68, 68, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(245, 158, 11, 0.8)',
            ],
            borderColor: [
                'rgba(239, 68, 68, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(245, 158, 11, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

interface DashboardProps {
    stats: {
        total_users: number;
        total_orders: number;
        total_payments: number;
        total_revenue: number;
        pending_orders: number;
        completed_orders: number;
        completed_payments: number;
        total_collected: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                
                {/* Top Section - Overall Summary with Blue Wave */}
                <div className="relative bg-gradient-to-b from-gray-100 to-white rounded-2xl overflow-hidden">
                    {/* Blue Wave Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-10"></div>
                    
                    {/* Wave SVG */}
                    <svg 
                        className="absolute bottom-0 left-0 w-full h-32 text-blue-500 opacity-20" 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none"
                    >
                        <path 
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                            fill="currentColor"
                        />
                    </svg>
                    
                    <div className="relative p-8 flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-2">All Time Collection</p>
                            <h2 className="text-4xl font-bold text-gray-800 mb-3">122 Subscribers</h2>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Sprout className="w-4 h-4 text-green-500" />
                                <span>You've been growing with LaraPush for 4 years and 6 months.</span>
                            </div>
                        </div>
                        
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                            View Statistics
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Statistics Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Today Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Today</h3>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-3xl font-bold text-gray-800">0</span>
                                    <span className="text-sm text-green-600 font-medium">+0.0%</span>
                                </div>
                                <p className="text-sm text-gray-600">100.00% of Yesterday's Collection</p>
                            </div>
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* This Week Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">This Week</h3>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-3xl font-bold text-gray-800">3</span>
                                    <span className="text-sm text-green-600 font-medium">+2.5%</span>
                                </div>
                                <p className="text-sm text-gray-600">20.00% of this Month's Collection</p>
                            </div>
                            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                                <BarChart className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* This Month Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">This Month</h3>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-3xl font-bold text-gray-800">15</span>
                                    <span className="text-sm text-green-600 font-medium">+12.3%</span>
                                </div>
                                <p className="text-sm text-gray-600">12.30% of this Year's Collection</p>
                            </div>
                            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Clipboard className="w-8 h-8 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Subscriber Count Table */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Daily Subscriber Count For Domain:</h1>
                        <div className="flex items-center gap-4">
                            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All</option>
                                <option>Domain 1</option>
                                <option>Domain 2</option>
                            </select>
                        </div>
                    </div>

                    {/* Table Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="flex items-center gap-2 mb-4 sm:mb-0">
                            <span className="text-sm text-gray-600">Show</span>
                            <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span className="text-sm text-gray-600">entries</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Search:</span>
                            <input 
                                type="text" 
                                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search..."
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-800">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-2">
                                            Date
                                            <div className="flex flex-col">
                                                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                                <svg className="w-3 h-3 text-gray-400 -mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-2">
                                            Desktop
                                            <div className="flex flex-col">
                                                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                                <svg className="w-3 h-3 text-gray-400 -mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-2">
                                            Mobile
                                            <div className="flex flex-col">
                                                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                                <svg className="w-3 h-3 text-gray-400 -mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-2">
                                            Total
                                            <div className="flex flex-col">
                                                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                                <svg className="w-3 h-3 text-gray-400 -mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">2025-07-31</td>
                                    <td className="px-6 py-4">3</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="px-6 py-4">3</td>
                                </tr>
                                <tr className="bg-gray-50 border-b border-gray-200 hover:bg-gray-100">
                                    <td className="px-6 py-4">2025-07-24</td>
                                    <td className="px-6 py-4">3</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="px-6 py-4">3</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">2025-07-21</td>
                                    <td className="px-6 py-4">2</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="px-6 py-4">2</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">2025-07-11</td>
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="px-6 py-4">1</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">2025-07-09</td>
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4">3</td>
                                    <td className="px-6 py-4">4</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">2025-07-07</td>
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4">2</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">2025-07-01</td>
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4">4</td>
                                    <td className="px-6 py-4">5</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">2025-06-30</td>
                                    <td className="px-6 py-4">3</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="px-6 py-4">3</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">2025-06-25</td>
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4">2</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">2025-06-23</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4">1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                        <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                            Showing 1 to 10 of 29 entries
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-1 text-sm text-white bg-blue-600 border border-blue-600 rounded hover:bg-blue-700">
                                1
                            </button>
                            <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                                3
                            </button>
                            <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Charts Section - Added at the bottom */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Line Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-800">Sales & Revenue Trend</h3>
                        </div>
                        <div className="h-64">
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 className="w-5 h-5 text-green-600" />
                            <h3 className="text-lg font-semibold text-gray-800">Weekly User Activity</h3>
                        </div>
                        <div className="h-64">
                            <Bar data={barChartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* Pie Chart Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pie Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <PieChart className="w-5 h-5 text-purple-600" />
                            <h3 className="text-lg font-semibold text-gray-800">Device Usage</h3>
                        </div>
                        <div className="h-64">
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
