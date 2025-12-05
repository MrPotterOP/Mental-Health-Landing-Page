import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally joins class names and merges Tailwind CSS classes intelligently.
 * @param {...(string|object|array|boolean|null|undefined)} inputs - Class names to merge.
 * @returns {string} The combined and merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
