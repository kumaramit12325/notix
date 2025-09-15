import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface PdfDownloadDebugProps {
  url: string;
  filename: string;
  children?: React.ReactNode;
}

export function PdfDownloadDebug({ url, filename, children }: PdfDownloadDebugProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDownload = async (event: React.MouseEvent) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      console.log('Starting PDF download from:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log('Blob size:', blob.size, 'bytes');
      console.log('Blob type:', blob.type);

      if (blob.size === 0) {
        throw new Error('PDF file is empty');
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setStatus('success');
      console.log('PDF download completed successfully');
    } catch (error) {
      console.error('PDF download failed:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
      setStatus('error');
    }
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={handleDownload}
        disabled={status === 'loading'}
      >
        {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {status === 'success' && <CheckCircle className="mr-2 h-4 w-4 text-green-600" />}
        {status === 'error' && <AlertCircle className="mr-2 h-4 w-4 text-red-600" />}
        {status === 'idle' && <Download className="mr-2 h-4 w-4" />}
        {children || 'Download PDF'}
      </Button>
      
      {status === 'error' && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
      
      {status === 'success' && (
        <div className="text-sm text-green-600 bg-green-50 p-2 rounded-md">
          <strong>Success:</strong> PDF downloaded successfully!
        </div>
      )}
    </div>
  );
} 