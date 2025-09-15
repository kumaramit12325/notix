export default function Footer() {
    return (
        <footer className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Notix Brand Information */}
                    <div className="lg:col-span-2">
                        {/* Logo and Brand */}
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-20 h-10 rounded-sm bg-white flex items-center justify-center">
                                {/* <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg> */}
                                 <img src="./notix.jpg" alt="" />
                            </div>
                            <span className="text-2xl font-bold">Notix™</span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-blue-100 mb-6 leading-relaxed max-w-md">
                            Notix is a self hosted push notification service. The USP of our brand is we provide a life time deal and you don't have to pay for it again.
                        </p>
                        
                        {/* Copyright */}
                        <p className="text-blue-200 text-sm mb-6">
                            ©Notix 2025. All rights reserved.
                        </p>
                        
                        {/* Decorative Pattern */}
                        {/* <div className="grid grid-cols-4 gap-2">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                            ))}
                        </div> */}
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Testimonials</a></li>
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Links</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Join Affiliate</a></li>
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Interviews</a></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Help</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Contact us</a></li>
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">How to buy</a></li>
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Docs</a></li>
                            <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Customer Support</a></li>
                        </ul>
                    </div>
                </div>

            
            </div>
        </footer>
    );
}
