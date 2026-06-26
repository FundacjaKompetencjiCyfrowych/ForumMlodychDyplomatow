/**
 * Calculates the numbers to display in a pagination component, including ellipses (...) where appropriate.
 *
 * Returns an array of numbers indicating page numbers to display, with null values indicating ellipses.
 *
 * The resulting array is always fixed length, to prevent layout shifts when navigating between pages.
 * The first and last pages are always included, with the current page centered as much as possible.
 *
 * Example:
 * If there are `10` total pages and the current page is `5`, it might return `[1, null, 4, 5, 6, null, 10]`, which would be rendered as "1 ... 4 5 6 ... 10".
 *
 * The same example at page `1` would return `[1, 2, 3, 4, null, 10]`, rendered as "1 2 3 4 5 ... 10".
 *
 * @param currentPage currently selected page (1-indexed)
 * @param totalPages total number of pages
 * @param maxPageNumbers number of items to display, including ellipsis
 * @returns array of numbers indicating pages to display, or null, indicating ellipsis (...)
 */
export function getPaginationNumbers(
  currentPage: number,
  totalPages: number,
  maxPageNumbers: number = 7
): Array<number | null> {
  if (maxPageNumbers < 3) {
    throw new Error("maxPageNumbers must be at least 3");
  }

  if (totalPages <= maxPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // innerSlots: the slots between the fixed first (1) and last (totalPages) elements
  const innerSlots = maxPageNumbers - 2;
  const result: Array<number | null> = [1];

  if (currentPage <= innerSlots - 1) {
    // No left ellipsis: show pages 2..innerSlots, then right ellipsis
    for (let i = 2; i <= innerSlots; i++) result.push(i);
    result.push(null);
  } else if (currentPage >= totalPages - innerSlots + 2) {
    // No right ellipsis: left ellipsis, then pages (totalPages-innerSlots+1)..(totalPages-1)
    result.push(null);
    for (let i = totalPages - innerSlots + 1; i <= totalPages - 1; i++) result.push(i);
  } else {
    // Both ellipses: center (innerSlots - 2) pages around currentPage
    const width = innerSlots - 2;
    const lo = currentPage - Math.floor((width - 1) / 2);
    result.push(null);
    for (let i = lo; i <= lo + width - 1; i++) result.push(i);
    result.push(null);
  }

  result.push(totalPages);
  return result;
}
