import type { CustomerBase } from '../../../api/models/company/company.model';
import Badge from '../../../components/badge';

export const getBadge = (customerBase?: CustomerBase) => {
  if (!customerBase) return <Badge label="Unknown" variant="blue" />;

  if (customerBase === 'Small Business') {
    return <Badge label="Small Business" variant="purple" />;
  }
  if (customerBase === 'Enterprise') {
    return <Badge label="Enterprise" variant="blue" />;
  }
  if (customerBase === 'Government') {
    return <Badge label="Government" variant="green" />;
  }
};

export function sanitizeHeadquartersIframe(
  raw?: unknown
): { type: 'none' } | { type: 'html'; html: string } | { type: 'src'; src: string } {
  if (!raw) return { type: 'none' };
  const normalized = String(raw).trim();
  if (normalized.toLowerCase().startsWith('headquarters_iframe')) return { type: 'none' };
  if (normalized.includes('<iframe')) return { type: 'html', html: normalized };
  try {
    const url = new URL(normalized);
    return { type: 'src', src: url.toString() };
  } catch {
    return { type: 'none' };
  }
}

export const formatToMMDDYYYY = (dateStr?: string) => {
  if (!dateStr) return undefined;
  // Normalize any input to MM/DD/YYYY with zero-padded month/day
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [mm, dd, yyyy] = parts;
      return `${mm.padStart(2, '0')}/${dd.padStart(2, '0')}/${yyyy}`;
    }
    return dateStr;
  }

  // Expecting YYYY-MM-DD from input[type=date]
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [yyyy, mm, dd] = parts;
    return `${mm.padStart(2, '0')}/${dd.padStart(2, '0')}/${yyyy}`;
  }
  return dateStr;
};

export const formatToYYYYMMDD = (dateStr?: string) => {
  if (!dateStr) return '';
  // If already in YYYY-MM-DD return as is
  if (dateStr.includes('-')) return dateStr;
  // Expecting MM/DD/YYYY
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [mm, dd, yyyy] = parts;
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }
  return dateStr;
};
