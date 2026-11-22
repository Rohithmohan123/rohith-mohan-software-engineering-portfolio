import type { NextConfig } from 'next';

// Static export for GitHub Pages. NEXT_PUBLIC_BASE_PATH is set to "/<repo-name>" when building for
// a project site (see README); leave it empty for a custom domain or local preview.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true }
};

export default nextConfig;
