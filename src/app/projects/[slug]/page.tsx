import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Info } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';
import { Code } from '@/components/Code';
import { getProject, projects } from '@/data/projects';
import { asset, site } from '@/lib/site';

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.tagline, openGraph: { type: 'article', title: `${p.title} · ${site.name}`, description: p.tagline, url: `${site.url}/projects/${p.slug}/`, images: [{ url: `${site.url}/og/${p.slug}.jpg`, width: 1200, height: 630, alt: p.title }] }, twitter: { card: 'summary_large_image' } } : {};
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24 border-t border-line py-12"><h2 className="mb-5 text-2xl font-semibold">{title}</h2>{children}</section>;
}
const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5 text-fg-2">{items.map((x) => <li key={x} className="flex gap-2.5"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ok" aria-hidden />{x}</li>)}</ul>
);

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <article>
      <header className="border-b border-line">
        <div className="wrap py-12 md:py-16">
          <Link href="/projects/" className="flex w-max items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"><ArrowLeft size={16} aria-hidden /> All projects</Link>
          <p className={`mt-6 inline-block rounded-md px-2 py-1 font-mono text-xs font-medium ${p.kind === 'Independent project' ? 'bg-ok text-bg' : 'bg-accent text-accent-fg'}`}>{p.kind}</p>
          <h1 className="mt-3 max-w-[22ch] text-4xl font-bold leading-[1.08] sm:text-5xl">{p.title}</h1>
          <p className="mt-4 max-w-[66ch] text-lg text-fg-2">{p.tagline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {p.live && <a href={p.live} className="btn btn-primary" target="_blank" rel="noreferrer"><ExternalLink size={17} aria-hidden /> Live demo</a>}
            <a href={p.repo} className={`btn ${p.live ? 'btn-ghost' : 'btn-primary'}`} target="_blank" rel="noreferrer"><GithubIcon size={16} /> Source code</a>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {p.facts.map((f) => <div key={f.label} className="card px-4 py-3.5"><dt className="font-mono text-xs text-muted">{f.label}</dt><dd className="mt-1 font-display text-xl font-semibold">{f.value}</dd></div>)}
          </dl>
        </div>
      </header>

      <div className="wrap">
        <div role="note" className="mt-10 flex gap-3 rounded-2xl border border-line bg-panel p-5 text-sm text-fg-2">
          <Info size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <p><strong className="text-fg">Background.</strong> {p.origin}</p>
        </div>

        {p.images.length > 0 && (
          <div className={`mt-10 grid gap-4 ${p.images.length > 1 ? 'md:grid-cols-[1.4fr_1fr]' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(p.images[0].src)} alt={p.images[0].alt} className={`w-full rounded-xl border border-line bg-white ${p.images.length > 1 ? 'md:row-span-2 h-full object-cover object-top' : ''}`} />
            {p.images.slice(1).map((im) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={im.src} src={asset(im.src)} alt={im.alt} loading="lazy" className="w-full rounded-xl border border-line object-cover object-top" />
            ))}
          </div>
        )}

        <div className="grid gap-x-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <Section id="problem" title="Problem">
              <p className="max-w-[70ch] text-[17px] leading-relaxed text-fg-2">{p.problem}</p>
            </Section>
            <Section id="approach" title="Approach">
              <ol className="space-y-4">
                {p.approach.map((a, n) => <li key={a} className="flex gap-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent">{n + 1}</span><span className="text-fg-2">{a}</span></li>)}
              </ol>
            </Section>
            <Section id="features" title="Features"><Bullets items={p.features} /></Section>
            {p.snippets.length > 0 && (
              <Section id="code" title="Code highlights">
                <div className="space-y-8">{p.snippets.map((s) => <div key={s.title}><h3 className="mb-3 font-semibold">{s.title}</h3><Code s={s} /></div>)}</div>
                <a href={p.repo} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent hover:underline"><GithubIcon size={16} /> Read the full source on GitHub</a>
              </Section>
            )}
            <Section id="testing" title="Testing"><Bullets items={p.testing} /></Section>
            <Section id="deliverables" title="Deliverables & limitations">
              <div className="grid gap-8 md:grid-cols-2">
                <div><h3 className="mb-3 font-semibold">Deliverables</h3><Bullets items={p.deliverables} /></div>
                <div><h3 className="mb-3 font-semibold">Limitations</h3><ul className="space-y-2 text-fg-2">{p.limitations.map((l) => <li key={l} className="flex gap-2"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warn" />{l}</li>)}</ul></div>
              </div>
            </Section>
          </div>
          <aside className="border-t border-line py-12 lg:border-0">
            <div className="sticky top-24 space-y-6">
              <div className="card p-5">
                <h2 className="font-mono text-xs text-muted">architecture</h2>
                <ol className="mt-3 space-y-2">{p.architecture.map((a, n) => <li key={a} className="flex items-center gap-2 text-sm"><span className="font-mono text-xs text-accent">{String(n + 1).padStart(2, '0')}</span>{a}</li>)}</ol>
              </div>
              <div className="card p-5">
                <h2 className="font-mono text-xs text-muted">stack</h2>
                <ul className="mt-3 flex flex-wrap gap-1.5">{p.stack.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
              </div>
            </div>
          </aside>
        </div>

        <nav aria-label="More projects" className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}/`} className="card group p-5 hover:border-accent/60"><span className="flex items-center gap-1 text-xs text-muted"><ArrowLeft size={14} aria-hidden /> Previous</span><span className="mt-1 block font-semibold group-hover:text-accent">{prev.title}</span></Link>
          <Link href={`/projects/${next.slug}/`} className="card group p-5 text-right hover:border-accent/60"><span className="flex items-center justify-end gap-1 text-xs text-muted">Next <ArrowRight size={14} aria-hidden /></span><span className="mt-1 block font-semibold group-hover:text-accent">{next.title}</span></Link>
        </nav>
      </div>
    </article>
  );
}
