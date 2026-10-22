#!/bin/bash
set -e

cd /Users/macair1/projects/saatchi
echo "=== [$(date)] SAATCHI GÜNLÜK SENKRONİZASYON BAŞLADI ==="

# 1. Fiyat ve katalog senkronizasyonu
echo "[CRON] Fiyat invariantları ve borsa senkronize ediliyor..."
node scripts/sync-rolex-chrono24.mjs || true
node scripts/enforce-pricing-invariants.mjs || true

# 2. SEO Asset'leri ve sitemap üretimi
echo "[CRON] SEO asset'leri ve sitemap üretiliyor..."
node scripts/generate-seo-assets.mjs

# 3. IndexNow gönderimi (Bing, Yandex, Seznam)
echo "[CRON] IndexNow güncellemeleri iletiliyor..."
node scripts/indexnow-submit.mjs || true

echo "=== [$(date)] SAATCHI GÜNLÜK SENKRONİZASYON TAMAMLANDI ==="
