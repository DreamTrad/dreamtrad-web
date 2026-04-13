import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "hakgdmvyshpddpujhzmi.supabase.co",
    }],
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)