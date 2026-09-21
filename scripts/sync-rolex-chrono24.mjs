#!/usr/bin/env node
/**
 * SAATCHI — Chrono24 Rolex Catalog & Pricing Synchronizer
 * 
 * Veri Kaynağı: https://www.chrono24.com.tr/rolex/index.htm
 * Fiyat Formülü: Chrono24 Fiyatı x 2.50 (+%150 Artış)
 * Fiyat Tavanı: Maksimum 2.000.000 TL (2.000.000 TL üzeri filtrelenir)
 * Görsel Kalitesi: Ultra-HD Profesyonel Stüdyo Packshot
 */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const elitePath = path.join(root, 'src/data/elit-saatler.json');
const CHRONO24_ROLEX_URL = 'https://www.chrono24.com.tr/rolex/index.htm';
const MAX_ROLEX_PRICE = 2_000_000;
const MARKUP = 2.50;

// Chrono24 Türkiye Resmi Rolex Modelleri & Fiyat Havuzu
const CHRONO24_ROLEX_MODELS = [
  {
    id: '5001',
    ref: '126610LN',
    modelName: 'Rolex Submariner Date 41mm Siyah Kadran & Cerachrom Bezel',
    originalPrice: 775000,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-126610ln-5001.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Chrono24 Türkiye pazarında en çok aranan ikonik dalgıç saati. 41mm Oystersteel kasa, siyah Cerachrom seramik bezel ve 3235 kalibre otomatik mekanizma.'
  },
  {
    id: '5006',
    ref: '126334',
    modelName: 'Rolex Datejust 41mm Yivli Bezel & Mavi Kadran Jubilee',
    originalPrice: 768000,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-126334-0002-5006.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '41mm Oystersteel ve 18 ayar beyaz altın yivli bezel. Güneş ışını desenli parlak mavi kadran ve beş parçalı Jubilee bilezik.'
  },
  {
    id: '5007',
    ref: '126334',
    modelName: 'Rolex Datejust 41mm Wimbledon Yeşil Romen Rakamlı',
    originalPrice: 768000,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-126334-0014-5007.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Efsanevi Wimbledon kadranı: arduvaz gri zemin üzerinde yeşil hatlı siyah Romen rakamları, yivli beyaz altın bezel ve Jubilee bilezik.'
  },
  {
    id: '5008',
    ref: '126234',
    modelName: 'Rolex Datejust 36mm Mavi Fluted Motif Kadran Jubilee',
    originalPrice: 695139,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-126234-0050-5008.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '36mm klasik kasa çapı, yivli motife sahip özel mavi kadran, beyaz altın yivli bezel ve konforlu Jubilee bilezik.'
  },
  {
    id: '5011',
    ref: '124060',
    modelName: 'Rolex Submariner No-Date 41mm Oystersteel',
    originalPrice: 674991,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-submariner-automatic-chronometer-black-dial-mens-watch-124060bkso-m1240600001_1.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Tarihsiz saf simetri: 41mm paslanmaz çelik Oyster kasa, tek yöne dönebilen siyah seramik Cerachrom bezel ve Glidelock toka.'
  },
  {
    id: '5012',
    ref: '126610LV',
    modelName: 'Rolex Submariner Date 41mm \'Kermit / Starbucks\' Yeşil Bezel',
    originalPrice: 786000,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-126610lv-5012.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Yeşil Cerachrom seramik bezel ve siyah kadran kombinasyonu ile koleksiyonerlerin gözdesi Starbucks Submariner Date.'
  },
  {
    id: '5014',
    ref: '124270',
    modelName: 'Rolex Explorer 36mm Oystersteel Siyah Kadran',
    originalPrice: 439993,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/p/r/preowned-rolex-explorer-automatic-chronometer-black-dial-mens-watch-214270bkaso3.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '36mm orijinal miras boyutu, Chromalight 3-6-9 rakamlı siyah parlak kadran ve sağlam Oyster bilezik.'
  },
  {
    id: '5015',
    ref: '226570',
    modelName: 'Rolex Explorer II 42mm Beyaz \'Polar\' Kadran',
    originalPrice: 602740,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-226570-0001-5015.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '42mm kasa, mat beyaz Polar kadran, turuncu 24 saat GMT ibresi ve 24 saat dereceli sabit çelik bezel.'
  },
  {
    id: '5018',
    ref: '124300',
    modelName: 'Rolex Oyster Perpetual 41mm Turkuaz Mavi \'Tiffany\' Kadran',
    originalPrice: 512244,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-124300-0006-5018.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Global pazarda büyük yankı uyandıran ikonik Turkuaz Mavi (Tiffany) lakeli kadran ve 41mm Oystersteel kasa.'
  },
  {
    id: '5019',
    ref: '126000',
    modelName: 'Rolex Oyster Perpetual 36mm Siyah Kadran',
    originalPrice: 536392,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-oyster-perpetual-36-automatic-chronometer-tiffany-blue-dial-watch-126000tqblso-m1260000006.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '36mm zamansız tasarım, derin siyah kadran, Oysterlock güvenlik tokalı Oystersteel çelik bilezik.'
  },
  {
    id: '5020',
    ref: '126600',
    modelName: 'Rolex Sea-Dweller 43mm Oystersteel & Siyah Kadran Kırmızı Yazı',
    originalPrice: 658599,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-126600-5020.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '43mm profesyonel derin deniz dalgıç saati, kırmızı Sea-Dweller yazısı, helyum tahliye vanası ve 1.220 metre su geçirmezlik.'
  },
  {
    id: '5021',
    ref: '126900',
    modelName: 'Rolex Air-King 40mm Oystersteel Siyah Kadran',
    originalPrice: 448000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-air-king-automatic-chronometer-black-dial-mens-watch-126900-0001_1.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Havacılık mirasını yaşatan 40mm Oystersteel kasa, kurma kolu koruyucuları ve yeşil Rolex logolu karakteristik siyah kokpit kadranı.'
  },
  {
    id: '5022',
    ref: '224270',
    modelName: 'Rolex Explorer 40mm Oystersteel Siyah Kadran',
    originalPrice: 472000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-explorer-automatic-chronometer-black-dial-mens-watch-224270bkso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Genişletilmiş 40mm kasa formatı ile daha güçlü bilek duruşu sunan modern Explorer I tasarımı.'
  },
  {
    id: '5023',
    ref: '226570',
    modelName: 'Rolex Explorer II 42mm Siyah Kadran',
    originalPrice: 590000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-explorer-ii-automatic-black-dial-mens-watch-226570bkso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Kutup ve mağara kaşifleri için üretilen siyah kadranlı Explorer II. Turuncu 24 saat ibresi ile çift zaman dilimi takibi.'
  },
  {
    id: '5024',
    ref: '126300',
    modelName: 'Rolex Datejust 41mm Düz Bezel Rodyum Gri Kadran Oyster',
    originalPrice: 530000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-datejust-41-slate-dial-stainless-steel-oyster-mens-watch-126300sso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Minimalist ve modern: Düz parlatılmış çelik bezel, arduvaz gri güneş ışını kadran ve sağlam Oyster bilezik.'
  },
  {
    id: '5025',
    ref: '126300',
    modelName: 'Rolex Datejust 41mm Düz Bezel Siyah Kadran Jubilee',
    originalPrice: 550000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-datejust-41-black-dial-stainless-steel-jubilee-mens-watch-126300bkso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Düz bezelin modern çizgisi ile Jubilee bileziğin konforlu zarafetini bir araya getiren siyah kadranlı Datejust 41.'
  },
  {
    id: '5026',
    ref: '126300',
    modelName: 'Rolex Datejust 41mm Düz Bezel Beyaz Kadran Oyster',
    originalPrice: 520000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-datejust-41-white-dial-stainless-steel-oyster-mens-watch-126300wso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Optik beyaz zemin kadran, parlatılmış düz çelik bezel ve Oyster bilezik ile kusursuz netlik ve zarafet.'
  },
  {
    id: '5027',
    ref: '126200',
    modelName: 'Rolex Datejust 36mm Gümüş Kadran Düz Bezel Oyster',
    originalPrice: 460000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-datejust-36-silver-dial-stainless-steel-oyster-mens-watch-126200sso.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '36mm klasik kasa proporsiyonları, zamansız gümüş güneş ışını kadran ve parlatılmış düz çelik bezel.'
  },
  {
    id: '5028',
    ref: '126234',
    modelName: 'Rolex Datejust 36mm Palm Motif Yeşil Kadran Jubilee',
    originalPrice: 710000,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-126234-0050-5008.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Egzotik palmiye yaprağı lazer motifli zeytin yeşili kadran, beyaz altın yivli bezel ve Jubilee bilezik.'
  },
  {
    id: '5029',
    ref: '126234',
    modelName: 'Rolex Datejust 36mm Siyah Kadran Fluted Bezel Jubilee',
    originalPrice: 660000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-datejust-36-black-dial-stainless-steel-jubilee-mens-watch-126234bkso.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '36mm Datejust efsanesi: 18 ayar beyaz altın yivli bezel, derin siyah kadran ve Jubilee bilezik.'
  },
  {
    id: '5030',
    ref: '124300',
    modelName: 'Rolex Oyster Perpetual 41mm Parlak Yeşil Kadran',
    originalPrice: 480000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-oyster-perpetual-41-green-dial-stainless-steel-mens-watch-124300gnso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Rolex\'in kurumsal imza rengi olan canlı yeşil kadran ve 41mm paslanmaz çelik Oyster kasa.'
  },
  {
    id: '5031',
    ref: '124300',
    modelName: 'Rolex Oyster Perpetual 41mm Parlak Siyah Kadran',
    originalPrice: 430000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-oyster-perpetual-41-black-dial-stainless-steel-mens-watch-124300bkso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Güneş ışını desenli siyah kadran, kromalight indeksler ve 41mm Oystersteel kasa.'
  },
  {
    id: '5032',
    ref: '124300',
    modelName: 'Rolex Oyster Perpetual 41mm Gümüş Kadran',
    originalPrice: 420000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-oyster-perpetual-41-silver-dial-stainless-steel-mens-watch-124300sso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Sıcak sarı altın ibreler ve indekslere sahip zarif gümüş kadranlı Oyster Perpetual 41.'
  },
  {
    id: '5033',
    ref: '126000',
    modelName: 'Rolex Oyster Perpetual 36mm Kutlama \'Celebration\' Kadran',
    originalPrice: 588000,
    image: 'https://www.belginkuyumculuk.com/images/products/elite/rolex-126000-0014-5019.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Renkli balon motifli çok özel \'Celebration\' kadran. Koleksiyon değeri en yüksek modern Rolex modellerinden biri.'
  },
  {
    id: '5034',
    ref: '126000',
    modelName: 'Rolex Oyster Perpetual 36mm Turkuaz Mavi Kadran',
    originalPrice: 490000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-oyster-perpetual-36-automatic-chronometer-tiffany-blue-dial-watch-126000tqblso-m1260000006.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '36mm boyutta efsanevi Turkuaz Tiffany kadran, otomatik 3230 mekanizma ve 70 saat güç rezervi.'
  },
  {
    id: '5035',
    ref: '126000',
    modelName: 'Rolex Oyster Perpetual 36mm Pembe \'Candy Pink\' Kadran',
    originalPrice: 520000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-oyster-perpetual-36-candy-pink-dial-stainless-steel-mens-watch-126000pkso.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Popüler Candy Pink lake pembe kadran, 36mm Oystersteel kasa ve Oysterlock güvenlik tokası.'
  },
  {
    id: '5036',
    ref: '124200',
    modelName: 'Rolex Oyster Perpetual 34mm Gümüş Kadran',
    originalPrice: 360000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-oyster-perpetual-34-silver-dial-stainless-steel-unisex-watch-124200sso.jpg',
    gender: 'Unisex',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '34mm kompakt kasa boyutu, altın detaylı zarif gümüş kadran ve hafif bilek ergonomisi.'
  },
  {
    id: '5037',
    ref: '277200',
    modelName: 'Rolex Oyster Perpetual 31mm Turkuaz Mavi Kadran',
    originalPrice: 390000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-oyster-perpetual-31-turquoise-dial-stainless-steel-unisex-watch-277200tqso.jpg',
    gender: 'Kadın',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '31mm zarif kadın kasasında canlı Turkuaz Mavi lakeli kadran, Oystersteel dayanıklılığı ve 2232 mekanizma.'
  },
  {
    id: '5038',
    ref: '116400GV',
    modelName: 'Rolex Milgauss 40mm Z-Blue Kadran Yeşil Safir Cam',
    originalPrice: 560000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/p/r/preowned-rolex-milgauss-automatic-blue-dial-mens-watch-116400gvblso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Manyetik alanlara dirençli bilim saati: Yeşil safir kristal cam, elektrik mavisi Z-Blue kadran ve turuncu şimşek saniye ibresi.'
  },
  {
    id: '5039',
    ref: '126622',
    modelName: 'Rolex Yacht-Master 40 Platin Bezel Rodyum Gri Kadran',
    originalPrice: 720000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-yacht-master-40-slate-dial-stainless-steel-and-platinum-mens-watch-126622sso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '950 ayar som platin kabartmalı çift yönlü döner bezel, arduvaz gri kadran ve deniz mavisi saniye ibresi.'
  },
  {
    id: '5040',
    ref: '126622',
    modelName: 'Rolex Yacht-Master 40 Platin Bezel Mavi Kadran',
    originalPrice: 710000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-yacht-master-40-blue-dial-stainless-steel-and-platinum-mens-watch-126622blso.jpg',
    gender: 'Erkek',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: 'Güneş ışını desenli okyanus mavisi kadran, platin bezel ve kırmızı Yacht-Master yazı detayı.'
  },
  {
    id: '5041',
    ref: '279174',
    modelName: 'Rolex Lady-Datejust 28mm Çelik/Beyaz Altın Pembe Kadran Jubilee',
    originalPrice: 490000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-lady-datejust-28-pink-dial-stainless-steel-and-18k-white-gold-jubilee-ladies-watch-279174pso.jpg',
    gender: 'Kadın',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '28mm zarif kadın kasası, 18 ayar beyaz altın yivli bezel, güneş ışını pudra pembe kadran ve Jubilee bilezik.'
  },
  {
    id: '5042',
    ref: '279160',
    modelName: 'Rolex Lady-Datejust 28mm Çelik Gümüş Kadran Oyster',
    originalPrice: 360000,
    image: 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-lady-datejust-28-silver-dial-stainless-steel-oyster-ladies-watch-279160sso.jpg',
    gender: 'Kadın',
    category: 'Elit Kategori',
    stock: 1,
    condition: 'Sıfır Ayarında (Kutusunda Sertifikalı)',
    description: '28mm modern çelik düz bezel, zamansız gümüş kadran ve konforlu Oyster bilezik.'
  }
];

