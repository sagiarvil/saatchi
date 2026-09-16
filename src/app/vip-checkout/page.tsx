'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, LockKeyhole, ShieldCheck, Store, UserRound } from 'lucide-react';

type VipSummary = { id: string; name: string; price: number; exp: number };

function CheckoutContent() {
  const params = useSearchParams();
  const token = params.get('token') || '';
  const [summary, setSummary] = useState<VipSummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ custName: '', custPhone: '', custIdentity: '', custAddress: '', email: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [preInformationAccepted, setPreInformationAccepted] = useState(false);
  const [highValueAccepted, setHighValueAccepted] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (!token) throw new Error('Geçerli bir VIP ödeme bağlantısı gerekli.');
        const response = await fetch(`/api/vip-link?token=${encodeURIComponent(token)}`, { cache: 'no-store' });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || 'VIP bağlantısı doğrulanamadı.');
        if (active) setSummary(data.payload);
      } catch (e: any) {
        if (active) setError(e.message || 'VIP bağlantısı doğrulanamadı.');
      } finally {
        if (active) setLoadingSummary(false);
      }
    }
    load();
    return () => { active = false; };
  }, [token]);

  function updateField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function followProvider(data: any) {
    const direct = data.redirectUrl || data.iframeUrl || data.gatewayUrl;
    if (data.formHtml) {
      document.open();
      document.write(data.formHtml);
      document.close();
      return;
    }
    if (data.gatewayUrl && data.formData && typeof data.formData === 'object') {
      const paymentForm = document.createElement('form');
      paymentForm.method = 'POST';
      paymentForm.action = data.gatewayUrl;
      Object.entries(data.formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value ?? '');
        paymentForm.appendChild(input);
      });
      document.body.appendChild(paymentForm);
      paymentForm.submit();
      return;
    }
    if (direct) {
      window.location.assign(direct);
      return;
    }
    throw new Error('Ödeme kuruluşu yönlendirme bilgisi üretmedi.');
  }

  async function startPayment() {
    setError('');
    if (!summary) return;
    if (!form.custName.trim() || !form.custPhone.trim() || !form.custIdentity.trim()) {
      setError('Ad soyad, telefon ve kimlik bilgisi zorunludur.');
      return;
    }
    if (!termsAccepted || !preInformationAccepted || !highValueAccepted) {
      setError('Zorunlu hukuki bilgilendirmeler ve güvenli teslim koşulu onaylanmalıdır.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          ...form,
          termsAccepted,
          preInformationAccepted,
          highValueDeliveryAccepted: highValueAccepted,
          presentedAt: new Date().toISOString()
        })
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') throw new Error(data.message || 'Ödeme oturumu oluşturulamadı.');
      followProvider(data);
    } catch (e: any) {
      setError(e.message || 'Ödeme oturumu oluşturulamadı.');
      setLoading(false);
    }
  }

  if (loadingSummary) return <div className="min-h-screen bg-[#0d0c0b] flex items-center justify-center text-[#c2a768] text-xs uppercase tracking-[0.25em]">VIP bağlantısı doğrulanıyor…</div>;

  return (
    <div className="min-h-screen bg-[#0d0c0b] px-4 py-12 text-[#f5f0e8] sm:px-6 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b98284]">SAATCHI / Secure Collection</p>
          <h1 className="mt-4 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">VIP Ödeme Noktası</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#948d86]">Kart veriniz SAATCHI tarafından kalıcı olarak tutulmaz. Ödeme, aktif banka veya yetkili ödeme kuruluşunun güvenli akışında tamamlanır.</p>
        </div>

        {!summary ? (
          <div className="mx-auto max-w-xl border border-red-900/40 bg-red-950/20 p-6 text-center text-sm text-red-200">{error || 'VIP bağlantısı geçersiz.'}</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <aside className="border border-white/10 bg-[linear-gradient(145deg,#181513_0%,#12100f_62%,#1b0d0f_100%)] p-7 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7f262b]/60 bg-[#7f262b]/10"><ShieldCheck className="h-5 w-5 text-[#c2a768]" strokeWidth={1.2} /></div>
              <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-[#837b74]">Tahsilat konusu</p>
              <h2 className="mt-3 text-2xl font-medium leading-tight">{summary.name}</h2>
              <p className="mt-6 text-4xl font-light tracking-[-0.04em]">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(summary.price)}</p>
              <div className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-[#89827b]">
                <p>Referans: <span className="text-[#c9c0b7]">{summary.id}</span></p>
                <p className="mt-2 flex items-center gap-2"><Store className="h-4 w-4 text-[#c2a768]" /> Güvenli showroom teslim zinciri</p>
                <p className="mt-2 flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-[#c2a768]" /> Belgin merkezli ödeme kayıt altyapısı</p>
              </div>
            </aside>

            <section className="border border-white/10 bg-[#121110] p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-5"><UserRound className="h-5 w-5 text-[#c2a768]" /><h2 className="text-lg font-medium">Fatura ve teslim bilgileri</h2></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input id="custName" value={form.custName} onChange={updateField} placeholder="Ad Soyad *" className="border border-white/10 bg-black/25 px-4 py-3.5 text-sm outline-none focus:border-[#8b4a4d]" />
                <input id="custPhone" value={form.custPhone} onChange={updateField} placeholder="Telefon *" className="border border-white/10 bg-black/25 px-4 py-3.5 text-sm outline-none focus:border-[#8b4a4d]" />
                <input id="custIdentity" value={form.custIdentity} onChange={updateField} placeholder="T.C. / Pasaport / Vergi No *" className="border border-white/10 bg-black/25 px-4 py-3.5 text-sm outline-none focus:border-[#8b4a4d]" />
                <input id="email" value={form.email} onChange={updateField} placeholder="E-posta" type="email" className="border border-white/10 bg-black/25 px-4 py-3.5 text-sm outline-none focus:border-[#8b4a4d]" />
                <textarea id="custAddress" value={form.custAddress} onChange={updateField} placeholder="Fatura / iletişim adresi" rows={3} className="border border-white/10 bg-black/25 px-4 py-3.5 text-sm outline-none focus:border-[#8b4a4d] sm:col-span-2" />
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs leading-5 text-[#a39b93]">
                <label className="flex items-start gap-3"><input type="checkbox" checked={preInformationAccepted} onChange={(e) => setPreInformationAccepted(e.target.checked)} className="mt-1" /><span><Link href="/on-bilgilendirme-formu" target="_blank" className="text-[#d5b8b9] underline">Ön Bilgilendirme Formu</Link>nu okudum.</span></label>
                <label className="flex items-start gap-3"><input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1" /><span><Link href="/mesafeli-satis-sozlesmesi" target="_blank" className="text-[#d5b8b9] underline">Mesafeli Satış Sözleşmesi</Link>ni okudum ve kabul ediyorum.</span></label>
                <label className="flex items-start gap-3"><input type="checkbox" checked={highValueAccepted} onChange={(e) => setHighValueAccepted(e.target.checked)} className="mt-1" /><span><Link href="/yuksek-degerli-urun-teslimi" target="_blank" className="text-[#d5b8b9] underline">Yüksek değerli ürün teslim ve kimlik doğrulama koşullarını</Link> kabul ediyorum.</span></label>
              </div>

              {error && <div className="mt-5 border border-red-900/40 bg-red-950/25 px-4 py-3 text-sm text-red-200">{error}</div>}

              <button onClick={startPayment} disabled={loading} className="mt-6 flex w-full items-center justify-center gap-3 bg-[#f3eee6] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.19em] text-[#171311] transition-colors hover:bg-white disabled:opacity-50">{loading ? 'Güvenli oturum hazırlanıyor…' : 'Güvenli ödemeye geç'} {!loading && <ArrowRight className="h-4 w-4" />}</button>
              <p className="mt-4 text-center text-[10px] leading-5 text-[#6f6862]">Ödeme kuruluşu SAATCHI ekranında sabitlenmez; aktif sağlayıcı Belgin ödeme motorundan yönetilir.</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VIPCheckout() {
  return <React.Suspense fallback={<div className="min-h-screen bg-[#0d0c0b]" />}><CheckoutContent /></React.Suspense>;
}
