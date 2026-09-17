import Link from 'next/link';
import { ArrowUpRight, UserRound, UsersRound } from 'lucide-react';

export default function CarrenBrandPage() {
  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f5f0e8]">
      <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b98284]">SAATCHI / Carren</p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Carren koleksiyonunu seç.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#9a928a]">Carren saatleri Erkek ve Kadın alt koleksiyonlarında ayrı kataloglanır. Yalnızca kaynak fiyatı doğrulanabilen modeller yayına alınır.</p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Link href="/markalar/carren/erkek" className="group min-h-[280px] border border-white/10 bg-[#141210] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#7f262b]/70">
            <div className="flex items-center justify-between"><UserRound className="h-6 w-6 text-[#c2a768]" strokeWidth={1.2} /><ArrowUpRight className="h-5 w-5 text-[#746b64] group-hover:text-[#c2a768]" /></div>
            <div className="mt-28"><p className="text-[9px] uppercase tracking-[0.24em] text-[#9f6d70]">01 / Men</p><h2 className="mt-3 text-3xl font-medium">Carren Erkek</h2></div>
          </Link>
          <Link href="/markalar/carren/kadin" className="group min-h-[280px] border border-white/10 bg-[#141210] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#7f262b]/70">
            <div className="flex items-center justify-between"><UsersRound className="h-6 w-6 text-[#c2a768]" strokeWidth={1.2} /><ArrowUpRight className="h-5 w-5 text-[#746b64] group-hover:text-[#c2a768]" /></div>
            <div className="mt-28"><p className="text-[9px] uppercase tracking-[0.24em] text-[#9f6d70]">02 / Women</p><h2 className="mt-3 text-3xl font-medium">Carren Kadın</h2></div>
          </Link>
        </div>
      </main>
    </div>
  );
}
