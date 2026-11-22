'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { asset, site } from '@/lib/site';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects/', label: 'Projects' },
  { href: '/experience/', label: 'Experience' },
  { href: '/contact/', label: 'Contact' }
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href.replace(/\/$/, '')));
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-mono text-[15px] font-medium" onClick={() => setOpen(false)}>
          <span className="text-accent">&lt;/&gt;</span><span className="font-display text-base font-semibold">rohith.mohan</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined}
                className={`rounded-md px-3 py-2 text-[15px] font-medium transition ${active(n.href) ? 'text-accent' : 'text-fg-2 hover:text-fg'}`}>{n.label}</Link>
            ))}
            <a href={asset(site.cv)} className="btn btn-primary ml-2 min-h-10 px-4 text-sm" download><Download size={16} aria-hidden /> CV</a>
          </nav>
          <ThemeToggle />
          <button type="button" className="grid h-10 w-10 place-items-center rounded-lg md:hidden" aria-expanded={open} aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-bg md:hidden">
          <div className="wrap flex flex-col py-3">
            {nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={`border-b border-line py-3 text-base font-medium ${active(n.href) ? 'text-accent' : ''}`}>{n.label}</Link>)}
            <a href={asset(site.cv)} className="btn btn-primary mt-4" download><Download size={16} aria-hidden /> Download CV</a>
          </div>
        </nav>
      )}
    </header>
  );
}
