import fs from 'fs';
import path from 'path';
import Link from 'next/link';

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
    <div className="min-h-screen border-t border-surface-border pb-20" style={{ background: '#f5f5f5' }}>
      <main className="px-4 sm:px-6 lg:px-8 pt-8">
        <article className="seo-prerender-pdp" style={{ maxWidth: '1200px', margin: '30px auto', padding: '24px', background: '#0d1613', border: '1px solid rgba(194,167,104,0.3)', borderRadius: '18px', color: '#fff' }}>
          <nav className="pdp-crumbs" style={{ fontSize: '13px', color: '#a3b8b0', marginBottom: '20px' }}>
            <Link href="/" style={{ color: '#C2A768', textDecoration: 'none' }}>Ana Sayfa</Link> / <Link href="/saatler" style={{ color: '#C2A768', textDecoration: 'none' }}>Lüks Saat Koleksiyonu</Link> / <span style={{ color: '#fff' }}>{watch.modelName}</span>
          </nav>

          {/* PDP HERO ANSWER ENGINE */}
          <div className="hero-answer-engine" style={{ margin: '0 0 24px', background: '#0a100e', border: '1px solid #1a2723', padding: '16px', borderRadius: '12px' }}>
            <div style={{ color: '#34D399', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
               <span style={{ width: '8px', height: '8px', background: '#34D399', borderRadius: '50%', display: 'inline-block' }}></span> ONAYLI ÜRÜN KÜNYESİ & EKSPERTİZ BİLGİSİ
            </div>
            <p style={{ fontSize: '13px', color: '#a3b8b0', lineHeight: 1.6, marginBottom: '12px' }}>
              Bu {watch.brand} {watch.modelName} modeli, Saatchi & Co. stok ve temin ağı güvencesiyle sunulmaktadır. Sıfır distribütör garantili ve tescilli kutu-belge tam set olarak sağlanır. VIP teslimat ve 256-bit SSL ödeme altyapısı geçerlidir.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '12px', color: '#fff' }}>
              <span><strong style={{ color: '#8fa099' }}>Fiziki Konum:</strong> Saatchi Showroom</span>
              <span><strong style={{ color: '#8fa099' }}>Fiyat Durumu:</strong> {watch.price} (Canlı Kur)</span>
              <span><strong style={{ color: '#8fa099' }}>Kondisyon:</strong> Sıfır Distribütör Garantili</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', background: '#070d0b', padding: '20px', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={watch.image || '/images/placeholder.jpg'} alt={watch.modelName} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} />
            </div>

            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ fontSize: '14px', color: '#C2A768', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>{watch.brand}</span>
              <h1 style={{ fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.15, margin: 0, color: '#fff' }}>{watch.modelName}</h1>
              <p style={{ fontSize: '13px', color: '#8fa099', margin: 0 }}>Kategori: {watch.category} • Durum: Sıfır Distribütör Garantili</p>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#34D399', margin: '8px 0' }}>{watch.price}</div>
              
              <div style={{ background: 'rgba(194,167,104,0.1)', border: '1px solid rgba(194,167,104,0.3)', borderRadius: '8px', padding: '12px 16px', margin: '4px 0 10px', fontSize: '13px', lineHeight: 1.5, color: '#f0e6d2' }}>
                <strong style={{ color: '#C2A768', display: 'block', marginBottom: '2px', fontSize: '13.5px' }}>📦 Özel Sipariş ile Temin Edilir</strong>
                <span style={{ color: '#d5e2dc' }}>Ürün, talebiniz üzerine özel olarak temin edilir. Güncel temin süresi için bizimle iletişime geçebilirsiniz.</span>
              </div>

              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#d5e2dc' }}>
                {watch.description || `${watch.modelName}, saat işçiliğinin zirve standardıdır. İsviçre manüfaktür mekanizma ve çizilmeye dayanıklı safir cam ile donatılmıştır.`}
              </p>

              <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/vip-checkout" style={{ background: 'linear-gradient(135deg,#C2A768,#9E8548)', color: '#070A09', fontWeight: 700, padding: '14px 28px', border: 'none', borderRadius: '10px', cursor: 'pointer', textAlign: 'center', flex: 1 }}>
                  Güvenli Satın Al
                </Link>
                <a href="https://wa.me/905419305372" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '14px 24px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  WhatsApp İletişim
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
