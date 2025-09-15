import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import { Head } from '@inertiajs/react';
import SlidebarHome from '@/components/frontend/SlidebarHome';

export default function Contact() {
    return (
        <>
            <Head title="Contact Us" />
            <Header />
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left Column - Form */}
                            <div className="space-y-8">
                                {/* Heading */}
                                <div>
                                    <h1 className="text-4xl font-bold text-blue-900 mb-2">
                                        Fill the <span className="text-blue-600">Form.</span>
                                    </h1>
                                    <p className="text-xl text-gray-600">Its Easy.</p>
                                    <div className="w-16 h-0.5 bg-black mt-4"></div>
                                </div>

                                {/* Contact Form */}
                                <form className="space-y-6">
                                    {/* Top Section - Two Columns */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Row 1 */}
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="url"
                                                placeholder="Your Website Url"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2 - Two Columns */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <input
                                                type="tel"
                                                placeholder="Phone (With Country Code)"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Middle Section - Full Width Textarea */}
                                    <div>
                                        <textarea
                                            placeholder="Briefly tell us about anything you want to share ..."
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y"
                                        ></textarea>
                                    </div>

                                    {/* Bottom Section - Full Width Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 transform "
                                        >
                                            Proceed
                                        </button>
                                    </div>
                                </form>

                                {/* Bottom Text */}
                            </div>

                            {/* Right Column - Image */}
                            <div className="flex justify-center lg:justify-end">
                                <img
                                    src="/images/fill.png"
                                    alt="3D Hand Illustration"

                                    className=" h-auto object-contain"
                                />
                            </div>
                        </div>
                        <div className="text-center pt-8">
                            <span className="text-blue-900 text-2xl font-medium">or</span>
                        </div>

                        {/* Contact Sales Directly Section */}
                        <div className="max-w-6xl mx-auto pt-12">
                            <div className="text-left">
                                {/* Heading */}
                                <div className="mb-6">
                                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                        Contact Sales
                                    </h2>
                                    <h3 className="text-4xl font-bold text-blue-600 mb-2">
                                        Directly
                                    </h3>
                                    <div className="w-16 h-0.5 bg-black"></div>
                                </div>

                                {/* Introductory Text */}
                                <p className="text-gray-700 text-lg mb-8">
                                    You can contact us via these details aswell:
                                </p>

                                {/* Contact Details List */}
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <span className="text-gray-700 mr-3">•</span>
                                        <div>
                                            <span className="text-gray-700">Phone number: </span>
                                            <a href="tel:+919403891455" className="text-blue-600 hover:text-blue-800 font-medium">
                                                +91 9403891455
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <span className="text-gray-700 mr-3">•</span>
                                        <div>
                                            <span className="text-gray-700">Facebook: </span>
                                            <a href="https://m.me/thelarapush" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                                                m.me/thelarapush
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <span className="text-gray-700 mr-3">•</span>
                                        <div>
                                            <span className="text-gray-700">Email: </span>
                                            <a href="mailto:hello@larapush.com" className="text-blue-600 hover:text-blue-800 font-medium">
                                                hello@larapush.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <span className="text-gray-700 mr-3">•</span>
                                        <div>
                                            <span className="text-gray-700">Skype: </span>
                                            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                                                click here
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <span className="text-gray-700 mr-3">•</span>
                                        <div>
                                            <span className="text-gray-700">Address: </span>
                                            <span className="text-blue-600 font-medium">
                                                228, 2nd floor, OCAC Tower, Acharya Vihar, Bhubaneswar, Odisha - 751013
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Bottom CTA Buttons */}
                        <div className="mt-20 flex flex-col sm:flex-row gap-4 px-2 justify-between items-center">
                            <button className="w-full sm:w-auto px-8 py-3 text-b border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded-full font-semibold transition-colors">
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
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
