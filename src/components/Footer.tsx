import Link from 'next/link';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { site } from '@/lib/site';
import { projects } from '@/data/projects';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-fg-2">{site.positioning}</p>
          <p className="mt-3 text-sm text-muted">{site.location} · {site.availability}</p>
          <div className="mt-5 flex gap-2">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-lg border border-line hover:border-accent"><GithubIcon /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-lg border border-line hover:border-accent"><LinkedinIcon /></a>
            {site.email && <a href={`mailto:${site.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-lg border border-line hover:border-accent"><Mail size={18} /></a>}
          </div>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs text-muted">projects/</p>
          <ul className="space-y-2 text-sm">{projects.map((p) => <li key={p.slug}><Link href={`/projects/${p.slug}/`} className="text-fg-2 hover:text-accent">{p.title.split(' – ')[0]}</Link></li>)}</ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs text-muted">site/</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/experience/" className="text-fg-2 hover:text-accent">Experience & education</Link></li>
            <li><Link href="/contact/" className="text-fg-2 hover:text-accent">Contact</Link></li>
          </ul>
        </div>
      </div>
      <p className="wrap border-t border-line py-5 text-xs text-muted">© {new Date().getFullYear()} {site.name}. Client projects were developed at Elif Consultancy & Services; independent projects are labelled as such.</p>
    </footer>
  );
}
