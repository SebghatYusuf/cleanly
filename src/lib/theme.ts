import type { ThemePref } from '../../shared/types';

export const THEME_KEY = 'cleanly-theme';

export type ResolvedTheme = 'light' | 'dark';

export function resolvedTheme(pref: ThemePref): ResolvedTheme {
  if (pref === 'light' || pref === 'dark') return pref;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(pref: ThemePref): ResolvedTheme {
  const resolved = resolvedTheme(pref);
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
  try {
    localStorage.setItem(THEME_KEY, pref);
  } catch {
    // private mode
  }
  return resolved;
}
