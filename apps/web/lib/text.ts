export const trim = (str: string | null | undefined, maxLength: number): string => {
  if (!str) return "";
  if (str.length < maxLength) return str.trim();
  const lastSpaceIndex = str.trim().lastIndexOf(" ", maxLength + 1);
  return lastSpaceIndex > 0
    ? str.trim().substring(0, lastSpaceIndex) + "..."
    : str.trim().substring(0, maxLength) + "...";
};
