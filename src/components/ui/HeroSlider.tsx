'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SLIDE_DURATION_MS = 12000;

const SLIDES = [
  {
    id: 1,
    video: '/videos/hero1.mp4',
    poster: '/images/poster-hero1.jpg',
    mobilePoster: '/images/poster-hero1-mobile.jpg',
    mobileVideo: '/videos/hero1-mobile.mp4',
    subtitle: 'SAATCHI AYRICALIĞI',
    title: 'Zamanın Ötesinde\nBir Miras',
    desc: "Kusursuz İsviçre mühendisliği ve Saatchi'nin eşsiz tasarım vizyonuyla şekillenen Masterpiece koleksiyonunu keşfedin.",
    link: '/elit-saat/koleksiyon',
    btnText: 'Koleksiyonu Keşfet',
  },
  {
    id: 2,
    video: '/videos/hero2.mp4',
    poster: '/images/poster-hero2.jpg',
    mobilePoster: '/images/poster-hero2-mobile.jpg',
    mobileVideo: '/videos/hero2-mobile.mp4',
    subtitle: 'ELİT KATEGORİ',
    title: 'Mükemmelliğin\nYeni Standardı',
    desc: 'Dünyanın en prestijli markalarından derlenen, kişiye özel sertifikalı ve VIP teslimatlı seçkin modeller.',
    link: '/elit-saat/koleksiyon',
    btnText: 'Elit Seriyi İncele',
  },
  {
    id: 3,
    video: '/videos/hero3.mp4',
    poster: '/images/poster-hero3.jpg',
    mobilePoster: '/images/poster-hero3-mobile.jpg',
    mobileVideo: '/videos/hero3-mobile.mp4',
    subtitle: 'ÖZEL KOLEKSİYON',
    title: 'Sadece Sizin\nİçin Tasarlandı',
    desc: 'Karakterinizi yansıtan eşsiz detaylar. SAATCHI - SEMİH SONBAHAR güvencesiyle elit dünyaya adım atın.',
    link: '/kurumsal',
    btnText: 'Markamızı Keşfedin',
  },
] as const;

type MediaState = 'loading' | 'playing' | 'blocked' | 'failed';

