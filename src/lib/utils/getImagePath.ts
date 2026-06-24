export function getImagePath(image: string | null | undefined): string | null {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `/products/${image}`;
}
