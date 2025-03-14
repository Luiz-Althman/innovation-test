import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
    return (
        <header className="flex-1 bg-green-innovation p-6">
            <div className="md:max-w-screen-lg md:mx-auto md:px-6 flex justify-center md:justify-between items-center">
                <Link
                    href="/dashboard"
                    className="text-xl text-white hidden md:block"
                >
                    Innovation Brindes
                </Link>
                <nav className="flex items-center gap-5">
                    <Link href="/" className="relative">
                        <Mail className="text-white" />
                        <div className="rounded-full bg-white absolute bottom-3 left-4 text-[10px] p-1">
                            11
                        </div>
                    </Link>
                    <Link href="/" className="relative">
                        <Phone className="text-white" />
                        <div className="rounded-full bg-white absolute bottom-3 left-4 text-[10px] p-1">
                            11
                        </div>
                    </Link>
                    <div className="flex items-center justify-center gap-4">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-green-innovation border border-white/50 text-white">
                                IB
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-white">
                            <p className="text-md">Innovation Brindes</p>
                            <p className="text-xs">
                                {new Date().toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
