import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Info, TrendingUp, FolderOpen } from 'lucide-react';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsOverview: React.FC = () => {
  // Mock data for the chart
  const chartData = {
    labels: ['Aug 22', 'Aug 23', 'Aug 24', 'Aug 25', 'Aug 26', 'Aug 27', 'Aug 28', 'Aug 29'],
    datasets: [
      {
        label: 'New Subscribers',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        tension: 0.4,
      },
      {
        label: 'Unsubscribers',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#10B981',
        backgroundColor: '#10B981',
        tension: 0.4,
      },
      {
        label: 'Notifications Sent',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#6B7280',
        backgroundColor: '#6B7280',
        tension: 0.4,
      },
      {
        label: 'Sent(Subscribers)',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#F59E0B',
        backgroundColor: '#F59E0B',
        tension: 0.4,
      },
      {
        label: 'Delivered(Subscribers)',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#EF4444',
        backgroundColor: '#EF4444',
        tension: 0.4,
      },
      {
        label: 'Clicked',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#EC4899',
        backgroundColor: '#EC4899',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll create our own legend
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  const metrics = [
    {
      title: 'Total Subscribers',
      value: 0,
      change: 0,
    },
    {
      title: 'Total Notification',
      value: 0,
      change: 0,
    },
    {
      title: 'Delivered',
      value: 0,
      change: 0,
    },
    {
      title: 'Clicked',
      value: 0,
      change: 0,
    },
  ];

  const legendItems = [
    { color: '#3B82F6', label: 'New Subscribers' },
    { color: '#10B981', label: 'Unsubscribers' },
    { color: '#6B7280', label: 'Notifications Sent' },
    { color: '#F59E0B', label: 'Sent(Subscribers)' },
    { color: '#EF4444', label: 'Delivered(Subscribers)' },
    { color: '#EC4899', label: 'Clicked' },
  ];

  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <UserSidebarHeader breadcrumbs={[
          { title: 'App Dashboard', href: '/appdashboard/dashboard' },
          { title: 'Analytics Overview', href: '/appdashboard/overview' }
        ]} />
        <Head title="Analytics Overview" />
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">Analytics Overview</h1>
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Info className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-white border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    {metric.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {metric.value}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    {metric.change} vs prev 30 days
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap gap-4 items-center">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Chart Area */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="h-80">
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Last 7 Days: Aug 22, 2025 - Aug 29, 2025
              </div>
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Analytics Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-700">Date</TableHead>
                    <TableHead className="text-gray-700">Stats</TableHead>
                    <TableHead className="text-gray-700">New Subscribers</TableHead>
                    <TableHead className="text-gray-700">Unsubscribers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Empty state */}
                  <TableRow>
                    <TableCell colSpan={4} className="h-64">
                      <div className="flex flex-col items-center justify-center h-full">
                        <FolderOpen className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">No Data</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </AppContent>
    </AppShell>
  );
};

export default AnalyticsOverview;
