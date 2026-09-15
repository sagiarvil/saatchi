'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';

function VIPCheckoutContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [formData, setFormData] = useState({
    custName: '',
    custPhone: '',
    custIdentity: '',
    custAddress: '',
    cardHolder: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const amount = searchParams.get('amount') || '500000'; // Default 500k for VIP
  const formattedAmount = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Number(amount));
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { id, value } = e.target;
    
    // Formatting
    if (id === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16);
      value = value.match(/.{1,4}/g)?.join(' ') || value;
    } else if (id === 'cardExpiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
    } else if (id === 'cardCvc') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const processPayment = async () => {
    setErrorMsg('');
    if (!formData.custName || !formData.cardNumber) {
      setErrorMsg('Lütfen zorunlu alanları doldurun.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, amount: formattedAmount })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        alert(data.message);
        // İleride 3D Secure'a yönlendir: window.location.href = data.paymentUrl;
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1412] text-[#F0F4F3] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-[#D4AF37] text-2xl md:text-3xl font-bold tracking-widest uppercase mb-2">Saatchi VIP</h1>
          <p className="text-[#8EAAA5] text-sm tracking-wide">Yüksek Güvenlikli Ödeme Noktası</p>
        </div>

        {/* Card */}
        <div className="bg-[#122220] border border-[#1E3835] rounded-2xl p-6 md:p-8 shadow-2xl">
          
          {/* Summary */}
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#1E3835]">
            <div>
              <div className="text-[11px] font-bold text-[#F3E5AB] uppercase tracking-wider mb-1">VIP Sipariş Tahsilatı</div>
              <div className="text-xl font-bold text-white">Showroom Sipariş Bedeli</div>
            </div>
            <div className="text-2xl font-bold text-white">{formattedAmount}</div>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#8EAAA5] mb-1.5">Adınız Soyadınız *</label>
                <input id="custName" value={formData.custName} onChange={handleChange} type="text" className="w-full bg-[#0B1917] border border-[#23433F] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Ad Soyad" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#8EAAA5] mb-1.5">Telefon Numaranız *</label>
                <input id="custPhone" value={formData.custPhone} onChange={handleChange} type="tel" className="w-full bg-[#0B1917] border border-[#23433F] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="05XX XXX XX XX" />
              </div>
            </div>

            <div>
              <label className="flex justify-between text-xs font-semibold text-[#8EAAA5] mb-1.5">
                <span>T.C. Kimlik / Pasaport / Vergi No *</span>
                <span className="text-[#D4AF37]">⚖️ Fatura & MASAK Zorunlu</span>
              </label>
              <input id="custIdentity" value={formData.custIdentity} onChange={handleChange} type="text" className="w-full bg-[#0B1917] border border-[#23433F] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="11 Haneli Kimlik No" maxLength={20} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8EAAA5] mb-1.5">Teslimat / Fatura Adresi *</label>
              <textarea id="custAddress" value={formData.custAddress} onChange={handleChange} rows={2} className="w-full bg-[#0B1917] border border-[#23433F] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-y" placeholder="İl, İlçe, Mahalle, Cadde, Sokak, No, Daire"></textarea>
            </div>
          </div>

          {/* Credit Card Fields */}
          <div className="bg-[#091A17] border-[1.5px] border-[#1E3B36] rounded-xl p-5 mb-8">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#162E2A]">
              <span className="text-xs font-bold text-[#F3E5AB] uppercase tracking-wide flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Kart Bilgileri
              </span>
              <div className="flex gap-1.5">
                <span className="bg-[#1A1F71] text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm">VISA</span>
                <span className="bg-[#EB001B] text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm">Mastercard</span>
                <span className="bg-[#005BAC] text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm">TROY</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#8EAAA5] mb-1.5">Kart Üzerindeki İsim *</label>
                <input id="cardHolder" value={formData.cardHolder} onChange={handleChange} type="text" className="w-full bg-[#0B1917] border border-[#23433F] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Ad Soyad" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-[#8EAAA5] mb-1.5">Kart Numarası *</label>
                <input id="cardNumber" value={formData.cardNumber} onChange={handleChange} type="tel" className="w-full bg-[#0B1917] border border-[#23433F] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="0000 0000 0000 0000" maxLength={19} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8EAAA5] mb-1.5">Son Kullanma *</label>
                  <input id="cardExpiry" value={formData.cardExpiry} onChange={handleChange} type="tel" className="w-full bg-[#0B1917] border border-[#23433F] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-center" placeholder="AA/YY" maxLength={5} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8EAAA5] mb-1.5">Güvenlik Kodu *</label>
                  <input id="cardCvc" value={formData.cardCvc} onChange={handleChange} type="tel" className="w-full bg-[#0B1917] border border-[#23433F] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-center" placeholder="CVV" maxLength={4} />
                </div>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Pay Button */}
          <button 
            onClick={processPayment}
            disabled={loading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black font-bold text-lg py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">İŞLENİYOR...</span>
            ) : (
              <>
                <Lock className="w-5 h-5" /> <span>{formattedAmount} GÜVENLİ ÖDE ➔</span>
              </>
            )}
          </button>
          
          <div className="mt-6 flex flex-col items-center gap-2 text-[#8EAAA5] text-[10px]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>256-Bit SSL Sertifikası ile Korunmaktadır</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>3D Secure Yüksek Güvenlikli Ödeme Altyapısı</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


export default function VIPCheckout() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#0A1412] flex items-center justify-center text-[#D4AF37]">Yükleniyor...</div>}>
      <VIPCheckoutContent />
    </React.Suspense>
  );
}
