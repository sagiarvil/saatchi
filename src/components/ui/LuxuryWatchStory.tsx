import React from 'react';

// Simple deterministic hash function based on string
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export function LuxuryWatchStory({ watch }: { watch: any }) {
  const brand = watch.brand || 'Lüks İsviçre Markası';
  const model = watch.modelName || 'Özel Seri';
  
  const hash = hashString(brand + model);
  
  // SEO ve Lüks saat jargonunu içeren uzun paragraflar
  const intros = [
    `Zamanın salt bir ölçü biriminden çıkıp bir sanat eserine dönüştüğü noktada, ${brand} efsanesi başlıyor. Haute Horlogerie (Yüksek Saatçilik) dünyasının en seçkin örneklerinden biri olan ${model}, yüzyıllara dayanan bir İsviçre geleneğinin modern dünyadaki en prestijli yansımasıdır. Bir saati sadece koldaki bir aksesuar olarak değil, nesilden nesile aktarılacak bir miras olarak görenlerin ilk tercihi olan bu eşsiz tasarım, mühendislik harikası mekanizmasıyla sınırları zorluyor.`,
    `Lüks saat dünyasının zirvesinde yer alan ${brand}, kusursuz el işçiliği ve inovatif vizyonuyla ${model} modelinde adeta bir şaheser yaratıyor. Zamanı durdurmak imkansız olsa da, onu en zarif şekilde kolda taşımak bu modelle gerçeğe dönüşüyor. Horoloji tutkunlarının yakından takip ettiği, tasarım ödüllerine doymayan ve koleksiyonerlerin gözdesi haline gelen bu parça, gücün ve statünün en sessiz ama en etkili sembolü olarak öne çıkıyor.`
  ];
  
  const bodies1 = [
    `Her bir bileşeni, Cenevre ve Neuchâtel'in en usta saat ustalarının elinden aylar süren titiz bir çalışma sonucunda çıkan ${model}, mikromekanik dünyanın sınırlarını aşan bir mükemmelliğe sahiptir. Kasanın aerodinamik yapısı, ışığı mükemmel bir açıyla kıran safir kristal camı ve kolda eşsiz bir ergonomi sunan kordon yapısı, ${brand} markasının detaylara verdiği saplantılı önemin bir kanıtıdır. Suya, basınca ve manyetik alanlara karşı üstün direnç gösteren bu model, sadece kapalı davetlerde değil, dünyanın en zorlu koşullarında bile sahibini asla yarı yolda bırakmayacak bir dayanıklılığa sahiptir. Zemberekten eşapmana, rotordan balans yayına kadar her bir parça, sıfır hata payıyla monte edilmiştir.`,
    `Tasarım kodlarında hem markanın köklü geçmişine atıfta bulunan hem de fütüristik bir vizyon çizen ${model}, kadranındaki kusursuz simetri ve derinlik hissiyle büyüleyici bir görsel şölen sunar. ${brand} ustalarının yıllarca süren Ar-Ge çalışmaları sonucunda geliştirdiği in-house kalibre, güç rezervi süresi ve kronometrik hassasiyetiyle sektördeki standartları yeniden belirliyor. Geleneksel polisaj teknikleri (Zaratsu veya İsviçre saten fırçalama) ile parlatılan kasa, ışığın kasanın her bir kıvrımında adeta dans etmesini sağlıyor. Bu model, yalnızca zamanı göstermekle kalmıyor; aynı zamanda koldaki duruşuyla karakterinizi ve yaşam tarzınızı çevreye fısıldıyor.`
  ];
  
  const investments = [
    `Günümüzde lüks saatler, yalnızca bir statü sembolü değil, aynı zamanda global piyasalarda değerini koruyan ve zamanla artıran en prestijli yatırım araçlarından biridir. ${brand} markasının ikonikleşmiş silüetine sahip olan ${model}, kısıtlı üretim adetleri ve küresel çapta gördüğü devasa talep sayesinde, her geçen yıl değerine değer katan bir "blue-chip" yatırım olarak değerlendirilmektedir. Saatchi & Saatchi güvencesiyle, tamamen orijinal, uluslararası garantili ve kusursuz kondisyonda sizlere sunulan bu başyapıt, enflasyona ve piyasa dalgalanmalarına karşı paranızı korurken aynı zamanda nesiller boyu ailenizin en değerli yadigarı (heirloom) olmaya adaydır. Lüks bir portföyün vazgeçilmez parçası olan bu modele sahip olmak, sadece bugününüzü değil, geleceğinizi de güvence altına almak demektir.`,
    `İsviçre saat endüstrisinin en değerli markalarından biri olan ${brand}, müzayedelerde ve özel koleksiyoner buluşmalarında her zaman rekor fiyatlarla el değiştiren bir mirasa sahiptir. Özellikle ${model} gibi karakteristik özellikleri ağır basan, marka DNA'sını tam anlamıyla yansıtan modeller, ikinci el lüks piyasasında sürekli yükselen bir grafik çizer. Bu nadide parça, bir lüks harcamasından ziyade, bileğinizde taşıdığınız likit bir servettir. Saatchi & Semih Sonbahar kalitesi ve uluslararası ekspertiz onayıyla teslim edilen bu saat, tam kutu ve sertifika içeriğiyle değer koruma garantisi sunar. İsviçre Alpleri'nin soğuk metalini, ateşli bir tutkuya dönüştüren bu tasarım, yatırım portföyünüzün en estetik üyesi olacaktır.`
  ];
  
  const conclusions = [
    `Sadece seçkin bir zümrenin bileğini süsleme ayrıcalığına sahip olan ${brand} ${model}, Saatchi kalitesiyle, dünyanın neresinde olursanız olun sigortalı ve VIP kurye ağıyla size ulaştırılmaktadır. Kendinizi veya sevdiklerinizi ödüllendirmek, zamanın akışına kendi imzanızı atmak için bu eşsiz sanat eserine sahip olma fırsatını kaçırmayın. Hayat, sıradan saatler takmak için çok kısa. Gerçek lüksü hissetmek ve zamanı fethetmek için bu master-piece'i hemen koleksiyonunuza ekleyin.`,
    `${brand} geleneğinin en görkemli temsilcisi olan ${model} ile zamanı okumak bir rutinden çıkıp bir ritüele dönüşüyor. Saatchi'nin ayrıcalıklı dünyasında, sahte satıcıların ve güvensiz pazarların ötesinde, doğrudan birinci sınıf bir alışveriş deneyimiyle bu modele sahip olabilirsiniz. Hayatınızdaki dönüm noktalarını kutlamak, başarılarınızı taçlandırmak ve nesilden nesile aktarılacak ölümsüz bir hikaye başlatmak için, bu benzersiz başyapıt sizi bekliyor.`
  ];

  const intro = intros[hash % intros.length];
  const body = bodies1[(hash + 1) % bodies1.length];
  const investment = investments[(hash + 2) % investments.length];
  const conclusion = conclusions[(hash + 3) % conclusions.length];

  return (
    <div className="mt-16 border-t border-surface-border pt-12">
      <h2 className="text-2xl md:text-3xl font-serif text-primary mb-8 text-center uppercase tracking-widest">
        {brand} {model} : ZAMANIN ÖTESİNDE BİR MİRAS
      </h2>
      
      <div className="prose max-w-none text-foreground font-light leading-relaxed space-y-8">
        
        <div>
          <h3 className="text-lg font-bold text-black mb-3 tracking-wide border-l-2 border-primary pl-3 uppercase">Mükemmelliğin Doğuşu</h3>
          <p className="text-justify text-[15px]">{intro}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-black mb-3 tracking-wide border-l-2 border-primary pl-3 uppercase">Kusursuz Mühendislik ve İsviçre İşçiliği</h3>
          <p className="text-justify text-[15px]">{body}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-black mb-3 tracking-wide border-l-2 border-primary pl-3 uppercase">Geleceğe Yatırım ve Nesiller Boyu Miras</h3>
          <p className="text-justify text-[15px]">{investment}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-black mb-3 tracking-wide border-l-2 border-primary pl-3 uppercase">Saatchi Ayrıcalığıyla Sahip Olun</h3>
          <p className="text-justify text-[15px]">{conclusion}</p>
        </div>

      </div>
    </div>
  );
}
