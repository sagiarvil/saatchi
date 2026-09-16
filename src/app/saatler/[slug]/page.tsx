import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import ZoomImage from '@/components/ZoomImage';
import { getProxiedImageUrl } from '@/utils/imageProxy';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  let slugs = ['erkek', 'kadin', 'unisex']; // Category slugs
  const saatlerPath = path.join(process.cwd(), 'src/data/saatler.json');
  const elitPath = path.join(process.cwd(), 'src/data/elit-saatler.json');
  
  let allWatches: any[] = [];
  if (fs.existsSync(saatlerPath)) allWatches = [...allWatches, ...JSON.parse(fs.readFileSync(saatlerPath, 'utf8'))];
  if (fs.existsSync(elitPath)) allWatches = [...allWatches, ...JSON.parse(fs.readFileSync(elitPath, 'utf8'))];

  const watchSlugs = allWatches.map((w: any) => {
    const parts = w.seoUrl.split('/');
    return parts[parts.length - 1];
  });
  slugs = [...slugs, ...watchSlugs];

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function SaatlerPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const saatlerPath = path.join(process.cwd(), 'src/data/saatler.json');
  const elitPath = path.join(process.cwd(), 'src/data/elit-saatler.json');
  
  let allWatches: any[] = [];
  if (fs.existsSync(saatlerPath)) allWatches = [...allWatches, ...JSON.parse(fs.readFileSync(saatlerPath, 'utf8'))];
  if (fs.existsSync(elitPath)) allWatches = [...allWatches, ...JSON.parse(fs.readFileSync(elitPath, 'utf8'))];

  const watch = allWatches.find((w: any) => w.seoUrl.includes(slug));

  if (!watch) {
    return (
      <div className="bg-background min-h-screen border-t border-surface-border flex items-center justify-center">
        <h1 className="text-3xl text-foreground font-serif">Kategori / Saat Bulunamadı</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen border-t border-surface-border pb-20">
      <main className="px-4 sm:px-6 lg:px-8 pt-8">
        <article className="seo-prerender-pdp" style={{ maxWidth: '1200px', margin: '30px auto', padding: '24px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '18px', color: '#1F2937', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <nav className="pdp-crumbs" style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
            <Link href="/" style={{ color: '#065F46', textDecoration: 'none' }}>Ana Sayfa</Link> / <Link href="/saatler" style={{ color: '#065F46', textDecoration: 'none' }}>Lüks Saat Koleksiyonu</Link> / <span style={{ color: '#111827', fontWeight: 600 }}>{watch.modelName}</span>
          </nav>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', background: '#F9FAFB', padding: '20px', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ZoomImage src={getProxiedImageUrl(watch.image) || '/images/placeholder.jpg'} alt={watch.modelName} />
            </div>

            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ fontSize: '14px', color: '#065F46', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>{watch.brand}</span>
              <h1 style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.15, margin: 0, color: '#111827' }}>{watch.modelName}</h1>
              <p style={{ fontSize: '13px', color: '#065F46', margin: 0 }}>Kategori: {watch.category} • Durum: Sıfır Distribütör Garantili</p>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#065F46', margin: '8px 0' }}>{watch.price}</div>
              
              <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', padding: '12px 16px', margin: '4px 0 10px', fontSize: '13px', lineHeight: 1.5, color: '#92400E' }}>
                <strong style={{ color: '#065F46', display: 'block', marginBottom: '2px', fontSize: '13.5px' }}>📦 Özel Sipariş ile Temin Edilir</strong>
                <span style={{ color: '#374151' }}>Ürün, talebiniz üzerine özel olarak temin edilir. Güncel temin süresi için bizimle iletişime geçebilirsiniz.</span>
              </div>

              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#374151' }}>
                {watch.description || `${watch.modelName}, saat işçiliğinin zirve standardıdır. İsviçre manüfaktür mekanizma ve çizilmeye dayanıklı safir cam ile donatılmıştır.`}
              </p>

              <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/vip-checkout" style={{ background: '#0F766E', color: '#FFFFFF', fontWeight: 700, padding: '14px 28px', border: 'none', borderRadius: '10px', cursor: 'pointer', textAlign: 'center', flex: 1 }}>
                  Güvenli Satın Al
                </Link>
                <a href="https://wa.me/905419305372" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', color: '#111827', padding: '14px 24px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  WhatsApp İletişim
                </a>
              </div>
            </div>
          </div>
        
          {/* DETAILED DESCRIPTION SECTION */}
          <div style={{ marginTop: '40px', borderTop: '1px solid #E5E7EB', paddingTop: '32px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>Ürün Detayları & Teknik Özellikler</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div style={{ background: '#F9FAFB', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#065F46', marginBottom: '12px' }}>Teknik Spesifikasyonlar</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#4B5563', lineHeight: 1.8 }}>
                  <li style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '8px', marginBottom: '8px' }}><strong>Marka:</strong> {watch.brand}</li>
                  <li style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '8px', marginBottom: '8px' }}><strong>Koleksiyon:</strong> {watch.category || 'Belirtilmemiş'}</li>
                  <li style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '8px', marginBottom: '8px' }}><strong>Referans / Model:</strong> {watch.modelName}</li>
                  <li style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '8px', marginBottom: '8px' }}><strong>Mekanizma:</strong> {watch.mekanizma || 'Otomatik İsviçre Manüfaktür Kalibre'}</li>
                  <li style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '8px', marginBottom: '8px' }}><strong>Kasa Çapı:</strong> {watch.kasaCapi || 'Standart Kasa Çapı'}</li>
                  <li style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '8px', marginBottom: '8px' }}><strong>Kasa Materyali:</strong> {watch.kasaMateryali || 'Paslanmaz Çelik / Lüks Alaşım'}</li>
                  <li style={{ paddingBottom: '8px' }}><strong>Cam:</strong> {watch.cam || 'Çizilmeye Dayanıklı Safir Cam'}</li>
                </ul>
              </div>
              <div style={{ background: '#F9FAFB', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#065F46', marginBottom: '12px' }}>Garanti ve Teslimat Koşulları</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#4B5563', lineHeight: 1.8 }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ color: '#059669', marginTop: '2px' }}>✓</span>
                    <div>
                      <strong style={{ display: 'block', color: '#111827' }}>Uluslararası Garanti</strong>
                      <span>%100 Orijinal, Sertifikalı, Kutu ve Belge tam set olarak teslim edilir. Uluslararası üretici garantisi altındadır.</span>
                    </div>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ color: '#059669', marginTop: '2px' }}>✓</span>
                    <div>
                      <strong style={{ display: 'block', color: '#111827' }}>Ekspertiz Onaylı</strong>
                      <span>Tüm lüks saatlerimiz, uzman eksperlerimiz tarafından detaylı testlerden geçirilerek satışa sunulur.</span>
                    </div>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#059669', marginTop: '2px' }}>✓</span>
                    <div>
                      <strong style={{ display: 'block', color: '#111827' }}>VIP Teslimat</strong>
                      <span>Yüksek güvenlikli ve sigortalı VIP kurye hizmetiyle kapınıza kadar güvenle ulaştırılır.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div style={{ marginTop: '24px', background: '#F0FDF4', padding: '20px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#065F46', marginBottom: '10px' }}>Satın Alma Notu</h3>
              <p style={{ fontSize: '14px', color: '#374151', margin: 0, lineHeight: 1.6 }}>
                Belirtilen liste fiyatı anlık piyasa koşullarına göre değişkenlik gösterebilir. {watch.modelName} modeli elit koleksiyon ürünlerimizdendir, mağazamızda fiziki olarak incelenebilir.
              </p>
            </div>
          </div>

        </article>
      </main>
    </div>
  );
}
