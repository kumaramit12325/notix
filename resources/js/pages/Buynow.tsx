import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Header, Footer } from '@/components/frontend';
import Checkout from '@/components/frontend/Checkout';

interface PricingPlan {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    currency: string;
    billing_period: string | null;
    features: string[];
    is_active: boolean;
    is_featured: boolean;
    sort_order: number;
    cta_text: string;
}

interface BuynowProps {
    plans: PricingPlan[];
}

export default function Buynow() {
    const { auth, plans } = usePage<SharedData & BuynowProps>().props;

    return (
        <>
            <Head title="Buy Now - LaraPush">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <Header />

                <Checkout plans={plans || []} />


                <Footer />
            </div>
        </>
    );
}
