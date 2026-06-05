export function getImagePath(image: string | null | undefined): string {
  if (!image) return "/products/placeholder.jpg";
  if (image.startsWith("http")) return image;
  return `/products/${image}`;
}
