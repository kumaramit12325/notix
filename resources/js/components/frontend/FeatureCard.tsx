export default function FeatureCard() {
   
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-6">
                        {/* Heading */}
                        <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                Features that make us{' '}
                                <span className="text-blue-600">unique.</span>
                            </h2>
                            <div className="w-16 h-1 bg-gray-900"></div>
                        </div>

                        {/* Description Text */}
                        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                            <p>
                                Your Websites needs a good push service. Dont get your self bounded with monthly charges and bills from other push services. Try Notix once 🔥
                            </p>
                        </div>
                    </div>

                    {/* Right Side - 3D Hand Illustration */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* 3D Hand Illustration using wow.png */}
                            <div className=" flex items-center justify-center w-full h-full ">
                                <img 
                                    src="/images/wow.png" 
                                    alt="3D Hand Illustration" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