function configureInlineAutoplay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', 'true');
}

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [mediaState, setMediaState] = useState<MediaState>('loading');
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttemptRef = useRef(0);
  const failedVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeSlide = SLIDES[current];
  const videoPlaying = mediaState === 'playing';

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || document.visibilityState === 'hidden') return;
    if (failedVideoRef.current === video) return;

    configureInlineAutoplay(video);
    const attempt = ++playAttemptRef.current;

    try {
      await video.play();
      if (videoRef.current !== video || playAttemptRef.current !== attempt) return;
      setMediaState('playing');
    } catch (error) {
      if (videoRef.current !== video || playAttemptRef.current !== attempt) return;
      const name = error instanceof DOMException ? error.name : '';
      if (name === 'NotAllowedError' || name === 'AbortError') {
        setMediaState((state) => (state === 'failed' ? state : 'blocked'));
        return;
      }
      setMediaState((state) => (state === 'failed' ? state : 'blocked'));
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    failedVideoRef.current = null;
    setMediaState('loading');
    configureInlineAutoplay(video);

    const retry = () => void tryPlay();
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') retry();
    };

    let interactionConsumed = false;
    const handleFirstInteraction = () => {
      if (interactionConsumed) return;
      interactionConsumed = true;
      removeInteractionListeners();
      retry();
    };
    const removeInteractionListeners = () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };

    video.addEventListener('loadedmetadata', retry);
    video.addEventListener('canplay', retry);
    window.addEventListener('pageshow', retry);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });

    retry();

    return () => {
      playAttemptRef.current += 1;
      video.removeEventListener('loadedmetadata', retry);
      video.removeEventListener('canplay', retry);
      window.removeEventListener('pageshow', retry);
      document.removeEventListener('visibilitychange', handleVisibility);
      removeInteractionListeners();
    };
  }, [current, tryPlay]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMediaState('loading');
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [current]);

  const selectSlide = (index: number) => {
    if (index === current) {
      void tryPlay();
      return;
    }
    setMediaState('loading');
    setCurrent(index);
  };

  const handleVideoError = () => {
    const video = videoRef.current;
    if (video) failedVideoRef.current = video;
    playAttemptRef.current += 1;
    setMediaState('failed');
  };

  return (
    <section data-hero-root="true" data-hero-media-state={mediaState} className="relative flex h-[100svh] min-h-[560px] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] md:h-screen" style={{ minHeight: 'min(560px, 100svh)' }}>
      <div className="absolute inset-0 z-0 h-full w-full bg-[#0a0a0a]" data-hero-background="true">
        <div aria-hidden="true" data-hero-fallback="true" className="absolute inset-0 z-0 scale-110" style={{ background: 'radial-gradient(circle at 72% 28%, rgba(132,107,50,0.30), transparent 34%), radial-gradient(circle at 18% 76%, rgba(255,255,255,0.08), transparent 30%), linear-gradient(135deg, #171717 0%, #080808 48%, #000000 100%)' }} />

        
        <img src="/images/mobile-hero-rolex.jpg" alt="Saatchi Luxury" className="absolute inset-0 z-[1] block h-full w-full object-cover object-center contrast-[1.10] saturate-[0.85] brightness-[0.70] md:hidden" />
        <video key={activeSlide.id} ref={videoRef} autoPlay loop muted playsInline preload="auto" controls={false} disablePictureInPicture aria-hidden="true" data-hero-video="true" onPlaying={() => setMediaState('playing')} onError={handleVideoError} onStalled={() => setMediaState((state) => (state === 'playing' || state === 'failed' ? state : 'blocked'))} className={`absolute inset-0 z-[1] hidden md:block h-full w-full object-cover object-center contrast-[1.15] saturate-[0.80] brightness-[0.75] transition-opacity duration-500 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`} style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translate3d(0,0,0)' }}>
          <source media="(max-width: 767px)" src={activeSlide.mobileVideo} type="video/mp4" />
          <source src={activeSlide.video} type="video/mp4" />
        </video>

        <div data-hero-overlay="true" className="pointer-events-none absolute inset-0 z-[2] bg-[#0a0a0a]/15 mix-blend-multiply" />
        <div data-hero-overlay="true" className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/25 to-black/75" />
        <div data-hero-overlay="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {SLIDES.map((slide, index) => (
        <div key={slide.id} data-hero-content={index === current ? 'active' : 'inactive'} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'}`}>
          <div className="absolute inset-0 mx-auto flex w-full max-w-[1600px] flex-col items-start justify-end px-6 pb-[max(3.5rem,env(safe-area-inset-bottom))] text-left sm:px-8 md:px-12 md:pb-20 lg:pb-24">
            {slide.subtitle && (
              <h2 className={`mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white/90 transition-all delay-300 duration-1000 sm:text-[12px] md:text-[13px] ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                {slide.subtitle}
              </h2>
            )}

            <h1 className={`mb-5 max-w-[980px] whitespace-pre-line text-[clamp(42px,8vw,64px)] font-thin leading-[0.98] text-white transition-all delay-500 duration-1000 md:text-[clamp(58px,6.1vw,92px)] ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 200, letterSpacing: '-0.025em' }}>
              {slide.title}
            </h1>

            <p className={`mb-9 max-w-2xl text-[15px] leading-[1.7] text-white/92 transition-all delay-[700ms] duration-1000 sm:text-[16px] md:text-[18px] ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {slide.desc}
            </p>

            <div className={`transition-all delay-[900ms] duration-1000 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Link href={slide.link} data-hero-cta="true" className="inline-block rounded-full bg-white px-8 py-4 text-[11px] uppercase tracking-[0.17em] text-gray-900 transition-all duration-500 hover:bg-gray-100 md:px-9 md:py-[18px] md:text-[12px]" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 500 }}>
                {slide.btnText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div data-hero-nav="true" className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 md:right-8">
        {SLIDES.map((_, index) => (
          <button key={index} onClick={() => selectSlide(index)} className={`h-1.5 w-1.5 rounded-full border border-white transition-all duration-500 ${index === current ? 'scale-125 bg-white' : 'bg-transparent hover:bg-white/50'}`} aria-label={`Slayt ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
