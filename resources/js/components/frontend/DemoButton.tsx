import { DemoModal } from './index';
import { useDemoModal } from '@/hooks/use-demo-modal';

interface DemoButtonProps {
    className?: string;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
}

export default function DemoButton({ 
    className = '', 
    children = 'View Demo', 
    variant = 'primary' 
}: DemoButtonProps) {
    const { isOpen, openModal, closeModal } = useDemoModal();

    const getButtonClasses = () => {
        const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl';
        
        switch (variant) {
            case 'primary':
                return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white`;
            case 'secondary':
                return `${baseClasses} bg-gray-600 hover:bg-gray-700 text-white`;
            case 'outline':
                return `${baseClasses} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`;
            default:
                return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white`;
        }
    };

    return (
        <>
            <button 
                onClick={openModal}
                className={`${getButtonClasses()} ${className}`}
            >
                {children}
            </button>

            <DemoModal 
                isOpen={isOpen} 
                onClose={closeModal} 
            />
        </>
    );
}
