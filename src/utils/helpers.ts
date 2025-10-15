/**
 * Replaces placeholders in a route template with actual values.
 *
 * @param {string} route - The route template containing placeholders (e.g., "/companies/:companyId").
 * @param {Record<string, string | number>} params - An object where keys match the placeholders in the route,
 * and values are the actual values to replace them with.
 * @returns {string} - The route with placeholders replaced by their corresponding values.
 *
 * @example
 * const route = "/companies/:companyId";
 * const params = { companyId: 123 };
 * const result = buildPath(route, params);
 * console.log(result); // Output: "/companies/123"
 *
 */
export function buildPath(route: string, params: Record<string, string | number>): string {
  return Object.keys(params).reduce((path, key) => {
    const value = params[key];
    return path.replace(`:${key}`, value.toString());
  }, route);
}

/**
 * Formats a number with thousands separators (commas) and optional fraction digits.
 * Returns a placeholder (dash) for null/undefined/empty values.
 * Accepts numbers or numeric strings.
 *
 * Examples:
 * formatNumber(1234567) => "1,234,567"
 * formatNumber('1234567.89', 2) => "1,234,567.89"
 */
export function formatNumber(
  value?: number | string | null,
  fractionDigits?: number
): string {
  if (value === null || value === undefined || value === '') return '-';

  // Normalize strings that may contain commas
  const normalized = typeof value === 'string' ? value.replace(/,/g, '') : String(value);
  const num = Number(normalized);
  if (Number.isNaN(num)) return '-';

  if (typeof fractionDigits === 'number') {
    return num.toLocaleString(undefined, { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits });
  }

  // default: no fractional digits unless present in original input
  if (String(num).includes('.')) {
    // keep existing decimal precision
    return num.toLocaleString(undefined, { maximumFractionDigits: 20 }).replace(/\.?0+$/, '');
  }

  return num.toLocaleString();
}
