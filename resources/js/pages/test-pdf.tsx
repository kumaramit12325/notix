import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PdfDownloadDebug } from '@/components/pdf-download-debug';
import { Download, FileText, AlertCircle } from 'lucide-react';

export default function TestPdf() {
  return (
    <AppLayout>
      <Head title="PDF Download Test" />
      
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">PDF Download Test</h1>
          <p className="text-muted-foreground">
            Test various PDF download scenarios to debug issues
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Basic PDF Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Test basic PDF generation with simple HTML content
              </p>
              <PdfDownloadDebug
                url="/test-pdf"
                filename="test-basic.pdf"
              >
                <Download className="mr-2 h-4 w-4" />
                Test Basic PDF
              </PdfDownloadDebug>
            </CardContent>
          </Card>

          {/* Error Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Error Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Test error handling with invalid URL
              </p>
              <PdfDownloadDebug
                url="/invalid-pdf-url"
                filename="test-error.pdf"
              >
                <Download className="mr-2 h-4 w-4" />
                Test Error Handling
              </PdfDownloadDebug>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Browser:</strong> {navigator.userAgent}</p>
              <p><strong>URL:</strong> {window.location.href}</p>
              <p><strong>Protocol:</strong> {window.location.protocol}</p>
              <p><strong>Host:</strong> {window.location.host}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 