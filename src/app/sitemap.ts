import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/projects/', '/experience/', '/contact/', ...projects.map((p) => `/projects/${p.slug}/`)];
  return pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly', priority: p === '/' ? 1 : 0.7 }));
}
