/**
 * Vietnamese Unicode and accent normalization utilities for cross-platform search.
 * Handles mobile vs desktop keyboard differences (e.g. "Hoà" vs "Hòa", NFC vs NFD),
 * and supports diacritics-removed searching ("hoa phat" matches "Hòa Phát").
 */

export const standardizeVietnameseTones = (str: string): string => {
  return str
    .normalize('NFC')
    .toLowerCase()
    .replace(/oà/g, 'òa')
    .replace(/oá/g, 'óa')
    .replace(/oả/g, 'ỏa')
    .replace(/oã/g, 'õa')
    .replace(/oạ/g, 'ọa')
    .replace(/oè/g, 'òe')
    .replace(/oé/g, 'óe')
    .replace(/oẻ/g, 'ỏe')
    .replace(/oẽ/g, 'õe')
    .replace(/oẹ/g, 'ọe')
    .replace(/uỳ/g, 'ùy')
    .replace(/uý/g, 'úy')
    .replace(/uỷ/g, 'ủy')
    .replace(/uỹ/g, 'ũy')
    .replace(/uỵ/g, 'ụy');
};

export const stripVietnameseDiacritics = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase();
};

export const matchVietnamese = (target: string, query: string): boolean => {
  if (!query) return true;
  if (!target) return false;

  const qNorm = query.toLowerCase().trim();
  const tNorm = target.toLowerCase();

  // 1. Direct substring match
  if (tNorm.includes(qNorm)) return true;

  // 2. Tone-standardized match (e.g., mobile "Hoà" vs database "Hòa")
  const qTone = standardizeVietnameseTones(qNorm);
  const tTone = standardizeVietnameseTones(tNorm);
  if (tTone.includes(qTone)) return true;

  // 3. Diacritics-stripped match (e.g., "hoa phat" or accent variants)
  const qStrip = stripVietnameseDiacritics(qNorm);
  const tStrip = stripVietnameseDiacritics(tNorm);
  if (tStrip.includes(qStrip)) return true;

  return false;
};
