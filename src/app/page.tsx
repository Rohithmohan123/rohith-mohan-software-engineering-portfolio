import Link from 'next/link';
import { ArrowRight, Briefcase, Download, GraduationCap, Layers, MapPin } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';
import { ProjectCard } from '@/components/ProjectCard';
import { Code } from '@/components/Code';
import { projects } from '@/data/projects';
import { asset, education, experience, site, stack, targetRoles } from '@/lib/site';

const heroSnippet = {
  title: 'Enquiry form (Angular)', lang: 'ts' as const, file: 'ASIDES.in · shared/enquiry-form.ts (condensed)',
  code: `submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  this.sending.set(true);
  this.api.sendEnquiry(this.form.getRawValue())
    .subscribe({
      next: () => this.sent.set(true),
      error: (err: HttpErrorResponse) =>
        this.showServerErrors(err)
    });
}`
};

const legend = { work: 'Used at work', project: 'Independent projects', both: 'Work + projects' } as const;

export default function Home() {
  const [api, ...rest] = projects;
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_srgb,var(--fg)_9%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000,transparent_80%)]" aria-hidden />
        <div className="wrap relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rise">
            <p className="eyebrow flex items-center gap-2"><MapPin size={14} aria-hidden /> Dubai, UAE · {site.availability.toLowerCase()}</p>
            <h1 className="mt-4 text-[42px] font-bold leading-[1.04] sm:text-5xl lg:text-6xl">
              Rohith Mohan
              <span className="mt-2 block text-accent">Junior Software Engineer</span>
            </h1>
            <p className="mt-3 font-mono text-[15px] text-fg-2">Angular · TypeScript · SQL · Frontend & Web</p>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-fg-2">
              I build responsive web front ends with Angular, TypeScript, HTML and CSS, connect them to REST APIs and design relational databases. As a Junior Software Engineer at Elif Consultancy & Services I delivered three client websites with designers and backend developers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects/" className="btn btn-primary">View projects <ArrowRight size={18} aria-hidden /></Link>
              <a href={asset(site.cv)} className="btn btn-ghost" download><Download size={18} aria-hidden /> Download CV</a>
              <a href={site.github} className="btn btn-ghost" target="_blank" rel="noreferrer"><GithubIcon size={16} /> GitHub</a>
            </div>
          </div>
          <div className="rise min-w-0 [animation-delay:120ms]"><Code s={heroSnippet} /></div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="wrap grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Briefcase, k: 'Junior Software Engineer', v: 'Elif Consultancy & Services, Kochi · 2023–2024' },
            { icon: Layers, k: '3 client websites', v: 'Delivered at Elif Consultancy, with live demos' },
            { icon: GraduationCap, k: 'MCA · GPA 8.7', v: 'CMS College of Science and Commerce' },
            { icon: MapPin, k: 'Targeting the UAE', v: 'Dubai, Abu Dhabi, Sharjah' }
          ].map(({ icon: Icon, k, v }) => (
            <div key={k} className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent"><Icon size={19} aria-hidden /></span>
              <div><p className="font-display font-semibold">{k}</p><p className="text-sm text-muted">{v}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">// selected work</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Projects</h2>
            <p className="mt-2 max-w-[64ch] text-fg-2">Client projects are websites I developed at Elif Consultancy & Services. Independent projects are learning projects, not employment work.</p>
          </div>
          <Link href="/projects/" className="btn btn-ghost">All projects <ArrowRight size={16} aria-hidden /></Link>
        </div>
        <div className="grid gap-6">
          <ProjectCard p={api} featured />
          <div className="grid gap-6 md:grid-cols-2">{rest.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      <section className="border-y border-line bg-panel py-20">
        <div className="wrap">
          <p className="eyebrow">// tech stack</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Technologies</h2>
          <p className="mt-2 text-fg-2">Marked by where I have used them, so the evidence behind each skill is clear.</p>
          <ul className="mt-5 flex flex-wrap gap-4 text-sm text-fg-2" aria-label="Legend">
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-accent" />{legend.work}</li>
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-ok" />{legend.project}</li>
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-accent to-ok" />{legend.both}</li>
          </ul>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {stack.map((g) => (
              <div key={g.group} className="rounded-2xl border border-line bg-bg p-6">
                <h3 className="font-semibold">{g.group}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((i) => (
                    <li key={i.name} className="flex items-center justify-between gap-3 text-[15px]">
                      <span>{i.name}</span>
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${i.where === 'work' ? 'bg-accent' : i.where === 'project' ? 'bg-ok' : 'bg-gradient-to-r from-accent to-ok'}`} title={legend[i.where]} aria-label={legend[i.where]} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap grid gap-12 py-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">// experience</p>
          <h2 className="mt-2 text-3xl font-semibold">Professional experience</h2>
          <div className="card mt-8 p-6">
            <p className="font-mono text-sm text-accent">{experience[0].period}</p>
            <h3 className="mt-1 text-xl font-semibold">{experience[0].role}</h3>
            <p className="text-fg-2">{experience[0].org} · {experience[0].place}</p>
            <ul className="mt-4 space-y-2 text-fg-2">{experience[0].points.map((p) => <li key={p} className="flex gap-2"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{p}</li>)}</ul>
          </div>
          <Link href="/experience/" className="mt-6 inline-flex items-center gap-1 font-semibold text-accent hover:underline">Full experience, education and certifications <ArrowRight size={16} aria-hidden /></Link>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold">Education</h3>
            <ul className="mt-3 space-y-3">{education.map((e) => <li key={e.degree} className="card p-4"><p className="font-medium">{e.degree}{e.grade && <> · <span className="text-accent">{e.grade}</span></>}</p><p className="text-sm text-muted">{e.school} · {e.period}</p></li>)}</ul>
          </div>
          <div>
            <h3 className="font-semibold">Roles I am targeting</h3>
            <ul className="mt-3 flex flex-wrap gap-2">{targetRoles.map((r) => <li key={r} className="chip">{r}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-accent/40 bg-accent-soft px-8 py-12 sm:px-12">
          <div>
            <h2 className="text-3xl font-semibold">Hiring a junior developer?</h2>
            <p className="mt-2 max-w-[52ch] text-fg-2">I am available immediately for junior software, frontend and web developer roles in Dubai, Abu Dhabi and Sharjah.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact/" className="btn btn-primary">Get in touch</Link>
            <a href={asset(site.cv)} className="btn btn-ghost" download><Download size={18} aria-hidden /> CV (PDF)</a>
          </div>
        </div>
      </section>
    </>
  );
}
