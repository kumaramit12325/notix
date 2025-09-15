import { useState } from 'react';
import { DemoModal } from './index';

export default function HeroSection() {
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

    const openDemoModal = () => setIsDemoModalOpen(true);
    const closeDemoModal = () => setIsDemoModalOpen(false);

    return (
        <div className="space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    Say <span className="text-red-600">'NO'</span> to{' '}
                    <span className="text-red-600">MONTHLY EXPENSES</span>
                    <br />
                    <span className="text-gray-900">For Sending Push Notifications</span>
                </h1>
            </div>

            {/* Description - Exact text from the image */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Notix is a self-hosted push notification panel that comes with a one-time cost and lets you add unlimited domains, collect unlimited subscribers and send unlimited campaigns for unlimited period of time.
            </p>

            {/* CTA Button */}
            <div>
                <button 
                    onClick={openDemoModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                >
                    View Demo Right Away!
                </button>
            </div>

            {/* Demo Modal */}
            <DemoModal 
                isOpen={isDemoModalOpen} 
                onClose={closeDemoModal} 
            />
        </div>
    );
}
