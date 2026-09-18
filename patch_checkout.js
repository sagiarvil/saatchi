const fs = require('fs');
let content = fs.readFileSync('src/app/vip-checkout/page.tsx', 'utf8');

// The file has a lot of dark mode classes: bg-[#0d0c0b], text-[#f5f0e8], bg-[#121110], etc.
// We will just rewrite the CheckoutContent component to be completely clean and light-themed.

const newComponent = `
function CheckoutContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [summary, setSummary] = useState<any>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ custName: '', custPhone: '', custIdentity: '', email: '', custAddress: '' });
  
  // Rule 5: Checkboxes checked by default, but we'll hide them from the UI.
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [preInformationAccepted, setPreInformationAccepted] = useState(true);
  const [highValueAccepted, setHighValueAccepted] = useState(true);

  const updateField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.id]: e.target.value });

  useEffect(() => {
    if (!token) {
      setError('Geçersiz veya eksik VIP bağlantısı.');
      setLoadingSummary(false);
      return;
    }
    fetch(\`/api/vip-link?token=\${encodeURIComponent(token)}\`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.message || 'VIP bağlantısı geçersiz veya süresi dolmuş.');
        setSummary(data.payload);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoadingSummary(false));
  }, [token]);

  function followProvider(data: any) {
    const direct = data.url || data.paymentUrl;
    if (data.htmlContent) {
      document.open();
      document.write(data.htmlContent);
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

    setLoading(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          ...form,
          termsAccepted: true,
          preInformationAccepted: true,
          highValueDeliveryAccepted: true,
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

  if (loadingSummary) return <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center text-gray-500 text-sm tracking-wide">Güvenli bağlantı doğrulanıyor…</div>;

  return (
    <div className="min-h-screen bg-[#f7f9fc] px-4 py-12 text-gray-900 sm:px-6 lg:py-16">
      <style>{\`
        header, nav, footer, .premium-back-button { display: none !important; }
      \`}</style>
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
              <p className="mt-4 text-5xl font-light tracking-tight">
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(summary.price)}
              </p>
            </div>

            <section className="p-6 sm:p-10">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                <UserRound className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-medium text-gray-800">Fatura ve İletişim Bilgileri</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <input id="custName" value={form.custName} onChange={updateField} placeholder="Ad Soyad *" className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                <input id="custPhone" value={form.custPhone} onChange={updateField} placeholder="Telefon *" className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                <input id="custIdentity" value={form.custIdentity} onChange={updateField} placeholder="T.C. / Pasaport / Vergi No *" className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                <input id="email" value={form.email} onChange={updateField} placeholder="E-posta" type="email" className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                <textarea id="custAddress" value={form.custAddress} onChange={updateField} placeholder="Fatura / iletişim adresi" rows={3} className="border border-gray-300 bg-white rounded-md px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm sm:col-span-2" />
              </div>

              {/* Hukuki metinler (Gizli) */}
              <div className="hidden">
                <input type="checkbox" checked={preInformationAccepted} readOnly />
                <input type="checkbox" checked={termsAccepted} readOnly />
                <input type="checkbox" checked={highValueAccepted} readOnly />
              </div>

              {error && <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 rounded-md">{error}</div>}

              <button onClick={startPayment} disabled={loading} className="mt-8 flex w-full items-center justify-center gap-3 bg-blue-600 rounded-md px-5 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-blue-700 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'İşleminiz hazırlanıyor…' : 'Güvenli Ödemeyi Başlat'} 
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
              
              <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                <LockKeyhole className="h-3 w-3" /> 256-bit SSL Güvenli Bağlantı
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
`;

content = content.replace(/function CheckoutContent\(\) \{[\s\S]*\}\n\nexport default function VIPCheckout/, newComponent + '\nexport default function VIPCheckout');

fs.writeFileSync('src/app/vip-checkout/page.tsx', content);
console.log('Checkout page successfully rewritten.');
