export const getImageUrl = (filePath: string): string =>
  new URL(filePath, import.meta.url).href;
