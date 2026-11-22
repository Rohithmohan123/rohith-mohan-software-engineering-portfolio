import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = { title: 'Projects', description: '.NET / C# API, SQL Server database and three rebuilt client websites, each with code, case study and links.' };

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="wrap py-14">
          <p className="eyebrow">// projects</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Project gallery</h1>
          <p className="mt-4 max-w-[66ch] text-lg text-fg-2">Five projects with source code and detailed case studies. Professional projects are client websites from my time as a Junior Software Engineer Trainee, rebuilt independently with sample content (no client code or data). Independent projects were created from scratch.</p>
        </div>
      </section>
      <section className="wrap py-14"><div className="grid gap-6 md:grid-cols-2">{projects.map((p) => <ProjectCard key={p.slug} p={p} />)}</div></section>
    </>
  );
}
