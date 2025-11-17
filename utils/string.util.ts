export const toKebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

export const toCamelCase = (str: string): string =>
  str.replace(/[-_](.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (_, c) => c.toLowerCase());

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const truncate = (str: string, length: number): string =>
  str.length <= length ? str : str.slice(0, length) + '...';
