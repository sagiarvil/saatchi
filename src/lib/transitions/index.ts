'use client';

/**
 * Native Document View Transitions API Wrapper (transitions.dev standardı)
 * Tarayıcı desteği varsa yumuşak sayfa ve durum morfolojisi sağlar,
 * Desteklenmiyorsa sessizce doğrudan callback'i çalıştırır (Fail-safe).
 */
export async function startViewTransition(callback: () => void | Promise<void>): Promise<void> {
  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    // @ts-ignore - Document.startViewTransition browser native
    return document.startViewTransition(async () => {
      await callback();
    }).ready;
  } else {
    await callback();
  }
}

/**
 * Olay yöneticilerini (onClick, route geçişleri) View Transition içine sarar.
 */
export function withViewTransition<T extends (...args: unknown[]) => unknown>(fn: T) {
  return (...args: Parameters<T>): void => {
    startViewTransition(() => {
      fn(...args);
    });
  };
}
