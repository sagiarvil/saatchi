'use client';

import React, { useState } from 'react';
import { ArrowRight, Lock, ShieldCheck, Check } from 'lucide-react';
import { getProxiedImageUrl } from '@/utils/imageProxy';

export default function OdemeClient({ watch }: { watch: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({ custName: '', custPhone: '', custIdentity: '', email: '', custAddress: '' });
  const updateField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.id]: e.target.value });

  async function startPayment() {
    setError('');
    if (!form.custName.trim() || !form.custPhone.trim() || !form.custIdentity.trim()) {
      setError('Lütfen zorunlu alanları (Ad Soyad, Telefon ve Kimlik/Vergi No) doldurunuz.');
      return;
    }
    setLoading(true);
    // Gerçek entegrasyonda burası /api/payment vs. çağıracak
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  }

  if (success) {
     return (
       <div className="min-h-screen bg-[#f6f3ef] flex flex-col items-center justify-center text-center px-4">
         <div className="w-16 h-16 rounded-full bg-[#171514]/5 flex items-center justify-center mb-6">
           <Check className="w-8 h-8 text-[#171514]" />
         </div>
         <h1 className="text-2xl md:text-3xl font-semibold tracking-[-0.035em] text-[#171514] mb-4">Talebiniz Alındı</h1>
         <p className="text-[#625a54] text-sm max-w-md leading-relaxed">Güvenli işlem talebiniz oluşturuldu. Saatchi müşteri temsilcimiz ödeme onayı ve VIP teslimat süreci için en kısa sürede sizinle iletişime geçecektir.</p>
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-[#f6f3ef] flex flex-col font-sans py-8 sm:py-12">
      <style>{`
        header, nav, footer, .premium-back-button { display: none !important; }
      `}</style>
      
      <div className="w-full max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col items-center justify-center mb-10 pt-4">
            <img src="/logo-ampersand.png" alt="&" className="h-12 md:h-16 object-contain mb-4 mix-blend-multiply opacity-90" />
         </div>

         <div className="rounded-[22px] border border-[#e5ddd2] bg-[#fffdfa] shadow-[0_18px_60px_rgba(36,25,18,.06)] overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left Side: Order Summary & Watch Details */}
            <div className="w-full lg:w-[40%] bg-[#fcfaf7] border-b lg:border-b-0 lg:border-r border-[#e5ddd2] p-8 lg:p-12 flex flex-col">
               <h2 className="text-[10px] uppercase tracking-[0.22em] text-[#7f262b] font-semibold mb-8">Sipariş Özeti</h2>
               
               <div className="flex flex-col items-center justify-center mb-10">
                 <div className="w-48 h-48 sm:w-64 sm:h-64 relative flex items-center justify-center">
                    {watch.image ? (
                       <img src={getProxiedImageUrl(watch.image)} alt={watch.modelName} className="object-contain w-full h-full mix-blend-multiply" />
                    ) : (
                       <div className="w-full h-full bg-[#f6f3ef] rounded-xl flex items-center justify-center">
                         <span className="text-[#a8a19b] text-xs">Görsel Yok</span>
                       </div>
                    )}
                 </div>
               </div>

               <div className="flex flex-col text-center border-b border-[#e5ddd2] pb-8 mb-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7f262b]">{watch.brand}</p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#171514]">{watch.modelName}</h3>
                  <p className="mt-3 text-xs text-[#7a716b]">Ref: {watch.ref || watch.id || 'Teyit Edilecek'}</p>
               </div>

               <div className="flex justify-between items-end mb-8">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#625a54] font-medium">Toplam Tutar</span>
                  <span className="text-3xl font-semibold tracking-[-0.03em] text-[#171514]">
                     {watch.price}
                  </span>
               </div>

               <div className="mt-auto space-y-4 pt-6 border-t border-[#e5ddd2]">
                  <div className="flex items-center gap-4 text-[#625a54] text-xs">
                     <Check className="w-4 h-4 text-[#7f262b]" />
                     <span>Ekspertiz ve Orijinallik Garantisi</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#625a54] text-xs">
                     <ShieldCheck className="w-4 h-4 text-[#7f262b]" />
                     <span>Ücretsiz Özel Sigortalı VIP Teslimat</span>
                  </div>
               </div>
            </div>

            {/* Right Side: Payment Form */}
            <div className="w-full lg:w-[60%] p-8 lg:p-12 flex flex-col">
               <div className="mb-10">
                 <h1 className="text-2xl md:text-3xl font-semibold tracking-[-0.035em] text-[#171514] mb-3">Fatura ve Teslimat</h1>
                 <p className="text-sm text-[#625a54] leading-relaxed">Siparişinizin güvenli bir şekilde tarafınıza ulaştırılması için iletişim ve fatura bilgilerinizi eksiksiz giriniz.</p>
               </div>

               {error && <div className="mb-8 border-l-2 border-[#7f262b] bg-[#f7f1ed] px-5 py-4 text-sm leading-6 text-[#7f262b] font-medium">{error}</div>}

               <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label htmlFor="custName" className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#625a54]">Ad Soyad *</label>
                       <input id="custName" value={form.custName} onChange={updateField} className="w-full bg-[#fdfbfa] border border-[#e5ddd2] px-4 py-3.5 text-sm text-[#171514] outline-none focus:border-[#7f262b] focus:ring-1 focus:ring-[#7f262b] transition-all rounded-md" placeholder="Kimlikte yazan adınız" />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="custPhone" className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#625a54]">Telefon *</label>
                       <input id="custPhone" value={form.custPhone} onChange={updateField} className="w-full bg-[#fdfbfa] border border-[#e5ddd2] px-4 py-3.5 text-sm text-[#171514] outline-none focus:border-[#7f262b] focus:ring-1 focus:ring-[#7f262b] transition-all rounded-md" placeholder="05XX XXX XX XX" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label htmlFor="custIdentity" className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#625a54]">T.C. / Pasaport No *</label>
                       <input id="custIdentity" value={form.custIdentity} onChange={updateField} className="w-full bg-[#fdfbfa] border border-[#e5ddd2] px-4 py-3.5 text-sm text-[#171514] outline-none focus:border-[#7f262b] focus:ring-1 focus:ring-[#7f262b] transition-all rounded-md" placeholder="Yasal fatura zorunluluğu" />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="email" className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#625a54]">E-Posta</label>
                       <input id="email" value={form.email} onChange={updateField} type="email" className="w-full bg-[#fdfbfa] border border-[#e5ddd2] px-4 py-3.5 text-sm text-[#171514] outline-none focus:border-[#7f262b] focus:ring-1 focus:ring-[#7f262b] transition-all rounded-md" placeholder="Fatura gönderimi için" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label htmlFor="custAddress" className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#625a54]">Teslimat ve Fatura Adresi *</label>
                    <textarea id="custAddress" value={form.custAddress} onChange={updateField} rows={3} className="w-full bg-[#fdfbfa] border border-[#e5ddd2] px-4 py-3.5 text-sm text-[#171514] outline-none focus:border-[#7f262b] focus:ring-1 focus:ring-[#7f262b] transition-all resize-none rounded-md" placeholder="Açık adres bilgilerinizi giriniz" />
                 </div>
               </div>

               <div className="mt-8 rounded-xl border border-[#e5ddd2] bg-[#f8f4ef] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7f262b]">ÖNEMLİ BİLGİLENDİRME</p>
                  <p className="mt-2 text-xs leading-6 text-[#665e58]">Fiyat, stok ve temin bilgileri piyasa koşullarına göre değişebilir. Bu form bir ön sipariş talebidir; nihai ürün kapsamı, teslim yöntemi ve varsa garanti/sertifika detayları müşteri temsilcimiz tarafından sizinle ödeme öncesinde yazılı olarak teyit edilecektir.</p>
               </div>

               <button onClick={startPayment} disabled={loading} className="mt-10 flex min-h-[56px] w-full items-center justify-center gap-3 bg-[#171514] px-5 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#7f262b] disabled:opacity-70 disabled:cursor-not-allowed rounded-md">
                  {loading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                     <>Satın Alma Talebini Gönder <ArrowRight className="w-4 h-4" /></>
                  )}
               </button>

               <div className="mt-8 flex items-center justify-center gap-2 text-[#847b74] text-xs font-medium">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Şifreli Güvenli Bağlantı</span>
               </div>
            </div>
         </div>
         
      </div>
    </div>
  );
}
