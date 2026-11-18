import { marked } from 'marked';
import settings from '../data/settings.json';
import home from '../data/home.json';

export { settings, home };

// Font Google có hỗ trợ tiếng Việt, kèm các độ đậm có sẵn
export const FONTS: Record<string, { weights: string; fallback: string }> = {
  'Be Vietnam Pro': { weights: '400;500;600;700', fallback: 'sans-serif' },
  'Inter': { weights: '400;500;600;700', fallback: 'sans-serif' },
  'Roboto': { weights: '400;500;700', fallback: 'sans-serif' },
  'Montserrat': { weights: '400;500;600;700', fallback: 'sans-serif' },
  'Nunito': { weights: '400;600;700', fallback: 'sans-serif' },
  'Quicksand': { weights: '400;500;600;700', fallback: 'sans-serif' },
  'Playfair Display': { weights: '500;600;700', fallback: 'serif' },
  'Lora': { weights: '400;500;600;700', fallback: 'serif' },
  'Merriweather': { weights: '400;700', fallback: 'serif' },
  'Noto Serif': { weights: '400;600;700', fallback: 'serif' },
  'EB Garamond': { weights: '400;500;600;700', fallback: 'serif' },
  'Cormorant Garamond': { weights: '500;600;700', fallback: 'serif' },
  'Philosopher': { weights: '400;700', fallback: 'sans-serif' },
  'Dancing Script': { weights: '400;600;700', fallback: 'cursive' },
  'Charm': { weights: '400;700', fallback: 'cursive' },
  'Pacifico': { weights: '400', fallback: 'cursive' },
  'Great Vibes': { weights: '400', fallback: 'cursive' },
};

export function fontStack(name: string) {
  const f = FONTS[name];
  return `'${name}', ${f ? f.fallback : 'sans-serif'}`;
}

export function fontsHref(names: string[]) {
  const uniq = [...new Set(names.filter(Boolean))];
  const fams = uniq
    .map((n) => `family=${encodeURIComponent(n).replace(/%20/g, '+')}:wght@${FONTS[n]?.weights ?? '400;700'}`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${fams}&display=swap`;
}

export const md = (s = '') => marked.parse(s, { async: false }) as string;
export const mdInline = (s = '') => marked.parseInline(s, { async: false }) as string;

/** Chuyển các link tắt: "zalo", "tel", "#neo" */
export function resolveLink(link = '') {
  if (link === 'zalo') return settings.zalo;
  if (link === 'tel' || link === 'hotline') return `tel:${settings.hotline}`;
  if (link.startsWith('#')) return '/' + link;
  return link;
}

export const isExternal = (href = '') => /^https?:\/\//.test(href);

export function youtubeId(url = '') {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : '';
}

export const pad = (n: number) => String(n).padStart(2, '0');
