import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        website: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can add your form submission logic
        console.log('Form submitted:', formData);
        // Close modal after submission
        onClose();
        // Reset form
        setFormData({
            name: '',
            phone: '',
            email: '',
            website: ''
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-blue-800 mb-6">
                        One Step Away to view Demo!
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium">
                            Phone (With Country Code)
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Website Field */}
                    <div className="space-y-2">
                        <Label htmlFor="website" className="text-gray-700 font-medium">
                            Your Website Url
                        </Label>
                        <Input
                            id="website"
                            name="website"
                            type="url"
                            placeholder="www.Notix.com"
                            value={formData.website}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        View Now!
                    </Button>
                </form>

                {/* Pagination Dots */}
                <div className="flex justify-center space-x-2 mt-6">
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
