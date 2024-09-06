import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cnm = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
