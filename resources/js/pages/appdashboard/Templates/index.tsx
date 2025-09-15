import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import AppDashboardSidebar from '@/components/appdashboard-sidebar';
import { AppContent } from '@/components/app-content';
import { UserSidebarHeader } from '@/components/user-sidebar-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const templates = [
  {
    id: 1,
    type: 'pro',
    title: '🎉 Weekend Mega Sale is LIVE!',
    message: 'Enjoy up to 70% OFF on all categories. Hurry, offer ends soon!',
    url: 'thedevelopershouse.com',
    image: '/images/mega-sale.png', // Placeholder, replace with actual image if needed
    button: 'Shop Now',
    badge: 'Pro',
    badgeColor: 'secondary',
    previewType: 'image',
  },
  {
    id: 2,
    type: 'free',
    title: '🛒 Buy 1 Get 1 Free - Limited Time!',
    message: 'Grab your favorites and get another one absolutely free. Ends tonight!',
    url: 'thedevelopershouse.com',
    button: 'Grab Now',
    badge: 'Free',
    badgeColor: 'default',
    previewType: 'text',
  },
  {
    id: 3,
    type: 'free',
    title: '🌙 Midnight Madness is ON!',
    message: 'Deals drop at 12 AM sharp. Get ready for jaw-dropping prices!',
    url: 'thedevelopershouse.com',
    button: 'Set Reminder',
    badge: 'Free',
    badgeColor: 'default',
    previewType: 'text',
  },
  {
    id: 4,
    type: 'free',
    title: '🔥 End of Season Clearance!',
    message: 'Up to 80% off on last season’s styles. While supplies last!',
    url: 'thedevelopershouse.com',
    button: 'Explore Deals',
    badge: 'Free',
    badgeColor: 'default',
    previewType: 'text',
  },
  {
    id: 5,
    type: 'free',
    title: '🎊 Festival Frenzy: Flat 60% OFF!',
    message: 'Celebrate the season with mega discounts. Don’t miss out!',
    url: 'thedevelopershouse.com',
    button: 'Celebrate Now',
    badge: 'Free',
    badgeColor: 'default',
    previewType: 'text',
  },
];

export default function TemplatesIndex() {
  return (
    <AppShell variant="sidebar">
      <AppDashboardSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden p-5">
        <UserSidebarHeader breadcrumbs={[{ title: 'App Dashboard', href: '/user/appdashboard/dashboard' }]} />
        <Head title="Push Engagement Templates" />
        <div className="p-6 w-full">
          <h1 className="text-3xl font-bold mb-2">Push Engagement Templates</h1>
          <p className="text-lg font-semibold mb-4 text-gray-700">Kickstart your push strategy with ready-to-use engagement templates by AlertWise</p>
          <p className="mb-8 text-gray-600 ">Get started with our expertly crafted push engagement templates. These predesigned message formats offer popular styles carefully curated by our experts. With custom UTM parameters for each style, you can track the performance and effectiveness of your push broadcasts. Effortlessly engage your audience and gain valuable insights into your communication strategy. It's never been easier to create impactful messages and measure their impact!</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-8 border">
            <div className="font-semibold text-lg mb-4">Promotions & Offers</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((tpl, idx) => (
                <Card key={tpl.id} className="relative">
                  {tpl.badge && (
                    <Badge variant={tpl.badgeColor as any} className="absolute top-3 right-3 z-10">{tpl.badge}</Badge>
                  )}
                  <CardContent className="flex flex-col items-center gap-3 pt-6 pb-4">
                    {/* Notification Preview */}
                    <div className="w-full flex flex-col items-center">
                      <div className="bg-white rounded-xl shadow-lg w-[340px] flex flex-col items-center p-4 border border-gray-100 relative">
                        {/* Browser bar */}
                        <div className="flex items-center gap-2 mb-2 w-full">
                          <img src="/images/rocket.png" alt="icon" className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-semibold text-gray-700 text-sm flex-1">Google Chrome</span>
                          <span className="text-gray-400 text-lg cursor-pointer">×</span>
                        </div>
                        {tpl.previewType === 'image' ? (
                          <img src="/images/wow.png" alt="Mega Sale" className="w-full h-32 object-cover rounded mb-2" />
                        ) : null}
                        <div className="w-full flex items-center gap-2 mt-2">
                          <img src="/images/rocket.png" alt="icon" className="w-10 h-10 rounded-full object-cover" />
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 text-sm mb-1">{tpl.title}</div>
                            <div className="text-gray-600 text-xs mb-1">{tpl.message}</div>
                            <div className="text-xs text-gray-400">{tpl.url}</div>
                          </div>
                        </div>
                        <div className="w-full flex flex-row gap-4 mt-4">
                          <Button className="flex-1" variant="outline">{tpl.button}</Button>
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition-all">Use Template</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <Separator className="my-2" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
