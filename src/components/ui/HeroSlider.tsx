'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SLIDES = [
  {
    id: 1,
    video: '/videos/hero1.mp4',
    subtitle: 'SAATCHI AYRICALIĞI',
    title: 'Zamanın Ötesinde\nBir Miras',
    desc: "Kusursuz İsviçre mühendisliği ve Saatchi'nin eşsiz tasarım vizyonuyla şekillenen Masterpiece koleksiyonunu keşfedin.",
    link: '/elit-saat/koleksiyon',
    btnText: 'Koleksiyonu Keşfet',
  },
  {
    id: 2,
    video: '/videos/hero2.mp4',
    subtitle: 'ELİT KATEGORİ',
    title: 'Mükemmelliğin\nYeni Standardı',
    desc: 'Dünyanın en prestijli markalarından derlenen, kişiye özel sertifikalı ve VIP teslimatlı seçkin modeller.',
    link: '/elit-saat/koleksiyon',
    btnText: 'Elit Seriyi İncele',
  },
  {
    id: 3,
    video: '/videos/hero3.mp4',
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
  const activeSlide = SLIDES[current];
  const videoPlaying = mediaState === 'playing';

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || document.visibilityState === 'hidden') return;

    configureInlineAutoplay(video);
    const attempt = ++playAttemptRef.current;

    try {
      await video.play();

      // Ignore a stale promise from a previous slide or a superseded attempt.
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

    setMediaState('loading');
    configureInlineAutoplay(video);

    const retry = () => void tryPlay();
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') retry();
    };

    let interactionConsumed = false;
    const removeInteractionListeners = () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
    const handleFirstInteraction = () => {
      if (interactionConsumed) return;
      interactionConsumed = true;
      removeInteractionListeners();
      retry();
    };

    video.addEventListener('loadedmetadata', retry);
    video.addEventListener('canplay', retry);
    window.addEventListener('pageshow', retry);
    document.addEventListener('visibilitychange', handleVisibility);

    // A single real interaction retry covers autoplay-policy blocks without
    // keeping permanent click/touch playback hooks alive.
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });

    // Initial render attempt. Further retries are event-driven only; there is
    // no polling loop or timer-based play storm.
    retry();

    return () => {
      // Invalidate any play() promise still resolving for the outgoing slide.
      playAttemptRef.current += 1;
      video.removeEventListener('loadedmetadata', retry);
      video.removeEventListener('canplay', retry);
      window.removeEventListener('pageshow', retry);
      document.removeEventListener('visibilitychange', handleVisibility);
      removeInteractionListeners();
    };
  }, [current, tryPlay]);

  useEffect(() => {
    // When video playback is available, rotate normally. If an OS/browser
    // blocks video, keep the hero usable and rotate the textual composition
    // rather than freezing on a blank frame.
    if (mediaState === 'loading') return;

    const timer = window.setTimeout(() => {
      setMediaState('loading');
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, videoPlaying ? 7000 : 9000);

    return () => window.clearTimeout(timer);
  }, [current, mediaState, videoPlaying]);

  const selectSlide = (index: number) => {
    if (index === current) {
      void tryPlay();
      return;
    }

    setMediaState('loading');
    setCurrent(index);
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
        {/* Permanent visual fallback: mobile visitors never receive an empty/black
            hero while media is buffering, blocked or unavailable. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-110"
          style={{
            background:
              'radial-gradient(circle at 72% 28%, rgba(132,107,50,0.30), transparent 34%), radial-gradient(circle at 18% 76%, rgba(255,255,255,0.08), transparent 30%), linear-gradient(135deg, #171717 0%, #080808 48%, #000000 100%)',
          }}
        />

        <video
          key={activeSlide.id}
          ref={videoRef}
          src={activeSlide.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          data-hero-video="true"
          onPlaying={() => setMediaState('playing')}
          onError={() => setMediaState('failed')}
          onStalled={() => setMediaState((state) => (state === 'playing' ? state : 'blocked'))}
          className={`absolute inset-0 block h-full w-full object-cover object-center contrast-[1.15] saturate-[0.80] brightness-[0.75] transition-opacity duration-500 ${
            videoPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translate3d(0,0,0)' }}
        />

        {/* Cinematic Filter & Radial Vignette */}
        <div className="absolute inset-0 bg-[#0a0a0a]/25 pointer-events-none mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/35 to-black/85 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />
      </div>

      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 flex flex-col justify-end items-start text-left px-6 md:px-12 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-16 w-full max-w-[1600px] mx-auto">
            {slide.subtitle && (
              <h2
                className={`text-white/90 tracking-[0.2em] uppercase text-[9px] md:text-[10px] font-normal mb-2 transform transition-all duration-1000 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                {slide.subtitle}
              </h2>
            )}

            <h1
              className={`text-[32px] md:text-[40px] lg:text-[44px] font-thin text-white mb-5 leading-tight max-w-3xl transform transition-all duration-1000 delay-500 whitespace-pre-line ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 200, letterSpacing: '0.02em' }}
            >
              {slide.title}
            </h1>

            <p
              className={`text-[13px] md:text-[15px] text-white/90 mb-8 max-w-xl leading-relaxed transform transition-all duration-1000 delay-[700ms] ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              {slide.desc}
            </p>

            <div className={`transform transition-all duration-1000 delay-[900ms] ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Link
                href={slide.link}
                className="bg-white text-gray-900 hover:bg-gray-100 uppercase tracking-[0.15em] text-[9px] md:text-[10px] px-6 py-3 rounded-full transition-all duration-500 inline-block"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400 }}
              >
                {slide.btnText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => selectSlide(index)}
            className={`w-1.5 h-1.5 rounded-full border border-white transition-all duration-500 ${
              index === current ? 'bg-white scale-125' : 'bg-transparent hover:bg-white/50'
            }`}
            aria-label={`Slayt ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
