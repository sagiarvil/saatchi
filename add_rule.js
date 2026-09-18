const fs = require('fs');

const rule = `
## 13. Gerçek ve Profesyonel Ürün Görseli Kuralı (YENİ KURAL)
- **Profesyonel Görsel Zorunluluğu:** Sitede sergilenen tüm saat görselleri %100 profesyonel, önden çekilmiş, yüksek çözünürlüklü ve sadece saate odaklanan ürün (packshot) görselleri olmak ZORUNDADIR. 
- **Lifestyle ve Alakasız Görsel Yasağı:** Kadın/erkek mankenlerin üzerinde çekilmiş lifestyle fotoğraflar, kutu açılış videolarından alınma bulanık kareler veya saatin sadece kayışını/tokasını gösteren açılı fotoğraflar KESİNLİKLE YASAKTIR.
- **Alternatif Kaynak İzni:** Eğer belirtilen ana veri kaynağında (ör. cartier.com) model adıyla tam eşleşen, beyaz/transparan arka planlı ve profesyonel kalitede bir packshot bulunamıyorsa; ajan insiyatif alarak modeli Chrono24, Jomashop, WatchBox gibi diğer güvenilir lüks saat platformlarından arayacak ve en kusursuz (pro) görseli sisteme ekleyecektir. Yanlış veya amatör bir görsel koymaktansa, doğru saatin başka bir güvenilir platformdaki profesyonel görseli tercih edilecektir.
`;

const agentsMd = fs.readFileSync('AGENTS.md', 'utf8');
if (!agentsMd.includes('Gerçek ve Profesyonel Ürün Görseli Kuralı')) {
    fs.writeFileSync('AGENTS.md', agentsMd + rule);
}
