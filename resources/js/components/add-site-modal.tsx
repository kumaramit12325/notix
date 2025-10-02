import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload, Info, Loader2, CheckCircle2 } from 'lucide-react';

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
    
    const [badgePreview, setBadgePreview] = useState<string | null>(null);
    const [notificationPreview, setNotificationPreview] = useState<string | null>(null);
    const [uploadingBadge, setUploadingBadge] = useState(false);
    const [uploadingNotification, setUploadingNotification] = useState(false);
    
    const badgeInputRef = useRef<HTMLInputElement>(null);
    const notificationInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileUpload = async (file: File, type: 'badge' | 'notification') => {
        const setUploading = type === 'badge' ? setUploadingBadge : setUploadingNotification;
        const setPreview = type === 'badge' ? setBadgePreview : setNotificationPreview;
        
        setUploading(true);
        
        try {
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await fetch('/user-sites/upload-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                const fullUrl = window.location.origin + data.url;
                setFormData(prev => ({
                    ...prev,
                    [type === 'badge' ? 'badgeIconUrl' : 'notificationIconUrl']: fullUrl
                }));
                setPreview(fullUrl);
            } else {
                alert('Failed to upload image: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'badge' | 'notification') => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file, type);
        }
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

                    {/* Badge Icon Upload/URL */}
                    <div className="space-y-3">
                        <Label>Badge Icon</Label>
                        
                        {badgePreview ? (
                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <img src={badgePreview} alt="Badge preview" className="w-12 h-12 rounded object-cover" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Image uploaded</p>
                                    <p className="text-xs text-gray-500 truncate">{formData.badgeIconUrl}</p>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setBadgePreview(null);
                                        setFormData(prev => ({ ...prev, badgeIconUrl: '' }));
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Upload className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div className="text-xs text-gray-500">Square image recommended (e.g. 96x96px)</div>
                                        <input
                                            ref={badgeInputRef}
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif"
                                            onChange={(e) => handleFileSelect(e, 'badge')}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => badgeInputRef.current?.click()}
                                            disabled={uploadingBadge}
                                        >
                                            {uploadingBadge ? (
                                                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading...</>
                                            ) : (
                                                <><Upload className="h-4 w-4 mr-2" />Upload Image</>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                <Input
                                    placeholder="Or enter badge icon URL"
                                    value={formData.badgeIconUrl}
                                    onChange={(e) => handleInputChange('badgeIconUrl', e.target.value)}
                                />
                            </>
                        )}
                    </div>

                    {/* Notification Icon Upload Section */}
                    <div className="space-y-3">
                        <Label>Notification Icon</Label>

                        {notificationPreview ? (
                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <img src={notificationPreview} alt="Notification preview" className="w-12 h-12 rounded object-cover" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Image uploaded</p>
                                    <p className="text-xs text-gray-500 truncate">{formData.notificationIconUrl}</p>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setNotificationPreview(null);
                                        setFormData(prev => ({ ...prev, notificationIconUrl: '' }));
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <>
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
                                                <input
                                                    ref={notificationInputRef}
                                                    type="file"
                                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif"
                                                    onChange={(e) => handleFileSelect(e, 'notification')}
                                                    className="hidden"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="mt-2"
                                                    onClick={() => notificationInputRef.current?.click()}
                                                    disabled={uploadingNotification}
                                                >
                                                    {uploadingNotification ? (
                                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading...</>
                                                    ) : (
                                                        <><Upload className="h-4 w-4 mr-2" />Upload Image</>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Input
                                    placeholder="Or enter notification icon URL"
                                    value={formData.notificationIconUrl}
                                    onChange={(e) => handleInputChange('notificationIconUrl', e.target.value)}
                                />
                            </>
                        )}
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
