import type { Metadata } from 'next';
import { Download, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/BrandIcons';
import { ContactForm } from '@/components/ContactForm';
import { asset, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Rohith Mohan about junior .NET, software engineering and web development roles in the UAE.'
};

export default function ContactPage() {
  return (
    <section className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="eyebrow">// contact</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Let’s build something together</h1>
        <p className="mt-4 max-w-[52ch] text-lg text-ink-2">I am looking for junior .NET, software engineering, frontend and web development roles in the UAE and can start immediately.</p>
        <ul className="mt-8 space-y-4">
          <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent"><MapPin size={18} aria-hidden /></span>{site.location}</li>
          {site.email && <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent"><Mail size={18} aria-hidden /></span><a href={`mailto:${site.email}`} className="font-medium hover:text-accent">{site.email}</a></li>}
          <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent"><LinkedinIcon size={18} /></span><a href={site.linkedin} target="_blank" rel="noreferrer" className="font-medium hover:text-accent">linkedin.com/in/rohith-mohan-analyst</a></li>
          <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent"><GithubIcon size={18} /></span><a href={site.github} target="_blank" rel="noreferrer" className="font-medium hover:text-accent">github.com/Rohithmohan123</a></li>
        </ul>
        <a href={asset(site.cv)} className="btn btn-ghost mt-8" download><Download size={18} aria-hidden /> Download CV (PDF)</a>
      </div>
      <ContactForm email={site.email} linkedin={site.linkedin} />
    </section>
  );
}