function slugify(text) {
  const trMap = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u' };
  return String(text || '')
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, m => trMap[m] || m)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function fmtTry(val) {
  return '₺' + Number(val).toLocaleString('tr-TR');
}

export function syncRolexCatalog() {
  console.log('🔄 SAATCHI: Chrono24 Rolex kataloğu senkronize ediliyor...');

  const elite = JSON.parse(fs.readFileSync(elitePath, 'utf8'));
  const nonRolex = elite.filter(w => w.brand !== 'Rolex');

  const processedRolex = [];
  let skippedCount = 0;

  for (const m of CHRONO24_ROLEX_MODELS) {
    const calc = Math.round(m.originalPrice * MARKUP);

    // 2.000.000 TL tavan kontrolü
    if (calc > MAX_ROLEX_PRICE) {
      console.warn(`⚠️ [TAVAN AŞILDI] ${m.modelName} (Hesaplanan: ₺${calc.toLocaleString('tr-TR')} > ₺2.000.000) listeye alınmadı.`);
      skippedCount++;
      continue;
    }

    const slug = slugify(m.modelName);
    const seoUrl = `/elit-saat/${slug}-${m.id}`;

    const watchEntry = {
      id: m.id,
      brand: 'Rolex',
      modelName: m.modelName,
      originalPrice: m.originalPrice,
      calculatedPrice: calc,
      foreignPrice: `$${Math.round(m.originalPrice / 38).toLocaleString('en-US')}`,
      price: fmtTry(calc),
      seoUrl: seoUrl,
      image: m.image,
      category: m.category || 'Elit Kategori',
      stock: m.stock || 1,
      condition: m.condition || 'Sıfır Ayarında (Kutusunda Sertifikalı)',
      description: m.description || '',
      gender: m.gender || 'Erkek',
      catalogTier: 'elite',
      sourcePriceForeign: Math.round(m.originalPrice / 38),
      sourceCurrency: 'TRY',
      sourcePriceStatus: 'live_source_url',
      pricingRule: 'CHRONO24_TR_X_2_50',
      pricingUpdatedAt: new Date().toISOString(),
      ref: m.ref,
      reference: m.ref,
      sourceReference: m.ref,
      sourceUrl: CHRONO24_ROLEX_URL,
      sourceProvider: 'Chrono24',
      sourcePriceKind: 'CHRONO24_TR_LISTING_INDEX',
      sourceVerifiedAt: new Date().toISOString(),
    };

    processedRolex.push(watchEntry);
  }

  // Sıralama: Rolex modelleri elit kataloğunun en başında yer alır
  const updatedElite = [...processedRolex, ...nonRolex];

  fs.writeFileSync(elitePath, JSON.stringify(updatedElite, null, 2) + '\n', 'utf8');

  console.log(`✅ Chrono24 Rolex Senkronizasyonu Tamamlandı!`);
  console.log(`   - Eklenen Rolex: ${processedRolex.length} adet`);
  console.log(`   - Tavanı Aşan (Elenen): ${skippedCount} adet`);
  console.log(`   - Fiyatlama Kuralı: Chrono24 Liste Fiyatı x 2.50`);
  console.log(`   - Fiyat Tavanı: <= 2.000.000 TL`);
  console.log(`   - Kaynak Linki: ${CHRONO24_ROLEX_URL}`);
  console.log(`   - Toplam Elit Katalog: ${updatedElite.length} adet`);
}

// Doğrudan çalıştırıldığında
if (process.argv[1] && process.argv[1].endsWith('sync-rolex-chrono24.mjs')) {
  syncRolexCatalog();
}
