import { supportedLanguages } from '@/lib/languages';

export const DEFAULT_LANGUAGE = 'en';

const normalizePath = (path: string) => {
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  const trimmed = withLeading.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

export const stripLanguagePrefix = (path: string): { lang: string | null; cleanPath: string } => {
  const normalized = normalizePath(path);
  const segments = normalized.split('/');

  if (segments.length > 1 && supportedLanguages.includes(segments[1])) {
    const remaining = `/${segments.slice(2).join('/')}`;
    return { lang: segments[1], cleanPath: normalizePath(remaining) };
  }

  return { lang: null, cleanPath: normalized };
};

export const buildLocalizedPath = (path: string, lang: string) => {
  const normalized = normalizePath(path);

  if (lang === DEFAULT_LANGUAGE) {
    return normalized;
  }

  return normalized === '/' ? `/${lang}` : `/${lang}${normalized}`;
};
