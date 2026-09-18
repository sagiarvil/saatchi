'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';

type VipSummary = { id: string; name: string; price: number; exp: number };

type PaymentResponse = {
  status?: string;
  message?: string;
  redirectUrl?: string | null;
  gatewayUrl?: string | null;
  formData?: Record<string, string> | null;
};

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const queryToken = searchParams.get('token') || '';
  const [token, setToken] = useState(queryToken);
  const [tokenResolved, setTokenResolved] = useState(Boolean(queryToken));
  const [summary, setSummary] = useState<VipSummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ custName: '', custPhone: '', custIdentity: '', email: '', custAddress: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [preInformationAccepted, setPreInformationAccepted] = useState(false);
  const [highValueAccepted, setHighValueAccepted] = useState(false);

  const updateField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    queueMicrotask(() => {
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const hashToken = hashParams.get('token') || '';
      const resolvedToken = hashToken || queryToken;

      setToken(resolvedToken);
      setTokenResolved(true);

      // Bearer token yalnız ilk açılışta okunur; browser history/address bar yüzeyinden hemen silinir.
      if (resolvedToken && (window.location.search || window.location.hash)) {
        window.history.replaceState(null, '', '/vip-checkout');
      }
    });
  }, [queryToken]);

  useEffect(() => {
    if (!tokenResolved || !token) return;

    setLoadingSummary(true);
    setError('');
    let active = true;
    fetch('/api/vip-link/verify', {
      method: 'POST',
      cache: 'no-store',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json().then((data) => ({ res, data })))
      .then(({ res, data }) => {
        if (!res.ok || !data.success) throw new Error(data.message || 'VIP bağlantısı geçersiz veya süresi dolmuş.');
        if (active) setSummary(data.payload as VipSummary);
      })
      .catch((fetchError: unknown) => {
        if (active) setError(errorMessage(fetchError, 'VIP bağlantısı doğrulanamadı.'));
      })
      .finally(() => {
        if (active) setLoadingSummary(false);
      });

    return () => {
      active = false;
    };
  }, [token, tokenResolved]);

  function followProvider(data: PaymentResponse) {
    const assertHttpsUrl = (value: unknown) => {
      const url = new URL(String(value || ''));
      if (url.protocol !== 'https:' || url.username || url.password) {
        throw new Error('Ödeme kuruluşu güvenli yönlendirme bilgisi üretmedi.');
      }
      return url.toString();
    };

    if (data.gatewayUrl && data.formData && typeof data.formData === 'object') {
      const paymentForm = document.createElement('form');
      paymentForm.method = 'POST';
      paymentForm.action = assertHttpsUrl(data.gatewayUrl);

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

    if (data.redirectUrl) {
      window.location.assign(assertHttpsUrl(data.redirectUrl));
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
      setError('Ödeme öncesi zorunlu sözleşme, bilgilendirme ve güvenli teslim koşullarını onaylayın.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          ...form,
          termsAccepted,
          preInformationAccepted,
          highValueDeliveryAccepted: highValueAccepted,
        }),
      });

      const data = await response.json() as PaymentResponse;
      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Ödeme oturumu oluşturulamadı.');
      }
      followProvider(data);
    } catch (paymentError: unknown) {
      setError(errorMessage(paymentError, 'Ödeme oturumu oluşturulamadı.'));
      setLoading(false);
    }
  }

  if (!tokenResolved || loadingSummary) {
    return <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center text-gray-500 text-sm tracking-wide">Güvenli bağlantı doğrulanıyor…</div>;
  }

  if (!token) {
    return <div className="min-h-screen bg-[#f7f9fc] px-4 py-12 text-gray-900"><div className="mx-auto max-w-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600 rounded-md shadow-sm">Geçersiz veya eksik VIP bağlantısı.</div></div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] px-4 py-12 text-gray-900 sm:px-6 lg:py-16">
      <style>{`
        header, nav, footer, .premium-back-button { display: none !important; }
      `}</style>
      <div className="mx-auto max-w-2xl">
        {!summary ? (
          <div className="mx-auto border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600 rounded-md shadow-sm">{error || 'Bağlantı geçersiz.'}</div>
        ) : (
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            <div className="bg-blue-600 px-8 py-10 text-center text-white">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 mb-4 backdrop-blur-sm">
                <ShieldCheck className="h-7 w-7 text-white" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-medium tracking-tight">Güvenli Ödeme Noktası</h1>
              <p className="mt-3 text-sm font-medium text-white/85">{summary.name}</p>
              <p className="mt-4 text-5xl font-light tracking-tight">
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(summary.price)}
              </p>
            </div>

            <section className="p-6 sm:p-10">
              <div className="mb-6 grid gap-3 border-b border-gray-100 pb-5 text-sm text-gray-600 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">Satıcı</p>
                  <p className="mt-1 font-medium text-gray-800">SAATCHI SAAT - SEMİH SONBAHAR</p>
                  <p className="mt-1 text-xs leading-5">Menderes Caddesi No:231/B, Buca / İzmir</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">Teslim Yöntemi</p>
                  <p className="mt-1 font-medium text-gray-800">Showroom teslimi</p>
                  <p className="mt-1 text-xs leading-5">Teslimde kimlik ve sipariş doğrulaması uygulanır.</p>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                <UserRound className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-medium text-gray-800">Fatura ve İletişim Bilgileri</h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <input id="custName" value={form.custName} onChange={updateField} placeholder="Ad Soyad *" autoComplete="name" className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                <input id="custPhone" value={form.custPhone} onChange={updateField} placeholder="Telefon *" autoComplete="tel" inputMode="tel" className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                <input id="custIdentity" value={form.custIdentity} onChange={updateField} placeholder="T.C. / Pasaport / Vergi No *" autoComplete="off" className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                <input id="email" value={form.email} onChange={updateField} placeholder="E-posta" type="email" autoComplete="email" className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                <textarea id="custAddress" value={form.custAddress} onChange={updateField} placeholder="Fatura / iletişim adresi" rows={3} autoComplete="street-address" className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm sm:col-span-2" />
              </div>

              <p className="mt-5 text-xs leading-5 text-gray-500">
                Bu formda verdiğiniz kimlik ve iletişim bilgileri sipariş, ödeme güvenliği, faturalama ve teslim süreçleri için işlenir. Ayrıntılar için{' '}
                <Link href="/kvkk-aydinlatma-metni" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline underline-offset-2">KVKK Aydınlatma Metni</Link>
                {' '}ve{' '}
                <Link href="/gizlilik-politikasi" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline underline-offset-2">Gizlilik Politikası</Link>.
              </p>

              <div className="mt-7 space-y-3 border-t border-gray-100 pt-6 text-sm text-gray-600">
                <label className="flex items-start gap-3">
                  <input type="checkbox" checked={preInformationAccepted} onChange={(e) => setPreInformationAccepted(e.target.checked)} className="mt-1 h-4 w-4" />
                  <span><Link href="/on-bilgilendirme-formu" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline underline-offset-2">Ön Bilgilendirme Formu</Link>&apos;nu okudum ve kabul ediyorum.</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 h-4 w-4" />
                  <span><Link href="/mesafeli-satis-sozlesmesi" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline underline-offset-2">Mesafeli Satış Sözleşmesi</Link>&apos;ni okudum ve kabul ediyorum.</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" checked={highValueAccepted} onChange={(e) => setHighValueAccepted(e.target.checked)} className="mt-1 h-4 w-4" />
                  <span><Link href="/yuksek-degerli-urun-teslimi" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline underline-offset-2">Yüksek Değerli Ürün Teslimi</Link> koşullarını kabul ediyorum.</span>
                </label>
                <p className="pl-7 text-xs leading-5 text-gray-500">
                  <Link href="/iade-degisim-cayma" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline underline-offset-2">İade, Değişim ve Cayma Politikası</Link>
                  {' '}ödeme öncesinde incelenebilir.
                </p>
              </div>

              {error && <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 rounded-md">{error}</div>}

              <button onClick={startPayment} disabled={loading || !termsAccepted || !preInformationAccepted || !highValueAccepted} className="mt-8 flex w-full items-center justify-center gap-3 bg-blue-600 rounded-md px-5 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-blue-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'İşleminiz hazırlanıyor…' : 'Ödeme Yükümlülüğü Doğuran Güvenli Ödemeyi Başlat'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>

              <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                <LockKeyhole className="h-3 w-3" /> TLS ile şifreli bağlantı · Kart bilgileri banka/ödeme kuruluşu ekranında girilir
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VIPCheckout() {
  return <React.Suspense fallback={<div className="min-h-screen bg-[#f7f9fc]" />}><CheckoutContent /></React.Suspense>;
}
