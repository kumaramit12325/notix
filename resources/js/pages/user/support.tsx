import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import UserLayout from '@/layouts/user-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Info, 
  Copy, 
  FileText, 
  Play, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube, 
  Send
} from 'lucide-react';

interface SupportTicket {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export default function SupportPage() {
  const { auth } = usePage().props as any;
  const user = auth?.user || {};
  const [ticket, setTicket] = useState({
    name: user.name || '',
    email: user.email || '',
    subject: '',
    description: ''
  });

  const [ticketId] = useState('AW-20250827-9135');

  const handleInputChange = (field: keyof SupportTicket, value: string) => {
    setTicket(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission logic
    console.log('Submitting ticket:', ticket);
  };

  const copyTicketId = () => {
    navigator.clipboard.writeText(ticketId);
    alert('Copied!');
  };

  const isFormValid = ticket.subject && ticket.description;

  return (
    <UserLayout breadcrumbs={[
      { title: 'User Dashboard', href: '/user-dashboard' },
      { title: 'Support', href: '/user/support' }
    ]}>
      <Head title="Quick Support" />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Quick Support</h1>
              <Info className="h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Support Ticket Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Submit Support Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={ticket.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Reply-to-Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={ticket.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={ticket.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="mt-1"
                        placeholder="Enter subject"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                        Describe Your Problem in Detail
                      </Label>
                      <Textarea
                        id="description"
                        value={ticket.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="mt-1 min-h-[120px] resize-y"
                        placeholder="Please describe your issue in detail..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full ${
                        isFormValid 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Raise Ticket
                    </Button>

                    {/* Ticket ID and Note */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        Kindly provide the following ID if requested by our support agent.
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-mono text-gray-900 bg-white px-3 py-1 rounded border">
                          {ticketId}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={copyTicketId}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        <strong>Note:</strong> Ticket resolution may take up to 48 hours, though our team will strive to resolve it as quickly as possible.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Documentation and Contact */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Documentation Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Alertwise Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Explore our comprehensive text and video documentation for quick and effective support.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        Documentation
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Videos
                      </Button>
                    </div>
                    <div className="mt-4">
                      <a 
                        href="mailto:support@alertwise.net" 
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <Mail className="h-4 w-4" />
                        Mail: support@alertwise.net
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Availability Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">We are available,</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Ticket</span>
                        <span className="text-sm font-medium text-gray-900">24X7</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Direct Mail</span>
                        <span className="text-sm font-medium text-gray-900">24X7</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Live Chat</span>
                        <span className="text-sm font-medium text-gray-900">12:30 AM GMT – 6:00 PM GMT</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Follow us on social media,</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
                      >
                        <Instagram className="h-5 w-5 text-white" />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <Facebook className="h-5 w-5 text-white" />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                      >
                        <Youtube className="h-5 w-5 text-white" />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                      >
                        <Send className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
