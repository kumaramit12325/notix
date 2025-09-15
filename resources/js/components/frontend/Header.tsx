import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href={route('home')} className="flex items-center space-x-2">
                                <div className="w-20 h-20 rounded-lg flex items-center justify-center">
                                    {/* <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg> */}
                                    <img src="./notix.jpg" alt="" />
                                </div>
                                <span className="text-2xl font-bold text-gray-900">Notix</span>
                            </Link>
                        </div>
                    </div>
<div className='flex items-center justify-between'>
                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href={route('home')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
                        <Link href={route('features')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Features</Link>
                        <Link href={route('pricing')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Pricing</Link>
                        <Link href={route('contact')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Contact</Link>
                        <Link href={route('buynow')}className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors" > Buy Now </Link>
                    </nav>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
