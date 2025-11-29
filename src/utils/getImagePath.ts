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
 * @returns The full image URL or a placeholder if base path is not configured
 */
export const getFullImageUrl = (relativePath?: string | null): string => {
  if (!relativePath) {
    return "/placeholder.svg";
  }

  const basePath = getImagePath();
  if (!basePath) {
    // If no base path is configured during build, return a placeholder
    // This prevents build errors when env vars aren't set
    return "/placeholder.svg";
  }

  return `${basePath}${relativePath}`;
};
