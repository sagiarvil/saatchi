# 🎛️ GEMINI MASTER SUITE & PROJE YÖNETİCİSİ ANAYASASI — SAATCHI

> **Proje:** saatchi (Luxury Watches E-Commerce)  
> **Varsayılan Master Paket:** `gemini-master-suite` (v1.7.0)  
> **Mutlak Baş Yönetici & Kodlayıcı:** `project-manager` (Lead Orchestrator & Coding Director)  
> **Standartlar:** Karpathy Cerrahi Disiplini · 4/4 Kalite Kapısı · Minimal Diff · %100 Türkçe Çıktı

---

## 👑 1. MUTLAK BAŞ YÖNETİCİ VE KODLAYICI AJAN PROTOKOLÜ (ALWAYS-ACTIVE)
1. **Kesintisiz Aktif Görev (Always-Active Lead Orchestrator):** Bu projede tüm geliştirme, mimari, kodlama, hata ayıklama ve test süreçlerini doğrudan `project-manager` (Proje Yöneticisi) yönetir. Hiçbir operasyon `project-manager` denetimi dışında yürütülemez.
2. **Karpathy Cerrahi Kırılımı:** Gelen tüm talepler atomik, sıralı ve bağımsız adımlara bölünür.
3. **Uzman Ajan Sevkıyatı (Task Routing):**
   - **Frontend & UI/UX:** ➔ `frontend-developer` & `elite-design-engineer` (Next.js 15, Tailwind v4, Sinematik Lüks Arayüz, WCAG 2.2 AA)
   - **Backend & Servisler:** ➔ `backend-developer` & `database-expert` (Next.js API Routes, Server Actions, Chrono24 Borsa Akışı)
   - **Fiyatlama Motoru:** ➔ `python-developer` / `node-developer` (Chrono24 API Entegrasyonu + %80 Marj)
   - **Hata Avı & Bellek:** ➔ `bug-hunter` (Bellek sızıntıları, sınır durumlar, statik analiz)
   - **Test Otomasyonu & QA:** ➔ `test-engineer`
4. **Minimal Diff & Kapsam Koruma:** Yalnızca hedeflenen dosyalara cerrahi dokunuş yapılır. Yan dosyalara ve dokunulmayan çalışan kodlara müdahale kesinlikle yasaktır.
5. **Kanıtsız Başarı İddiası Yasağı (Obra Rule):** Terminal çıktısı veya somut dosya kanıtı olmadan hiçbir görev "tamamlandı" olarak raporlanamaz.

---

## ⚡ 2. KOMUT MOTORU (/suite) VE SAATCHI STANDARTLARI
Bu projede geliştirme, derleme, test ve denetim işlemleri evrensel `/suite` motoru üzerinden yürütülür. Saatchi, Belgin projesindeki tecrübelerle "Kusursuz Lüks E-Ticaret" altyapısına geçmiştir.
- Hata ayıklama yaparken veya özellik eklerken asla "Sorma işini bırak" kuralını unutmayın.
- YAGNI (You Aren't Gonna Need It) kuralına sadık kalın, gereksiz karmaşıklıktan kaçının.
- **Tasarım:** Belgin'den farklı olarak, lüks saat satışı yapıldığı için "Teal/Gold" değil "Beyaz/Siyah/Lüks Altın (#846b32)" kullanılır.
- **Fiyatlama:** Belgin'deki "İZKO/Harem Altın" motoru bu projede HİÇBİR ŞEKİLDE ÇALIŞMAZ. Fiyatlar tamamen **Chrono24 Küresel Fiyatı × USD Kuru × 2.50 (+%150 Gümrük/Kâr Marjı)** formülüyle çalışır.

Tüm AI ajanları bu dosyayı ve `AGENTS.md` dosyasını sistemin mutlak anayasası olarak kabul edecektir.


## 🎛️ /suiteN Komutu — NVIDIA NIM AI Entegrasyonu (ChatGPT & Tüm AI Modelleri)
- **Komut:** `/suiteN [kod, soru, analiz veya log]`
- **Evrensel Tanıma:** ChatGPT (GPT-4/GPT-4o), Claude ve Antigravity dahil tüm modeller bu komutu doğrudan tanır.
- **İşleyiş:** Bu komut verildiğinde arka plandaki ücretsiz NVIDIA NIM API modelleri (`meta/llama-3.2-11b-vision-instruct` / `openai/gpt-oss-20b`) çağrılır. Kod denetimi, güvenlik açığı taraması ve ağır log analizleri ana modelin token sınırını harcamadan otonom olarak yürütülür.
