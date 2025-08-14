import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import NextBundleAnalyzer from '@next/bundle-analyzer';
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});
export default withNextIntl(withBundleAnalyzer(nextConfig));
