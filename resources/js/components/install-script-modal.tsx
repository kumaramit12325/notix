import { useState } from 'react'
import { usePage } from '@inertiajs/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check, Copy, Download, Globe } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface InstallScriptModalProps {
  isOpen: boolean
  onClose: () => void
  site: {
    id: number
    site_name: string
    site_url: string
  }
}

export function InstallScriptModal({ isOpen, onClose, site }: InstallScriptModalProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(1)
  const { props } = usePage()
  const vapidPublicKey = (props as any).vapidPublicKey || ''

  const appId = `${site.id}-${site.site_name.toLowerCase().replace(/[^a-z0-9]/g, '')}`
  const alertwiseUrl = window.location.origin
  
  const headScript = `<script src="${alertwiseUrl}/js/alertwise.js"></script>
<script type="text/javascript">
  alertwise = window.alertwise || {};
  alertwise.push(['init', {
    appId: "${appId}",
    apiUrl: "${alertwiseUrl}",
    serviceWorkerUrl: "/service-worker.js",
    vapidPublicKey: "${vapidPublicKey}"
  }]);
  
  // Request notification permission
  alertwise.push(['requestPermission']);
</script>`

  const handleCopy = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const handleDownloadServiceWorker = () => {
    const blob = new Blob([serviceWorkerContent], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'service-worker.js'
    a.click()
    URL.revokeObjectURL(url)
  }

  const serviceWorkerContent = `// Service Worker for ${site.site_name}
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'New notification',
    icon: data.icon || '/icon.png',
    badge: data.badge || '/badge.png',
    data: data.url ? { url: data.url } : {}
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">{site.site_name}</DialogTitle>
            <div className="text-sm text-green-600 font-medium">
              APP ID: {appId}
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              Any Site
            </Button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">Alertwise Manual Setup</h3>
            <p className="text-sm text-muted-foreground">
              Manual setup for all type of websites
            </p>
          </div>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-6">
              {/* Step 1: Include JS Code */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} text-sm font-semibold`}>
                    {activeStep > 1 ? <Check className="h-4 w-4" /> : '1'}
                  </div>
                  <h4 className="font-semibold">Include JS Code</h4>
                </div>
                
                <p className="text-sm text-muted-foreground ml-9">
                  1. Copy the code below into the <code className="bg-gray-100 px-1 rounded">&lt;head&gt;</code> section of your website.
                </p>

                <div className="ml-9 relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{headScript}</code>
                  </pre>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy(headScript, 1)}
                  >
                    {copiedStep === 1 ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copiedStep === 1 ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Step 2: Download Service Worker */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} text-sm font-semibold`}>
                    {activeStep > 2 ? <Check className="h-4 w-4" /> : '2'}
                  </div>
                  <h4 className="font-semibold">Download service-worker.js</h4>
                </div>

                <div className="ml-9">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleDownloadServiceWorker}
                  >
                    <Download className="h-4 w-4" />
                    Download service-worker.js
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Place this file in the root directory of your website.
                  </p>
                </div>
              </div>

              {/* Step 3: Verify */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${activeStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} text-sm font-semibold`}>
                    {activeStep > 3 ? <Check className="h-4 w-4" /> : '3'}
                  </div>
                  <h4 className="font-semibold">Verify</h4>
                </div>

                <div className="ml-9">
                  <Button
                    onClick={() => {
                      setActiveStep(3)
                      alert('Verification will check if the script is properly installed on your website.')
                    }}
                  >
                    Verify Installation
                  </Button>
                </div>
              </div>

              <div className="ml-9 mt-4 p-3 bg-blue-50 text-blue-800 rounded text-sm">
                <strong>Note:</strong> Changes may take some time to reflect.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
