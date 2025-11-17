// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (value: any): boolean =>
  value === null ||
  value === undefined ||
  value === '' ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.keys(value).length === 0);

export const isEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumeric = (value: any): boolean => {
  if (typeof value === 'number') return !Number.isNaN(value);
  if (typeof value === 'string') return /^-?\d+(\.\d+)?$/.test(value.trim());
  return false;
};
