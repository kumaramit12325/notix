import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Header, Footer, CTASection, FeatureCard, Lifetime, FeaCart, AudienceCart, AutomationCart, Excellent, SlidebarHome } from '@/components/frontend';

export default function Features() {
    const { auth } = usePage<SharedData>().props;

 

    return (
        <>
            <Head title="Features - LaraPush">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-white">
                <Header />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                    <FeatureCard />
                    <Lifetime />
                    <FeaCart />
                    <AudienceCart />
                    <AutomationCart buttonText="Recommend a Feature" />
                    <Excellent />
                    
                {/* Bottom CTA Buttons */}
                <div className="mt-5 flex flex-col sm:flex-row gap-4 px-2 justify-between items-center">
                    <button className="w-full sm:w-auto  py-3 text-b border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded-full font-semibold transition-colors">
                        Pricing
                    </button>
                    <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors shadow-lg">
                        Demo
                    </button>
                    <button className="w-full sm:w-auto px-8 py-3 border-2  border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded-full font-semibold transition-colors">
                        Contact Sales
                    </button>
                </div>

                <SlidebarHome />
                </main>

                <Footer />
            </div>
        </>
    );
}
