import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = { title: 'Projects', description: 'Three client websites and two independent learning projects (an API and a SQL Server database), each with code, case study and links.' };

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="wrap py-14">
          <p className="eyebrow">// projects</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Project gallery</h1>
          <p className="mt-4 max-w-[66ch] text-lg text-fg-2">Five projects with source code and detailed case studies. Client projects are websites I developed as a Junior Software Engineer at Elif Consultancy & Services. Independent projects were created from scratch.</p>
        </div>
      </section>
      <section className="wrap py-14"><div className="grid gap-6 md:grid-cols-2">{projects.map((p) => <ProjectCard key={p.slug} p={p} />)}</div></section>
    </>
  );
}
