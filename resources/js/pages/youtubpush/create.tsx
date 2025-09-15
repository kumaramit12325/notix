import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Youtube, Info, Chrome, Camera, Calendar, X } from 'lucide-react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const CreateYouTubeChannel: React.FC = () => {
  const [formData, setFormData] = useState({
    audience: 'Manual',
    channelUrl: '',
    videoType: 'All Videos',
    subscriptionDateRange: '01-01-1999 - 01-01-2100'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/youtubpush', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.get('/youtubpush')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">Add YouTube Channel</h1>
            </div>
            <div className="text-sm text-blue-600">
              Home / YouTube / Create
            </div>
          </div>
        </div>

        {/* Alert Message */}
        <div className="mb-6">
          <div className="bg-red-500 text-white px-4 py-3 rounded-md flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-500 text-sm font-bold">!</span>
            </div>
            <span>Note: This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.</span>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Left Section - Form */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Audience Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium">Audience</Label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="audience-all"
                          name="audience"
                          value="All"
                          checked={formData.audience === 'All'}
                          onChange={(e) => handleRadioChange('audience', e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor="audience-all" className="text-sm">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="audience-manual"
                          name="audience"
                          value="Manual"
                          checked={formData.audience === 'Manual'}
                          onChange={(e) => handleRadioChange('audience', e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor="audience-manual" className="text-sm">Manual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="audience-segmentation"
                          name="audience"
                          value="Segmentation"
                          checked={formData.audience === 'Segmentation'}
                          onChange={(e) => handleRadioChange('audience', e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor="audience-segmentation" className="text-sm">Segmentation</Label>
                      </div>
                    </div>
                  </div>

                  {/* Targeting Fields - Only show when Manual is selected */}
                  {formData.audience === 'Manual' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        {/* Domains */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Domains</Label>
                          <div className="relative">
                            <Input
                              placeholder="Select domains"
                              className="pr-8"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                x All Domains
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Countries */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Countries</Label>
                          <div className="relative">
                            <Input
                              placeholder="Select countries"
                              className="pr-8"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                x All Countries
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* State */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">State</Label>
                          <div className="relative">
                            <Input
                              placeholder="Select states"
                              className="pr-8"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                x All States
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Devices */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Devices</Label>
                          <div className="relative">
                            <Input
                              placeholder="Select devices"
                              className="pr-8"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                x All Devices
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Operating Systems */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Operating Systems</Label>
                          <div className="relative">
                            <Input
                              placeholder="Select OS"
                              className="pr-8"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                x All Operating Systems
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Browsers */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Browsers</Label>
                          <div className="relative">
                            <Input
                              placeholder="Select browsers"
                              className="pr-8"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                x All Browsers
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subscription Date Range */}
                  {/* <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Show youtubePush to users, who subscribed
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        name="subscriptionDateRange"
                        value={formData.subscriptionDateRange}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Select date range"
                      />
                    </div>
                  </div> */}

                  {/* YouTube Channel URL Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium">YouTube Channel URL</Label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex gap-2">
                      <Input
                        name="channelUrl"
                        type="url"
                        placeholder="https://www.youtube.com/@channel_name"
                        value={formData.channelUrl}
                        onChange={handleInputChange}
                        className="flex-1"
                      />
                      <Button type="button" variant="default" className="bg-blue-600 hover:bg-blue-700">
                        Validate
                      </Button>
                    </div>
                  </div>

                  {/* Video Type Section */}
                  <div className="space-y-3">
                    <div className="flex items-center  gap-2">
                      <Label className="text-sm font-medium">Video Type</Label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-2 flex gap-10 items-center">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="video-all"
                          name="videoType"
                          value="All Videos"
                          checked={formData.videoType === 'All Videos'}
                          onChange={(e) => handleRadioChange('videoType', e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor="video-all" className="text-sm">All Videos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="video-long"
                          name="videoType"
                          value="Long Videos"
                          checked={formData.videoType === 'Long Videos'}
                          onChange={(e) => handleRadioChange('videoType', e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor="video-long" className="text-sm">Long Videos (more than 1 minutes)</Label>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Preview */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Chrome className="h-4 w-4" />
                    <span>Chrome • Default • now ^</span>
                  </div>
                  
                  {/* Notification Content */}
                  <div className="space-y-3">
                    <div className="font-bold text-gray-900">[Title Here]</div>
                    <div className="text-gray-700">[Description Here]</div>
                  </div>
                  
                  {/* Thumbnail Placeholder */}
                  <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-8 max-w-7xl mx-auto">
          <Button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
            onClick={handleSubmit}
          >
            Add To YouTube Push
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateYouTubeChannel;
