"use client";

import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Info } from 'lucide-react';

export default function ProductTabs({ watch }: { watch: any }) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Ürün Açıklaması', icon: <Info className="w-4 h-4" /> },
    { id: 'warranty', label: 'Garanti & Orijinallik', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'shipping', label: 'Teslimat', icon: <Truck className="w-4 h-4" /> },
    { id: 'returns', label: 'İade Şartları', icon: <RotateCcw className="w-4 h-4" /> },
  ];

  return (
    <div className="mt-16 border-t border-surface-border pt-12">
      {/* Mobile Accordion & Desktop Tabs Container */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Tabs (Desktop) */}
        <div className="hidden md:flex flex-col w-1/4 space-y-2 border-r border-surface-border pr-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-foreground/70 hover:bg-surface hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Tabs Select */}
        <div className="md:hidden flex overflow-x-auto pb-4 space-x-2 border-b border-surface-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface text-foreground/70'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full md:w-3/4 min-h-[300px]">
          {activeTab === 'description' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-xl font-serif text-foreground mb-4">Mükemmelliğin İmzası: {watch?.brand} {watch?.modelName}</h3>
              <p className="text-foreground/80 font-light leading-relaxed mb-6 text-sm md:text-base text-justify">
                {watch?.description || `${watch?.brand} mühendisliğinin sınırlarını zorlayan bu ikonik tasarım, lüksün ve gücün bilekteki manifestosudur. İsviçre saatçilik mirasının (Haute Horlogerie) en seçkin örneklerinden biri olan bu model, sıradanlığa meydan okuyan benzersiz detaylarıyla dikkat çekiyor.`}
              </p>
              
              <div className="bg-surface p-6 rounded-xl border border-surface-border">
                <h4 className="text-xs font-extrabold tracking-widest uppercase text-foreground mb-4 border-b border-surface-border pb-2">Öne Çıkan Özellikler</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {watch?.features ? (
                    watch.features.map((feat: string, i: number) => (
                      <li key={i} className="flex items-center text-sm text-foreground/70 font-medium">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span> {feat}
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-center text-sm text-foreground/70 font-medium"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span> Safir Kristal Cam (Çizilmez)</li>
                      <li className="flex items-center text-sm text-foreground/70 font-medium"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span> Paslanmaz Çelik ve Özel Alaşım</li>
                      <li className="flex items-center text-sm text-foreground/70 font-medium"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span> Su Geçirmezlik</li>
                      <li className="flex items-center text-sm text-foreground/70 font-medium"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span> Otomatik / Yüksek Hassasiyetli Mekanizma</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
              <h3 className="text-xl font-serif text-foreground mb-4">Uluslararası Garanti ve Orijinallik</h3>
              <p className="text-foreground/80 font-light leading-relaxed text-sm md:text-base">
                Saatchi & Co. olarak sattığımız tüm saatler <strong>%100 Orijinaldir</strong> ve uluslararası marka garantisi altındadır. Sahte, replika veya modifiye edilmiş hiçbir saat portföyümüzde bulunmaz.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-5 border border-surface-border rounded-lg bg-white shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-foreground">Sertifikalı Teslimat</h4>
                  <p className="text-xs text-foreground/70 leading-relaxed">Ürününüz orijinal kutusu, garanti belgesi, hologramı ve uluslararası sertifikalarıyla birlikte tam set (Full Set) olarak size teslim edilir.</p>
                </div>
                <div className="p-5 border border-surface-border rounded-lg bg-white shadow-sm">
                  <RotateCcw className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-foreground">Ekspertiz Onayı</h4>
                  <p className="text-xs text-foreground/70 leading-relaxed">Tüm saatlerimiz, İsviçre saatçilik eğitimine sahip bağımsız ekspertizlerimiz tarafından mekanik, kozmetik ve kondisyon testlerinden 4/4 puan alarak listelenir.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-xl font-serif text-foreground mb-4">VIP & Sigortalı Teslimat Ağı</h3>
              <p className="text-foreground/80 font-light leading-relaxed mb-6 text-sm md:text-base">
                Lüks saatlerinizin transferi, standart kargo prosedürlerinin ötesinde, tam sigortalı VIP kurye ağıyla sağlanmaktadır. 
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1"><Truck className="w-5 h-5 text-primary" /></div>
                  <div className="ml-4">
                    <h5 className="font-bold text-sm text-foreground uppercase tracking-widest mb-1">Aynı Gün Sigortalı Transfer</h5>
                    <p className="text-xs text-foreground/70 leading-relaxed">Saat 15:00'e kadar onaylanan ödemelerde, değerli kargonuz özel kurye ağıyla %100 tam değer sigortalı şekilde yola çıkar.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1"><Info className="w-5 h-5 text-primary" /></div>
                  <div className="ml-4">
                    <h5 className="font-bold text-sm text-foreground uppercase tracking-widest mb-1">Elit Şube Teslimatı</h5>
                    <p className="text-xs text-foreground/70 leading-relaxed">Dilerseniz saatinizi VIP randevu sistemiyle doğrudan merkez showroom'umuzdan da teslim alabilirsiniz.</p>
                  </div>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-xl font-serif text-foreground mb-4">Şeffaf İade Şartları</h3>
              <p className="text-foreground/80 font-light leading-relaxed mb-4 text-sm md:text-base">
                Müşteri memnuniyetini en üst düzeyde tutmayı taahhüt ediyoruz. Lüks saat alımlarında aşağıdaki prosedürler titizlikle uygulanır:
              </p>
              <div className="bg-[#FAF8F5] p-5 rounded-lg border border-[#EAE5D9]">
                <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-3 font-medium">
                  <li>Orijinal koruyucu jelatinleri ve etiketleri sökülmemiş saatler, 14 gün içerisinde iade edilebilir.</li>
                  <li>Kutusu, sertifikası veya garanti belgesi kaybolmuş, tahrip edilmiş ürünler iade alınmaz.</li>
                  <li>Kordon kısaltma veya parça değişimi gibi işlemler görmüş saatler kişiselleştirilmiş statüsüne girdiği için cayma hakkı kapsamı dışındadır.</li>
                  <li>İade işlemleri sırasında ürün tekrar bağımsız ekspertiz kontrolünden geçerek onaylanmaktadır.</li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
