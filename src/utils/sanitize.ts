/**
 * Safe sanitization utility that works in both client and server environments
 * Falls back to regex-based sanitization if DOMPurify is not available
 */

// Simple regex-based sanitization as fallback
const regexSanitize = (input: string): string => {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>]/g, "") // Remove any remaining < or >
    .trim();
};

// Client-side sanitization using DOMPurify
export const sanitize = (input: string): string => {
  if (!input) return "";

  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    try {
      // Dynamically require isomorphic-dompurify only on client
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const DOMPurify = require("isomorphic-dompurify");
      return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
    } catch {
      console.warn("DOMPurify not available, using fallback sanitization");
      return regexSanitize(input);
    }
  }

  // Server-side: use simple regex sanitization
  return regexSanitize(input);
};
