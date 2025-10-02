import { Head, router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import UserLayout from '@/layouts/user-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Grid2X2, RefreshCw, Trash2, Settings } from 'lucide-react'
import { AddSiteModal } from '@/components/add-site-modal'
import { InstallScriptModal } from '@/components/install-script-modal'

interface Site {
  id: number;
  site_name: string;
  site_url: string;
  badge_icon_url?: string;
  notification_icon_url?: string;
  status: string;
  is_connected: boolean;
  clicks: number;
  conversions: number;
  created_at: string;
}

interface DashboardProps {
  sites?: Site[];
}

export default function Dashboard({ sites = [] }: DashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSiteSubmit = (formData: any) => {
    router.post('/user-sites', formData, {
      onSuccess: (page) => {
        setIsModalOpen(false);
        setSuccessMessage('Site added successfully!');
        router.reload();
      },
      onError: (errors) => {
        console.error('Error adding site:', errors);
        alert('Error adding site. Please check the form and try again.');
      }
    });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleOpenInstallModal = (site: Site) => {
    setSelectedSite(site);
    setInstallModalOpen(true);
  };

  const handleToggleConnection = (siteId: number) => {
    router.post(`/user-sites/${siteId}/toggle-connection`, {}, {
      onSuccess: () => {
        router.reload();
      }
    });
  };

  const handleDeleteSite = (siteId: number) => {
    if (confirm('Are you sure you want to delete this site?')) {
      router.delete(`/user-sites/${siteId}`, {
        onSuccess: () => {
          router.reload();
        },
        onError: (errors) => {
          if (errors && errors.error === "Unauthorized") {
            alert("You are not authorized to delete this site.");
          } else {
            alert("Error deleting site. Please try again.");
          }
        }
      });
    }
  };

  return (
    <UserLayout breadcrumbs={[{ title: 'User Dashboard', href: '/user-dashboard' }]}>
      <Head title="User Dashboard" />
      <div className="p-6">
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {successMessage}
          </div>
        )}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Apps</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Existing sites */}
          {sites.map((site) => (
            <Card key={site.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {site.site_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{site.site_name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-[13px] mb-4">
                  {site.is_connected 
                    ? 'App is connected to AlertWise.' 
                    : 'App isn\'t connected to AlertWise. Click below to complete the setup.'
                  }
                </CardDescription>

                <div className="flex items-center gap-2">
                  {site.is_connected ? (
                    <Button 
                      size="sm" 
                      className="px-5 bg-blue-600 hover:bg-blue-700"
                      onClick={() => router.visit(`/sites/${site.id}/dashboard`)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      className="px-5"
                      onClick={() => handleOpenInstallModal(site)}
                    >
                      Install
                    </Button>
                  )}
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    className="h-9 w-9"
                    onClick={() => handleDeleteSite(site.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Clicks: {site.clicks} | Conversions: {site.conversions}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* New Website/App tile */}
          <div 
            className="border border-dashed rounded-md h-full min-h-[200px] flex items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={handleOpenModal}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full border flex items-center justify-center">
                <Grid2X2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">New Website/App</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Site Modal */}
      <AddSiteModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSiteSubmit}
      />

      {/* Install Script Modal */}
      {selectedSite && (
        <InstallScriptModal
          isOpen={installModalOpen}
          onClose={() => setInstallModalOpen(false)}
          site={selectedSite}
        />
      )}
    </UserLayout>
  )
}


