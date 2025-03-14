import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '../globals.css';
import { DashboardProvider } from '@/context/DashboardContext';
import { Header } from '../(private)/(components)/Header';

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Innovation - Test',
    description: 'Innovation skills test',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.variable}  text-zinc-900 `}>
                <DashboardProvider>
                    <Header />
                    {children}
                </DashboardProvider>
            </body>
        </html>
    );
}
