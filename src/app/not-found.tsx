import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="wrap py-28 text-center">
      <p className="eyebrow justify-center">404</p>
      <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink-2">The page you are looking for does not exist.</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/" className="btn btn-primary">Home</Link><Link href="/projects/" className="btn btn-ghost">Projects</Link></div>
    </section>
  );
}
