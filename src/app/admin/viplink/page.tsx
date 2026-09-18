'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Copy, KeyRound, Link2, LogOut, RotateCcw, ShieldCheck, Trash2, Watch } from 'lucide-react';

type VipLinkRow = {
  id: string;
  name: string;
  price: number;
  state: 'active' | 'revoked';
  createdAt: number;
  expiresAt: number;
  revokedAt: number;
  paymentState: 'idle' | 'creating' | 'ready' | 'uncertain';
  paymentUpdatedAt: number;
  reconciledAt: number;
  paymentProviderOrderId: string;
  paymentEvidenceId: string;
  paymentLastError: string;
};

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function money(value: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value || 0);
}

function dateTime(value: number) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('tr-TR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value));
}

export default function VipLinkGenerator() {
  const [authLoading, setAuthLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginKey, setLoginKey] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedId, setGeneratedId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rows, setRows] = useState<VipLinkRow[]>([]);
  const [rowsLoading, setRowsLoading] = useState(false);
  const [revokingId, setRevokingId] = useState('');

  const rawAmount = Number(amount.replace(/\D/g, '') || 0);
  const formattedAmount = rawAmount ? new Intl.NumberFormat('tr-TR').format(rawAmount) : '';
  const activeCount = useMemo(
    () => rows.filter((row) => row.state === 'active' && row.expiresAt > Date.now() && row.paymentState === 'idle').length,
    [rows]
  );

  const loadLinks = useCallback(async () => {
    setRowsLoading(true);
    try {
      const response = await fetch('/api/admin/vip-links', { cache: 'no-store', credentials: 'same-origin' });
      const data = await response.json();
      if (response.status === 401) {
        setAuthenticated(false);
        setRows([]);
        return;
      }
      if (!response.ok || !data.success) throw new Error(data.message || 'VIP link listesi alınamadı.');
      setRows(Array.isArray(data.links) ? data.links : []);
    } catch (e: unknown) {
      setError(errorMessage(e, 'VIP link listesi alınamadı.'));
    } finally {
      setRowsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch('/api/admin-session', { cache: 'no-store', credentials: 'same-origin' });
        const data = await response.json();
        if (!active) return;
        const ok = Boolean(response.ok && data.authenticated);
        setAuthenticated(ok);
        if (ok) await loadLinks();
      } catch {
        if (active) setAuthenticated(false);
      } finally {
        if (active) setAuthLoading(false);
      }
    })();
    return () => { active = false; };
  }, [loadLinks]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    if (!loginKey || !/^\d{6}$/.test(loginOtp)) {
      setError('Yönetim anahtarı ve 6 haneli doğrulama kodu zorunludur.');
      return;
    }
    setLoginLoading(true);
    try {
      const response = await fetch('/api/admin-session', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: loginKey, otp: loginOtp }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Yönetim doğrulaması başarısız.');
      setLoginKey('');
      setLoginOtp('');
      setAuthenticated(true);
      await loadLinks();
    } catch (e: unknown) {
      setError(errorMessage(e, 'Yönetim doğrulaması başarısız.'));
    } finally {
      setLoginLoading(false);
    }
  }

  async function logout() {
    await fetch('/api/admin-session', { method: 'DELETE', credentials: 'same-origin' }).catch(() => undefined);
    setAuthenticated(false);
    setRows([]);
    setGeneratedLink('');
    setGeneratedId('');
    setError('');
  }

  async function generateLink() {
    setError('');
    setGeneratedLink('');
    setGeneratedId('');
    if (!title.trim() || rawAmount <= 0) {
      setError('Ürün adı ve geçerli tutar zorunludur.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/vip-link', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), amount: rawAmount }),
      });
      const data = await response.json();
      if (response.status === 401) {
        setAuthenticated(false);
        throw new Error('Yönetim oturumunun süresi doldu. Yeniden giriş yapın.');
      }
      if (!response.ok || !data.success) throw new Error(data.message || 'VIP link oluşturulamadı.');
      setGeneratedLink(data.url);
      setGeneratedId(data.id);
      await loadLinks();
    } catch (e: unknown) {
      setError(errorMessage(e, 'VIP link oluşturulamadı.'));
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function revokeLink(id: string) {
    if (!id || revokingId) return;
    if (!window.confirm('Bu VIP ödeme linki kalıcı olarak iptal edilsin mi?')) return;
    setRevokingId(id);
    setError('');
    try {
      const response = await fetch('/api/vip-link', {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.status === 401) {
        setAuthenticated(false);
        throw new Error('Yönetim oturumunun süresi doldu. Yeniden giriş yapın.');
      }
      if (!response.ok || !data.success) throw new Error(data.message || 'VIP link iptal edilemedi.');
      if (generatedId === id) {
        setGeneratedLink('');
        setGeneratedId('');
      }
      await loadLinks();
    } catch (e: unknown) {
      setError(errorMessage(e, 'VIP link iptal edilemedi.'));
    } finally {
      setRevokingId('');
    }
  }

  if (authLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f7f5f1] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#846b32]">Güvenli yönetim oturumu doğrulanıyor…</div>;
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f7f5f1] px-4 py-12 text-[#171615] sm:px-6 lg:py-20">
        <div className="mx-auto max-w-md border border-[#ded8cf] bg-white p-7 shadow-[0_24px_80px_rgba(35,26,19,.08)] sm:p-9">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#846b32]/35 bg-[#846b32]/5"><ShieldCheck className="h-5 w-5 text-[#846b32]" strokeWidth={1.4} /></div>
          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#846b32]">SAATCHI / Private Office</p>
          <h1 className="mt-3 text-3xl font-medium tracking-[-0.035em]">VIP Link Yönetimi</h1>
          <p className="mt-3 text-sm leading-6 text-[#716b64]">Yönetim anahtarı yalnız bu oturumu açmak için kullanılır; tarayıcıda kalıcı olarak saklanmaz. Oturum HttpOnly güvenli çerez ile devam eder.</p>
          <form onSubmit={login} className="mt-8">
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f6862]">Yönetim Doğrulaması</label>
            <div className="flex items-center border border-[#d9d3cb] bg-[#fbfaf8] px-4 focus-within:border-[#846b32]"><KeyRound className="mr-3 h-4 w-4 text-[#8d8379]" /><input type="password" value={loginKey} onChange={(e) => setLoginKey(e.target.value)} autoComplete="off" spellCheck={false} maxLength={256} className="w-full bg-transparent py-4 text-sm outline-none" placeholder="Yönetim anahtarı" /></div>
            <label className="mb-2 mt-4 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f6862]">2 Adımlı Doğrulama</label>
            <input type="text" value={loginOtp} onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" maxLength={6} className="w-full border border-[#d9d3cb] bg-[#fbfaf8] px-4 py-4 text-center font-mono text-lg tracking-[0.35em] outline-none focus:border-[#846b32]" placeholder="000000" />
            {error && <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
            <button disabled={loginLoading} className="mt-5 w-full bg-[#171615] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black disabled:opacity-50">{loginLoading ? 'Doğrulanıyor…' : 'Güvenli Oturum Aç'}</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5f1] px-4 py-10 text-[#171615] sm:px-6 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-[#d8d2c9] pb-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#846b32]">SAATCHI / Private Office</p>
            <h1 className="mt-2 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">VIP tahsilat linki</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#746e67]">Link fiyatı HMAC ile imzalanır, Firestore kaydıyla eşleştirilir ve iptal edildiği anda checkout ile ödeme oluşturma akışında reddedilir.</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 border border-[#d2cbc1] bg-white px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5f5953] hover:border-[#9e948a]"><LogOut className="h-4 w-4" /> Oturumu Kapat</button>
        </header>

        <div className="mt-8 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="border border-[#ded8cf] bg-white p-6 shadow-[0_22px_70px_rgba(35,26,19,.06)] sm:p-8">
            <div className="mb-7 flex items-center justify-between border-b border-[#ebe6df] pb-5">
              <div><p className="text-[10px] uppercase tracking-[0.2em] text-[#8e857c]">Yeni bağlantı</p><h2 className="mt-1 text-xl font-medium">Özel ödeme talebi</h2></div>
              <Watch className="h-6 w-6 text-[#846b32]" strokeWidth={1.2} />
            </div>
            <div className="space-y-5">
              <div><label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.17em] text-[#706a63]">Ürün / Sipariş Adı</label><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Örn. Rolex Submariner / Özel Sipariş" className="w-full border border-[#d9d3cb] bg-[#fbfaf8] px-4 py-4 text-sm outline-none focus:border-[#846b32]" /></div>
              <div><label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.17em] text-[#706a63]">Tahsilat Tutarı</label><div className="flex items-center border border-[#d9d3cb] bg-[#fbfaf8] px-4 focus-within:border-[#846b32]"><span className="mr-3 text-xl text-[#846b32]">₺</span><input value={formattedAmount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" className="w-full bg-transparent py-4 text-2xl font-light outline-none" /></div></div>
              {error && <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
              <button onClick={generateLink} disabled={loading} className="w-full bg-[#171615] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white hover:bg-black disabled:opacity-50">{loading ? 'Oluşturuluyor…' : 'Güvenli VIP Link Oluştur'}</button>
            </div>

            {generatedLink && (
              <div className="mt-7 border-t border-[#ebe6df] pt-6">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#846b32]"><Check className="h-4 w-4" /> Link hazır</p>
                <div className="break-all border border-[#ded8cf] bg-[#faf8f5] p-4 font-mono text-xs leading-5 text-[#5f5953]">{generatedLink}</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button onClick={copyLink} className="inline-flex items-center justify-center gap-2 border border-[#cfc8bf] bg-white px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.15em]"><Copy className="h-4 w-4" /> {copied ? 'Kopyalandı' : 'Linki Kopyala'}</button>
                  <a href={`https://wa.me/?text=${encodeURIComponent(`${title}\n\nGüvenli SAATCHI VIP ödeme bağlantınız:\n${generatedLink}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#846b32] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white"><Link2 className="h-4 w-4" /> WhatsApp ile Linki İlet</a>
                </div>
              </div>
            )}
          </section>

          <section className="border border-[#ded8cf] bg-white p-6 shadow-[0_22px_70px_rgba(35,26,19,.06)] sm:p-8">
            <div className="flex items-end justify-between gap-4 border-b border-[#ebe6df] pb-5">
              <div><p className="text-[10px] uppercase tracking-[0.2em] text-[#8e857c]">Kalıcı kayıt</p><h2 className="mt-1 text-xl font-medium">VIP Link Geçmişi</h2><p className="mt-1 text-xs text-[#8a837c]">Aktif: {activeCount}</p></div>
              <button onClick={loadLinks} disabled={rowsLoading} className="inline-flex items-center gap-2 border border-[#d2cbc1] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#665f58]"><RotateCcw className={`h-3.5 w-3.5 ${rowsLoading ? 'animate-spin' : ''}`} /> Yenile</button>
            </div>

            <div className="mt-3 max-h-[640px] divide-y divide-[#eee9e3] overflow-y-auto">
              {!rowsLoading && rows.length === 0 && <p className="py-10 text-center text-sm text-[#8a837c]">Henüz kalıcı VIP link kaydı yok.</p>}
              {rows.map((row) => {
                const expired = row.expiresAt <= Date.now();
                const active = row.state === 'active' && !expired && row.paymentState === 'idle';
                const stateLabel =
                  row.state === 'revoked'
                    ? 'İptal edildi'
                    : expired
                      ? 'Süresi doldu'
                      : row.paymentState === 'creating'
                        ? 'Ödeme hazırlanıyor'
                        : row.paymentState === 'ready'
                          ? 'Ödeme oturumu açıldı'
                          : row.paymentState === 'uncertain'
                            ? 'Mutabakat gerekli'
                            : 'Aktif';
                return (
                  <div key={row.id} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2"><p className="truncate text-sm font-semibold">{row.name}</p><span className={`rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-[0.13em] ${active ? 'bg-emerald-50 text-emerald-700' : 'bg-[#f2eeea] text-[#776f67]'}`}>{stateLabel}</span></div>
                      <p className="mt-1 truncate font-mono text-[9px] text-[#9b938b]">{row.id}</p>
                      <p className="mt-1 text-[10px] text-[#8b837b]">Oluşturma: {dateTime(row.createdAt)} · Bitiş: {dateTime(row.expiresAt)}</p>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:justify-end"><span className="text-sm font-semibold text-[#846b32]">{money(row.price)}</span>{active && <button onClick={() => revokeLink(row.id)} disabled={revokingId === row.id} className="inline-flex items-center gap-2 border border-red-200 bg-red-50 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.13em] text-red-700 disabled:opacity-50"><Trash2 className="h-3.5 w-3.5" /> {revokingId === row.id ? 'İptal…' : 'Linki İptal Et'}</button>}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
