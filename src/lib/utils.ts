import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(username: string): string {
    const nameParts = username.split(/\s+/);
    const initials = nameParts
      .filter(part => part.length > 0)
      .map(part => part[0].toUpperCase())
      .join('');

    return initials;
  }