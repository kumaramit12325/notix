import { Head, usePage } from '@inertiajs/react'
import UserLayout from '@/layouts/user-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
    Settings, 
    Bell, 
    Shield, 
    Link, 
    Save,
    Eye,
    EyeOff,
    Key,
    Globe,
    Palette
} from 'lucide-react'
import React, { useState } from 'react';

export default function UserSettings() {
  const { auth } = usePage().props as any;
  const user = auth?.user || {};

  // General Settings State
  const [timezone, setTimezone] = useState('utc-5');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('usd');
  const [dateFormat, setDateFormat] = useState('mm-dd-yyyy');
  const [theme, setTheme] = useState('system');
  const [density, setDensity] = useState('comfortable');

  return (
    <UserLayout breadcrumbs={[
      { title: 'User Dashboard', href: '/user-dashboard' },
      { title: 'Settings', href: '/user/settings' }
    ]}>
      <Head title="User Settings" />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and configurations</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Account Preferences
                </CardTitle>
                <CardDescription>Basic account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc+0">UTC</SelectItem>
                        <SelectItem value="utc+5:30">India (UTC+5:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="inr">INR (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize your interface appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="density">Density</Label>
                    <Select value={density} onValueChange={setDensity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>Manage your email notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Receive promotional and marketing content</p>
                  </div>
                  <Switch id="marketing" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="updates">Product Updates</Label>
                    <p className="text-sm text-gray-500">Get notified about new features and updates</p>
                  </div>
                  <Switch id="updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="security">Security Alerts</Label>
                    <p className="text-sm text-gray-500">Important security notifications</p>
                  </div>
                  <Switch id="security" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newsletter">Newsletter</Label>
                    <p className="text-sm text-gray-500">Weekly newsletter and insights</p>
                  </div>
                  <Switch id="newsletter" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Configure push notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-marketing">Marketing Push</Label>
                    <p className="text-sm text-gray-500">Promotional push notifications</p>
                  </div>
                  <Switch id="push-marketing" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-updates">App Updates</Label>
                    <p className="text-sm text-gray-500">App and feature updates</p>
                  </div>
                  <Switch id="push-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-reminders">Reminders</Label>
                    <p className="text-sm text-gray-500">Important reminders and alerts</p>
                  </div>
                  <Switch id="push-reminders" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Password & Security
                </CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input id="currentPassword" type="password" placeholder="Enter current password" />
                    <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                    <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">Enable 2FA</Label>
                    <p className="text-sm text-gray-500">Use an authenticator app for 2FA</p>
                  </div>
                  <Switch id="2fa" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-2fa">SMS 2FA</Label>
                    <p className="text-sm text-gray-500">Receive codes via SMS</p>
                  </div>
                  <Switch id="sms-2fa" />
                </div>
                <Button variant="outline" className="w-full">
                  Configure 2FA
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Current Session</div>
                      <div className="text-sm text-gray-500">Chrome on Windows • Active now</div>
                    </div>
                    {/* <Badge className="bg-green-100 text-green-800">Current</Badge> */}
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Mobile Session</div>
                      <div className="text-sm text-gray-500">Safari on iPhone • 2 hours ago</div>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Revoke All Sessions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="w-5 h-5" />
                  Connected Services
                </CardTitle>
                <CardDescription>Manage your third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">G</span>
                    </div>
                    <div>
                      <div className="font-medium">Google Analytics</div>
                      <div className="text-sm text-gray-500">Connected • Last sync 2 hours ago</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold">M</span>
                    </div>
                    <div>
                      <div className="font-medium">Mailchimp</div>
                      <div className="text-sm text-gray-500">Connected • Last sync 1 day ago</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold">S</span>
                    </div>
                    <div>
                      <div className="font-medium">Slack</div>
                      <div className="text-sm text-gray-500">Not connected</div>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys for integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Marketing API Key</div>
                      <div className="text-sm text-gray-500">Created 2 months ago</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm" className="text-red-600">Revoke</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Analytics API Key</div>
                      <div className="text-sm text-gray-500">Created 1 month ago</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm" className="text-red-600">Revoke</Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Generate New API Key
                </Button>
              </CardContent>
            </Card> */}
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>
      </div>
    </UserLayout>
  )
}
