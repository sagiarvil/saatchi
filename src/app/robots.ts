import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin.html', '/vip-checkout', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot', 'Googlebot', 'Bingbot'],
        allow: '/',
        disallow: ['/admin', '/vip-checkout', '/api/'],
      },
    ],
    sitemap: [
      'https://saatchi.com.tr/sitemap.xml',
      'https://saatchi.com.tr/sitemaps/elite.xml',
      'https://saatchi.com.tr/sitemaps/watches.xml',
      'https://saatchi.com.tr/sitemaps/brands.xml',
      'https://saatchi.com.tr/sitemaps/pages.xml',
    ],
    host: 'https://saatchi.com.tr',
  };
}
