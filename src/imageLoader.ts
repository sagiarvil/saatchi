'use client';

export default function myImageLoader({ src }: { src: string }) {
  if (src.startsWith('http')) {
    return `/api/image?url=${encodeURIComponent(src)}`;
  }
  return src;
}
