import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Header, Footer, HeroSection, SmartphoneDemo, Brand } from '@/components/frontend';
import PushNotification from '@/components/frontend/PushNotifiction';
import FeaCart from '@/components/frontend/FeaCart';
import AudienceCart from '@/components/frontend/AudienceCart';
import AutomationCart from '@/components/frontend/AutomationCart';
import MigrateSection from '@/components/frontend/MigrateSection';
import Faqs from '@/components/frontend/Faqs';
import StillSection from '@/components/frontend/StillSection';
import SlidebarHome from '@/components/frontend/SlidebarHome';


export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="LaraPush - Self-Hosted Push Notification Panel">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-white">
                <Header />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Section - Marketing Content */}
                        <HeroSection />

                        {/* Right Section - Smartphone */}
                        <SmartphoneDemo />
                    </div>
                        <PushNotification />
                        <Brand />
                        <FeaCart />
                        <AudienceCart />
                        <AutomationCart />
                        <MigrateSection />
                        <Faqs />
                        <StillSection />
                        <SlidebarHome />
                </main>

                <Footer />
            </div>
        </>
    );
}
