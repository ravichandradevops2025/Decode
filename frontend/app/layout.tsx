import './globals.css';

export const metadata = {
  title: 'Decode',
  description: 'Learning & Career Acceleration Platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-off-white text-slate-900">
        <main className="min-h-screen max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
