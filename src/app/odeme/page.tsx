import React from 'react';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import OdemeClient from './OdemeClient';

export const dynamic = 'force-dynamic';

export default async function OdemePage({ searchParams }: { searchParams: Promise<{ id?: string, slug?: string }> }) {
  const { id, slug } = await searchParams;
  
  const allWatches = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];
  let watch = null;
  
  if (id) {
    watch = allWatches.find(w => w.id === id);
  } else if (slug) {
    watch = allWatches.find(w => String(w.seoUrl || '').includes(slug));
  }

  if (!watch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center p-8">
           <h1 className="text-xl tracking-[0.2em] uppercase text-[#111111] mb-2">Ürün Bulunamadı</h1>
           <p className="text-sm text-[#111111]/50">Lütfen seçtiğiniz saati kontrol edip tekrar deneyiniz.</p>
        </div>
      </div>
    );
  }

  return <OdemeClient watch={watch} />;
}
