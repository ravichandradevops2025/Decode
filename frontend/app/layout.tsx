import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Decode - Learn. Build. Earn. Get Referred.',
  description: 'Next-generation learning & career acceleration platform. Bridge the gap between learning and corporate readiness with hands-on projects, collaborative environments, and direct pathways to top companies.',
  keywords: 'learning platform, career acceleration, corporate training, skill development, referrals, decode',
  authors: [{ name: 'Decode Team' }],
  openGraph: {
    title: 'Decode - Learn. Build. Earn. Get Referred.',
    description: 'Transform your career with practical learning, real projects, and company referrals.',
    type: 'website',
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="bg-background text-text antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
