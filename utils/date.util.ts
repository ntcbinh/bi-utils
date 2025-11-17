// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidDate = (value: any): boolean => value instanceof Date && !Number.isNaN(value.getTime());

export const addDays = (date: Date, days: number): Date => new Date(date.getTime() + days * 86400000);

export const formatDate = (date: Date, locale = 'vi-VN'): string =>
  date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });

export const daysBetween = (d1: Date, d2: Date): number => Math.abs((d2.getTime() - d1.getTime()) / 86400000);
