/**
 * Gets the image base path from environment variables with a fallback
 * @returns The image path URL or empty string if not configured
 */
export const getImagePath = (): string => {
  return process.env.NEXT_PUBLIC_IMAGE_PATH || "";
};

/**
 * Constructs a full image URL from a relative path
 * @param relativePath - The relative path to the image
 * @returns The full image URL or the relative path if no base path is configured
 */
export const getFullImageUrl = (relativePath: string): string => {
  const basePath = getImagePath();
  if (!basePath || !relativePath) return relativePath || "";
  return `${basePath}${relativePath}`;
};
