import DemoButton from "./DemoButton";
import { Link } from "@inertiajs/react";

export default function StillSection() {
   
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-6">
                        {/* Heading */}
                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Still Not{' '}
                                <span className="text-blue-600">Convinced</span>?
                            </h2>
                            <div className="w-16 h-1 bg-gray-300"></div>
                        </div>

                        {/* Description Text */}
                        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                            <p>
                                Our panel provided consistent results for many people, and there's no single reason not to use Notix.
                            </p>
                            <p>
                                If you've any questions, please don't hesitate to{' '}
                                <span className="font-bold">contact us</span>.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - 3D Hand Illustration */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* 3D Hand Illustration Placeholder */}
                            <div className="w-64 h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                                <div className="text-center">
                                    {/* Hand gesture emoji as placeholder */}
                                    <div className="text-7xl mb-2">🤙</div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        (Tap to Read: A Letter from our Founders)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Buttons */}
                <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <button className="w-full sm:w-auto px-8 py-3 text-b border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded-full font-semibold transition-colors">
                     <Link href={route('pricing')}>Pricing</Link>
                    </button>
                    <DemoButton   className="text-xl rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                        Demo                    
                         </DemoButton>
                   
                    <Link href={route('contact')} className="w-full sm:w-auto px-8 py-3 border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded-full font-semibold transition-colors">
                        Contact Sales
                    </Link>
                </div>
            </div>
        </section>
    );
}
