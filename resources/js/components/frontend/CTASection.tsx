import { Link } from '@inertiajs/react';

interface CTASectionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export default function CTASection({ title, description, buttonText, buttonLink }: CTASectionProps) {
    return (
        <div className="text-center mt-16">
            <div className="bg-blue-50 rounded-2xl p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {title}
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    {description}
                </p>
                <Link
                    href={buttonLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl inline-block"
                >
                    {buttonText}
                </Link>
            </div>
        </div>
    );
}
