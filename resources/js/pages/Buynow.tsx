import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Header, Footer } from '@/components/frontend';
import Checkout from '@/components/frontend/Checkout';

export default function Buynow() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Buy Now - LaraPush">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <Header />

                <Checkout />


                <Footer />
            </div>
        </>
    );
}
