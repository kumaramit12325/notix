import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Youtube } from 'lucide-react';
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

const EditYouTubeChannel: React.FC<Props> = ({ channel }) => {
  const [formData, setFormData] = useState({
    title: channel.title,
    domain: channel.domain,
    subscriber_count: channel.subscriber_count,
    logo: channel.logo
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(`/youtubpush/${channel.id}`, formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
              <h1 className="text-3xl font-bold text-gray-900">Edit YouTube Channel</h1>
              <p className="text-gray-600 text-lg">
                Update the YouTube channel information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="h-6 w-6 text-red-600" />
              Edit YouTube Channel Information
            </CardTitle>
            <CardDescription>
              Update the details below to modify the YouTube channel information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Channel Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Channel Title *</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter channel title (e.g., Kommune India)"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  The name of your YouTube channel
                </p>
              </div>

              {/* Domain */}
              <div className="space-y-2">
                <Label htmlFor="domain">Domain *</Label>
                <select
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All</option>
                  <option value="example.com">example.com</option>
                  <option value="demo.com">demo.com</option>
                  <option value="test.com">test.com</option>
                </select>
                <p className="text-sm text-gray-500">
                  Select the domain for this channel
                </p>
              </div>

              {/* Subscriber Count */}
              <div className="space-y-2">
                <Label htmlFor="subscriber_count">Subscriber Count *</Label>
                <Input
                  id="subscriber_count"
                  name="subscriber_count"
                  type="text"
                  placeholder="e.g., 1.5K, 2.3M, 500"
                  value={formData.subscriber_count}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  Current subscriber count of your YouTube channel
                </p>
              </div>

              {/* Channel Logo */}
              <div className="space-y-2">
                <Label htmlFor="logo">Channel Logo Initial</Label>
                <Input
                  id="logo"
                  name="logo"
                  type="text"
                  placeholder="e.g., K for Kommune"
                  value={formData.logo}
                  onChange={handleInputChange}
                  maxLength={10}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  Single letter or short text to represent your channel (optional)
                </p>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.get('/youtubpush')}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Update Channel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditYouTubeChannel;
