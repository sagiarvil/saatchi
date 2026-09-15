#!/bin/bash
# Saatchi & Semih Sonbahar - Daily Auto Sync (04:00 AM)

PROJECT_DIR="/Users/macair1/projects/saatchi"
cd $PROJECT_DIR

echo "========================================"
echo "Sync Started: $(date)"

# Activate virtualenv and run scrapers
source .venv/bin/activate

echo "Running Saatchi General Scraper (Konyali Saat vs)..."
python saatchi_scraper.py

echo "Running Chrono24 Elit Scraper (Live Kur)..."
python generate_chrono24_mock.py

echo "Rebuilding Static Pages..."
npm run build

echo "Deploying to Firebase Hosting..."
npx firebase-tools deploy --only hosting --non-interactive

echo "Sync Completed: $(date)"
echo "========================================"
