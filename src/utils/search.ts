export function cleanQueryCode(query: string): string {
  if (!query) return '';
  let clean = query.toLowerCase().trim();
  // Strip common prefixes like 'código', 'codigo', 'cod.', 'cod', 'número', 'numero', 'nº', 'n°', 'n.', '#', 'ref'
  clean = clean.replace(/^(c[óo]digo|c[óo]d\.?|n[úu]mero|n[º°\.]?|ref\.?|#)\s*/gi, '');
  clean = clean.replace(/[#\s]/g, '').trim();
  return clean;
}

export function matchProductCode(prodNumber: string, query: string): boolean {
  if (!query) return false;
  const cleanQ = cleanQueryCode(query);
  const cleanNum = (prodNumber || '').replace(/[#\s]/g, '').toLowerCase().trim();
  if (!cleanQ) return false;

  // Exact match (e.g. "136" === "136")
  if (cleanNum === cleanQ) return true;

  // Substring match
  if (cleanNum.includes(cleanQ)) return true;

  // Match without leading zeroes (e.g. query "7" matches "007", "54" matches "054")
  const unpaddedNum = cleanNum.replace(/^0+/, '');
  const unpaddedQ = cleanQ.replace(/^0+/, '');
  if (unpaddedQ) {
    if (unpaddedNum === unpaddedQ) return true;
    if (unpaddedNum.startsWith(unpaddedQ)) return true;
  }

  // Inverse: query with leading zeroes matching unpadded or vice versa
  if (cleanQ.padStart(3, '0') === cleanNum) return true;

  return false;
}
