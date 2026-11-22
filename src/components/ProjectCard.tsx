import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { asset } from '@/lib/site';

export function ProjectCard({ p, featured = false }: { p: Project; featured?: boolean }) {
  const img = p.images[0];
  return (
    <Link href={`/projects/${p.slug}/`} className={`card group flex h-full flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-accent/60 ${featured ? 'md:flex-row' : ''}`}>
      <div className={`relative overflow-hidden border-b border-line bg-panel-2 ${featured ? 'md:w-1/2 md:border-b-0 md:border-r' : ''}`}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(img.src)} alt={img.alt} loading="lazy" className="aspect-[16/10] h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
        ) : (
          <pre className="code aspect-[16/10] h-full w-full overflow-hidden p-5 font-mono text-[11.5px] leading-relaxed opacity-90" aria-hidden>{p.snippets[0]?.code.split('\n').slice(0, 14).join('\n')}</pre>
        )}
        <span className={`absolute left-3 top-3 rounded-md px-2 py-1 font-mono text-[11px] font-medium ${p.kind === 'Independent project' ? 'bg-ok text-bg' : 'bg-accent text-accent-fg'}`}>{p.kind}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-start justify-between gap-3 text-xl font-semibold leading-snug group-hover:text-accent">{p.title}<ArrowUpRight size={20} className="mt-1 shrink-0 opacity-50 transition group-hover:opacity-100" aria-hidden /></h3>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{p.tagline}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">{p.stack.slice(0, featured ? 7 : 5).map((s) => <li key={s} className="chip">{s}</li>)}</ul>
      </div>
    </Link>
  );
}
