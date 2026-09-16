import os
import re

def add_zoom_image_import(content):
    if "import ZoomImage" not in content:
        # insert after import Link
        content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport ZoomImage from '@/components/ZoomImage';")
    return content

def update_gallery(content):
    # For saatler
    content = re.sub(
        r'<img src=\{getProxiedImageUrl\(watch\.image\) \|\| \'/images/placeholder\.jpg\'\} alt=\{watch\.modelName\} style=\{\{ maxWidth: \'100%\', maxHeight: \'500px\', objectFit: \'contain\' \}\} />',
        r'<ZoomImage src={getProxiedImageUrl(watch.image) || \'/images/placeholder.jpg\'} alt={watch.modelName} />',
        content
    )
    # For elit-saat
    content = re.sub(
        r'/\*\s*eslint-disable-next-line @next/next/no-img-element\s*\*/\s*<img src=\{getProxiedImageUrl\(watch\.image\)\} alt=\{watch\.modelName\} style=\{\{ maxWidth: \'100%\', maxHeight: \'500px\', objectFit: \'contain\' \}\} />',
        r'<ZoomImage src={getProxiedImageUrl(watch.image)} alt={watch.modelName} />',
        content
    )
    return content

details_section = """
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
"""

def add_details(content):
    if "DETAILED DESCRIPTION SECTION" not in content:
        content = content.replace("</article>", details_section + "\n        </article>")
    return content

for file in ["src/app/saatler/[slug]/page.tsx", "src/app/elit-saat/[slug]/page.tsx"]:
    filepath = os.path.join("/Users/macair1/projects/saatchi", file)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = add_zoom_image_import(content)
        content = update_gallery(content)
        content = add_details(content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
    else:
        print(f"Not found {file}")
