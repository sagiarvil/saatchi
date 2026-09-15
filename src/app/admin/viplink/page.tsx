'use client';
import React, { useState } from 'react';
import { Watch, Link as LinkIcon, Check, Copy, ShieldCheck } from 'lucide-react';

export default function VipLinkGenerator() {
  const [productTitle, setProductTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('SAATCHI_SECURE');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormatAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (!raw) {
      setAmount('');
      return;
    }
    const formatted = new Intl.NumberFormat('tr-TR').format(Number(raw));
    setAmount(formatted);
  };

  const generateLink = () => {
    if (!productTitle || !amount) return;
    
    const rawAmount = amount.replace(/\D/g, '');
    const orderId = 'SAATCHI-VIP-' + Date.now().toString().slice(-6);
    
    // Basit bir base64 payload
    const payload = {
      title: productTitle,
      amount: rawAmount,
      provider: provider,
      orderId: orderId,
      t: Date.now()
    };
    
    const token = btoa(encodeURIComponent(JSON.stringify(payload)));
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://saatchi.watch';
    
    // vip-checkout'a parametreleri base64 olarak (p) veya düz yollayabiliriz. 
    // Şimdilik düz okunan amount ve orderId kullanıyoruz (Saatchi stili)
    const url = `${origin}/vip-checkout?amount=${rawAmount}&orderId=${orderId}&title=${encodeURIComponent(productTitle)}&p=${token}`;
    
    setGeneratedLink(url);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rawAmount = parseInt(amount.replace(/\D/g, '') || '0', 10);
  const isFormValid = productTitle.length > 0 && rawAmount > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-[#C2A768] text-2xl md:text-3xl font-bold tracking-widest uppercase mb-2">Saatchi</h1>
          <p className="text-white/50 text-xs tracking-[0.2em] uppercase">VIP Ödeme Linki Oluşturucu</p>
        </div>

        {/* Generator Card */}
        <div className="bg-[#111] border border-white/10 rounded-none p-6 md:p-10 relative overflow-hidden">
          
          {/* Subtle Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C2A768] to-transparent opacity-50"></div>

          <div className="space-y-8">
            {/* Model Name */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">Saat Modeli veya Sipariş Adı <span className="text-[#C2A768]">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Watch className="w-5 h-5 text-white/20" />
                </div>
                <input 
                  type="text" 
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-none pl-12 pr-4 py-4 text-white text-lg focus:outline-none focus:border-[#C2A768]/50 transition-colors placeholder:text-white/20 font-light" 
                  placeholder="Örn: Patek Philippe Nautilus 5711" 
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">Sipariş Tutarı (TL) <span className="text-[#C2A768]">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-white/50 font-serif text-xl">₺</span>
                </div>
                <input 
                  type="text" 
                  value={amount}
                  onChange={handleFormatAmount}
                  inputMode="numeric"
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-none pl-12 pr-4 py-4 text-white text-2xl font-serif focus:outline-none focus:border-[#C2A768]/50 transition-colors placeholder:text-white/20" 
                  placeholder="2.500.000" 
                />
              </div>
            </div>

            {/* Provider Selector (Simulation for Future) */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">Tahsilat Altyapısı <span className="text-[#C2A768]">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setProvider('SAATCHI_SECURE')}
                  className={`py-4 px-4 border text-sm font-semibold tracking-wide transition-all ${provider === 'SAATCHI_SECURE' ? 'border-[#C2A768] bg-[#C2A768]/10 text-[#C2A768]' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                >
                  <ShieldCheck className="w-4 h-4 inline-block mr-2 mb-0.5" /> Saatchi Güvenli POS
                </button>
                <button 
                  onClick={() => setProvider('OTHER_POS')}
                  className={`py-4 px-4 border text-sm font-semibold tracking-wide transition-all ${provider === 'OTHER_POS' ? 'border-[#C2A768] bg-[#C2A768]/10 text-[#C2A768]' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                >
                  Yedek Sanal POS
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button 
              onClick={generateLink}
              disabled={!isFormValid}
              className="w-full bg-white text-black font-bold uppercase tracking-widest text-sm py-5 mt-4 hover:bg-[#C2A768] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              VIP Ödeme Linki Oluştur
            </button>
          </div>

        </div>

        {/* Result Section */}
        {generatedLink && (
          <div className="mt-8 bg-[#111] border border-[#C2A768]/30 rounded-none p-6 md:p-8 animate-fade-in">
            <h3 className="text-[#C2A768] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Check className="w-4 h-4" /> Link Başarıyla Oluşturuldu
            </h3>
            
            <div className="bg-[#1A1A1A] border border-white/5 p-4 flex items-center justify-between gap-4 break-all">
              <span className="text-white/70 font-mono text-sm leading-relaxed select-all">
                {generatedLink}
              </span>
              <button 
                onClick={copyToClipboard}
                className="shrink-0 bg-white/10 hover:bg-white/20 p-3 rounded-none transition-colors"
                title="Kopyala"
              >
                {copied ? <Check className="w-5 h-5 text-[#C2A768]" /> : <Copy className="w-5 h-5 text-white" />}
              </button>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button 
                onClick={copyToClipboard}
                className="flex-1 border border-[#C2A768] text-[#C2A768] hover:bg-[#C2A768] hover:text-black font-bold uppercase tracking-widest text-xs py-4 transition-colors"
              >
                {copied ? 'Kopyalandı!' : 'Linki Kopyala'}
              </button>
              
              <a 
                href={`https://wa.me/?text=${encodeURIComponent('Sayın Müşterimiz,\n\n' + productTitle + ' siparişinize ait güvenli VIP ödeme linkiniz aşağıdadır:\n\n' + generatedLink + '\n\nSaatchi')}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#25D366] text-black font-bold uppercase tracking-widest text-xs py-4 flex items-center justify-center hover:bg-[#20b858] transition-colors"
              >
                WhatsApp İle Gönder
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
