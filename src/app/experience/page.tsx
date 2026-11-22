import type { Metadata } from 'next';
import { Award, Download, GraduationCap } from 'lucide-react';
import { asset, certifications, education, experience, site } from '@/lib/site';

export const metadata: Metadata = { title: 'Experience & education', description: 'Professional experience, education and certifications of Rohith Mohan, Junior Software Engineer.' };

export default function ExperiencePage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 py-14">
          <div>
            <p className="eyebrow">// experience</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Experience & education</h1>
            <p className="mt-4 max-w-[60ch] text-lg text-fg-2">Professional experience is listed separately from the independent projects in this portfolio.</p>
          </div>
          <a href={asset(site.cv)} className="btn btn-primary" download><Download size={18} aria-hidden /> Download CV (PDF)</a>
        </div>
      </section>
      <section className="wrap grid gap-14 py-14 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">Professional experience</h2>
          <ol className="mt-8 space-y-10 border-l-2 border-line pl-7">
            {experience.map((e) => (
              <li key={e.org} className="relative">
                <span className="absolute -left-[37px] top-1 h-5 w-5 rounded-full border-4 border-bg bg-accent" aria-hidden />
                <p className="font-mono text-sm text-accent">{e.period || 'Internship'}</p>
                <h3 className="mt-1 text-xl font-semibold">{e.role}</h3>
                <p className="text-fg-2">{e.org} · {e.place}</p>
                {e.points.length > 0 && <ul className="mt-4 space-y-2 text-fg-2">{e.points.map((pt) => <li key={pt} className="flex gap-2"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fg-2" />{pt}</li>)}</ul>}
                {e.note && <p className="mt-3 text-sm text-muted">{e.note}</p>}
              </li>
            ))}
          </ol>
          <div className="card mt-10 p-5 text-sm text-fg-2">
            <p className="font-semibold text-fg">Independent projects</p>
            <p className="mt-1">The Employee Management API and the SQL Server HR database are independent learning projects. They are not employment work.</p>
          </div>
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold"><GraduationCap size={24} className="text-accent" aria-hidden /> Education</h2>
            <ul className="mt-6 space-y-4">{education.map((ed) => (
              <li key={ed.degree} className="card p-5"><p className="font-mono text-sm text-muted">{ed.period}</p><h3 className="mt-1 font-semibold">{ed.degree}</h3><p className="text-fg-2">{ed.school}</p>{ed.grade && <p className="mt-2 inline-block rounded-md bg-accent-soft px-2 py-0.5 text-sm font-semibold text-accent">{ed.grade}</p>}</li>
            ))}</ul>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold"><Award size={24} className="text-accent" aria-hidden /> Certifications</h2>
            <ul className="mt-6 divide-y divide-line rounded-2xl border border-line">{certifications.map((c) => <li key={c.name} className="px-5 py-3.5"><p className="font-medium">{c.name}</p><p className="text-sm text-muted">{c.issuer}</p></li>)}</ul>
          </div>
        </div>
      </section>
    </>
  );
}
