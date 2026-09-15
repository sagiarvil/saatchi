import { notFound } from 'next/navigation';
import legalData from '@/data/legal/legal-pages.json';

export function generateStaticParams() {
  return legalData.map((page) => ({
    slug: page.slug,
  }));
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = legalData.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-surface p-8 md:p-12 border border-border shadow-xl rounded-xl">
        <h1 className="text-3xl font-serif text-primary mb-8 border-b border-border pb-4">{page.title}</h1>
        <div 
          className="prose prose-invert prose-gold max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
