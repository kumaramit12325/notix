import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit3, Trash2, Play, Youtube } from 'lucide-react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface YouTubeChannel {
  id: number;
  title: string;
  domain: string;
  subscriber_count: string;
  created: string;
  logo: string;
}

interface Props {
  channel: YouTubeChannel;
}

const ShowYouTubeChannel: React.FC<Props> = ({ channel }) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this channel?')) {
      router.delete(`/youtubpush/${channel.id}`);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.get('/youtubpush')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">YouTube Channel Details</h1>
              <p className="text-gray-600 text-lg">
                View detailed information about the YouTube channel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Channel Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="h-6 w-6 text-red-600" />
                  Channel Information
                </CardTitle>
                <CardDescription>
                  Detailed information about the YouTube channel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Channel Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {channel.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{channel.title}</h2>
                    <p className="text-gray-600">Channel ID: {channel.id}</p>
                  </div>
                </div>

                {/* Channel Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Channel Title</label>
                    <p className="text-lg text-gray-900">{channel.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Domain</label>
                    <p className="text-lg text-gray-900">{channel.domain}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Subscriber Count</label>
                    <p className="text-lg text-gray-900 font-semibold">{channel.subscriber_count}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created Date</label>
                    <p className="text-lg text-gray-900">{channel.created}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => alert('Push notification feature coming soon!')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Send Push Notification
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.get(`/youtubpush/${channel.id}/edit`)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Channel
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Channel
                </Button>
              </CardContent>
            </Card>

            {/* Channel Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Channel Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subscribers</span>
                  <span className="font-semibold">{channel.subscriber_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domain</span>
                  <span className="font-semibold">{channel.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="text-green-600 font-semibold">Active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowYouTubeChannel;
