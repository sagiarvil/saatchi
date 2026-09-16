export function getProxiedImageUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) {
    return `/api/image?url=${encodeURIComponent(url)}`;
  }
  return url;
}
