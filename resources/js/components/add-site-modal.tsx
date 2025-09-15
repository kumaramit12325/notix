import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload, Info } from 'lucide-react';

interface AddSiteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (formData: any) => void;
}

export function AddSiteModal({ isOpen, onClose, onSubmit }: AddSiteModalProps) {
    const [formData, setFormData] = useState({
        siteName: '',
        siteUrl: '',
        badgeIconUrl: '',
        notificationIconUrl: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        } else {
            console.log('Form data:', formData);
        }
        onClose();
    };

    const isFormValid = formData.siteName && formData.siteUrl;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <DialogTitle className="text-lg font-semibold">Add New Site</DialogTitle>
                        <Info className="h-4 w-4 text-gray-500" />
                    </div>
                    <DialogDescription className="sr-only">
                        Add a new website or application to your dashboard
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-2">
                    {/* Site Name */}
                    <div className="space-y-2">
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                            id="siteName"
                            placeholder="example.com"
                            value={formData.siteName}
                            onChange={(e) => handleInputChange('siteName', e.target.value)}
                        />
                    </div>

                    {/* Site URL */}
                    <div className="space-y-2">
                        <Label htmlFor="siteUrl">Site Url</Label>
                        <Input
                            id="siteUrl"
                            placeholder="https://example.com"
                            value={formData.siteUrl}
                            onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                        />
                    </div>

                    {/* Badge Icon URL */}
                    <div className="space-y-2">
                        <Label htmlFor="badgeIconUrl">Badge Icon Url</Label>
                        <Input
                            id="badgeIconUrl"
                            placeholder="https://example.com/image.badge.jpeg"
                            value={formData.badgeIconUrl}
                            onChange={(e) => handleInputChange('badgeIconUrl', e.target.value)}
                        />
                    </div>

                    {/* Notification Icon Upload Section */}
                    <div className="space-y-3">
                        <Label>Notification Icon Url</Label>

                        {/* Upload Area */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Upload className="h-6 w-6 text-gray-500" />
                                </div>
                                <div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Upload Image</p>
                                        <p className="text-xs text-gray-500">
                                            Recommended: Square image with dimensions in pixels (e.g. 192x192).<br />
                                            Acceptable formats: JPG, JPEG, PNG, GIF, WEBP, AVIF.<br />
                                            File size should be up to 2 MB. Please note that animations are not supported.
                                        </p>
                                    </div>
                                    <div>
                                        <Button variant="outline" size="sm" className="mt-2">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload Image
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* URL Input for Notification Icon */}
                        <Input
                            placeholder="Or enter notification icon URL"
                            value={formData.notificationIconUrl}
                            onChange={(e) => handleInputChange('notificationIconUrl', e.target.value)}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isFormValid}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Add Site
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
