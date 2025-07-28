
export function deduplicateHeadings(headings) {
  const seen = new Set();
  return headings.filter(h => {
    const key = `${h.level}|${h.text}|${h.page}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
