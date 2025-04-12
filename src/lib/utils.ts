import {ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {format} from 'date-fns';

// For conditionally merging Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format dates in consistent way
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd');
}