'use client';

import { useState } from 'react';
import { Check, Copy, KeyRound, Link2, ShieldCheck, Sparkles, Watch } from 'lucide-react';

export default function VipLinkGenerator() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const rawAmount = Number(amount.replace(/\D/g, '') || 0);
  const formattedAmount = rawAmount ? new Intl.NumberFormat('tr-TR').format(rawAmount) : '';

  async function generateLink() {
    setError('');
    setGeneratedLink('');
    if (!title.trim() || rawAmount <= 0 || !adminKey) {
      setError('Ürün adı, tutar ve yönetim anahtarı zorunludur.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/vip-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-vip-admin-key': adminKey },
        body: JSON.stringify({ title: title.trim(), amount: rawAmount })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'VIP link oluşturulamadı.');
      setGeneratedLink(data.url);
    } catch (e: any) {
      setError(e.message || 'VIP link oluşturulamadı.');
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="min-h-screen bg-[#0d0c0b] px-4 py-12 text-[#f5f0e8] sm:px-6 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <section className="lg:sticky lg:top-28">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b98284]">SAATCHI / Private Office</p>
            <h1 className="mt-5 text-4xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-5xl">VIP tahsilat linki.</h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#9f9790]">Tutar tarayıcıdan değiştirilemez. Link 7 gün geçerlidir ve ödeme kaydı Belgin yönetim merkezinde açılır.</p>
            <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs leading-6 text-[#817a74]">
              <p className="flex gap-3"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#c2a768]" /> HMAC imzalı, sunucu tarafından doğrulanan fiyat ve ürün adı.</p>
              <p className="flex gap-3"><Link2 className="mt-1 h-4 w-4 shrink-0 text-[#c2a768]" /> Belgin Admin sipariş ve ödeme kayıt zinciriyle ortak çalışır.</p>
            </div>
          </section>

          <section className="border border-white/10 bg-[linear-gradient(145deg,#151311_0%,#11100f_55%,#1b0e10_100%)] p-6 shadow-[0_30px_100px_rgba(0,0,0,.35)] sm:p-9">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#7f7770]">Yeni bağlantı</p>
                <h2 className="mt-2 text-xl font-medium">Özel ödeme talebi</h2>
              </div>
              <Watch className="h-7 w-7 text-[#c2a768]" strokeWidth={1.1} />
            </div>

            <div className="space-y-7">
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a69d95]">Ürün / Sipariş Adı</label>
                  <button type="button" onClick={() => setTitle('Lüks Kol Saati')} className="inline-flex items-center gap-2 border border-[#7f262b]/70 bg-[#7f262b]/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d9babb] transition-colors hover:bg-[#7f262b]/20"><Sparkles className="h-3.5 w-3.5" /> Lüks Kol Saati</button>
                </div>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Örn. Rolex Submariner / Özel Sipariş" className="w-full border border-white/10 bg-black/25 px-4 py-4 text-base text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#9b6063]" />
              </div>

              <div>
                <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a69d95]">Tahsilat Tutarı</label>
                <div className="flex items-center border border-white/10 bg-black/25 px-4 focus-within:border-[#9b6063]">
                  <span className="mr-3 text-xl text-[#c2a768]">₺</span>
                  <input value={formattedAmount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" className="w-full bg-transparent py-4 text-2xl font-light text-white outline-none placeholder:text-white/15" />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a69d95]">Yönetim Anahtarı</label>
                <div className="flex items-center border border-white/10 bg-black/25 px-4 focus-within:border-[#9b6063]">
                  <KeyRound className="mr-3 h-4 w-4 text-[#6f6862]" />
                  <input type="password" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} autoComplete="current-password" placeholder="••••••••••••" className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/15" />
                </div>
              </div>

              {error && <div className="border border-red-900/40 bg-red-950/25 px-4 py-3 text-sm text-red-200">{error}</div>}

              <button onClick={generateLink} disabled={loading} className="w-full bg-[#f3eee6] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#171311] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Oluşturuluyor…' : 'Güvenli VIP Link Oluştur'}</button>
            </div>

            {generatedLink && (
              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c2a768]"><Check className="h-4 w-4" /> Link hazır</p>
                <div className="break-all border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-[#bbb2a9]">{generatedLink}</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button onClick={copyLink} className="inline-flex items-center justify-center gap-2 border border-white/15 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] hover:border-white/30"><Copy className="h-4 w-4" /> {copied ? 'Kopyalandı' : 'Linki Kopyala'}</button>
                  <a href={`https://wa.me/?text=${encodeURIComponent(`${title}\n\nGüvenli SAATCHI VIP ödeme bağlantınız:\n${generatedLink}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center border border-[#7f262b]/70 bg-[#7f262b]/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#ead7d7]">WhatsApp ile gönder</a>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
