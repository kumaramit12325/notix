export default function SmartphoneDemo() {
    return (
        <div className="flex justify-center lg:justify-end">
            <div className="relative">
                {/* Smartphone Frame */}
                <div className="w-[300px] h-[500px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    <div className="w-full h-full bg-gray-900 rounded-[2.5rem] p-4 relative overflow-hidden" style={{ backgroundImage: "url('/images/iphone.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        {/* Phone Status Bar */}
                        <div className="flex justify-between items-center text-white text-sm mb-4">
                            <span className="font-medium">Virgin</span>
                            <div className="flex items-center space-x-1">
                                <div className="w-4 h-2 border border-white rounded-sm"></div>
                                <div className="w-4 h-2 border border-white rounded-sm"></div>
                                <div className="w-4 h-2 border border-white rounded-sm"></div>
                            </div>
                        </div>

                        {/* Phone Time and Date */}
                        <div className="text-center text-white mb-8">
                            <div className="text-3xl font-light">01:48</div>
                            <div className="text-sm text-gray-400">Wednesday 23 October</div>
                        </div>

                        {/* Push Notifications - Positioned to overlap phone edges */}
                        <div className="relative z-10">
                            {/* Top Notification - TrueSignal (positioned above phone) */}
                            <div className="absolute -top-4 -right-4 w-72 bg-white rounded-lg p-4 shadow-lg border border-gray-100">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM10 4a6 6 0 110 12 6 6 0 010-12z"/>
                                            <path d="M10 6a4 4 0 100 8 4 4 0 000-8zM10 8a2 2 0 110 4 2 2 0 010-4z"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">TRUESIGNAL</span>
                                            <span className="text-xs text-gray-500">30 min ago</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1 font-medium">
                                            Push Notification Monthly Bill !!
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Hey Dave, Your monthly TrueSignal payment is pending!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Notification - Notix (overlapping lower phone) */}
                            <div className="absolute bottom-4 -right-2 w-72 bg-white rounded-lg p-4 shadow-lg border border-gray-100">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">Notix</span>
                                            <span className="text-xs text-gray-500">10 min ago</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1 font-medium">
                                            Notix Purchase Successful 🎉
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Congratulations!! You no-longer have to pay monthly bill.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phone Shadow */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-black opacity-20 rounded-full blur-sm"></div>
            </div>
        </div>
    );
}
