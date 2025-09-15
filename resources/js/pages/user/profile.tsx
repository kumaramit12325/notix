import { Head, usePage, router } from '@inertiajs/react'
import UserLayout from '@/layouts/user-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { Info, Save, RefreshCw, Copy, Trash2, Building2, CalendarDays, Phone, Mail } from 'lucide-react'

export default function UserProfile() {
  const { auth } = usePage().props as any;
  const user = auth?.user || {};
  const [changePassword, setChangePassword] = useState(false)
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [company, setCompany] = useState(user.company || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [address, setAddress] = useState(user.address || '')
  const [editOpen, setEditOpen] = useState(false)
  // Add more fields as needed

  return (
    <UserLayout breadcrumbs={[
      { title: 'User Dashboard', href: '/user-dashboard' },
      { title: 'Profile', href: '/user/profile' }
    ]}>
      <Head title="My Account" />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: My Account + API Key */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">My Account</CardTitle>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button size="sm" className="gap-2" onClick={() => {
                    router.patch(route('user.profile.update'), { name, email, phone }, { preserveScroll: true })
                  }}>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-3">
                    <Switch checked={changePassword} onCheckedChange={setChangePassword} />
                    <span className="font-medium">Change Password</span>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                {changePassword && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Current Password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="New Password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm Password" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          
          </div>
          {/* Right: Profile summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar_url || '/images/avatar-placeholder.jpg'} />
                    <AvatarFallback>{user.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="mt-4">
                    <div className="font-semibold text-lg">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                  <div className="mt-3">
                    <Badge variant="secondary">{user.plan || 'Free Plan'}</Badge>
                  </div>
                </div>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="font-medium">Company:</span> {company || 'N/A'}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="font-medium">Duration:</span> {user.start_date ? `${user.start_date} – ${user.end_date || 'Present'}` : 'N/A'}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="font-medium">Contact:</span> {phone || 'N/A'}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="font-medium">Address:</span> {address || 'N/A'}
                    </div>
                  </div>
                </div>
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <div className="mt-4 text-right text-sm text-muted-foreground">
                    <DialogTrigger asChild>
                      <Button variant="link" className="px-0">Edit</Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="edit-company">Company</Label>
                        <Input id="edit-company" value={company} onChange={e => setCompany(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="edit-phone">Contact No.</Label>
                        <Input id="edit-phone" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="edit-address">Address</Label>
                        <Input id="edit-address" value={address} onChange={e => setAddress(e.target.value)} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button>
                      <Button onClick={() => {
                        router.patch(route('user.profile.update'), { name, email, phone }, {
                          preserveScroll: true,
                          onSuccess: () => setEditOpen(false)
                        })
                      }} className="gap-2">
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
