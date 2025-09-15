import { User } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-blue-700 text-white">
                <User className="size-5" />
            </div>
            <div className="mx-5 grid flex-1 text-left text-md">
                <span className="mb-0.5 truncate leading-tight font-semibold text-black hover:text-blue-900">Notix</span>
            </div>
        </>
    );
}
