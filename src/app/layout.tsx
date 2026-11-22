import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.title} (.NET / C#, Web)`, template: `%s · ${site.name}` },
  description: 'Junior Software Engineer building web applications with C#, ASP.NET Core, SQL Server, TypeScript, HTML and CSS. Open to roles in Dubai and across the UAE.',
  keywords: ['Junior Software Engineer', 'Junior .NET Developer', 'C# Developer', 'ASP.NET Core', 'SQL Server', 'Frontend Developer', 'Web Developer', 'Dubai', 'UAE', 'Rohith Mohan'],
  authors: [{ name: site.name }],
  openGraph: { type: 'website', title: `${site.name} · ${site.title}`, description: '.NET / C#, SQL Server and frontend projects with code, case studies and live demos.', url: site.url, siteName: `${site.name} · Software portfolio` },
  twitter: { card: 'summary', title: `${site.name} · ${site.title}` },
  robots: { index: true, follow: true },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg` }
};

export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0a0e17' }, { media: '(prefers-color-scheme: light)', color: '#f7f8fb' }], width: 'device-width', initialScale: 1 };

// Applies the saved theme (dark by default) before first paint, so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t?t==='dark':true)}catch(e){document.documentElement.classList.add('dark')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: site.title, url: site.url, sameAs: [site.linkedin, site.github] }) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
