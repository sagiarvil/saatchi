import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function TestSuccess() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col items-center justify-center p-6 text-gray-900">
      <style>{`
        header, nav, footer { display: none !important; }
      `}</style>
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-3 text-gray-800">Test Ödemesi Başarılı!</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          Sanal POS onaylarınız gelene kadar sistem test moduna alınmıştır. Bu sayfa, ödemenin başarıyla tamamlandığını simüle eder.
        </p>
        <Link href="/" className="inline-block bg-blue-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
