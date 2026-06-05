import { getImagePath } from "@/src/lib/utils/getImagePath";

describe("getImagePath", () => {
  it("returns the placeholder when image is null", () => {
    expect(getImagePath(null)).toBe("/products/placeholder.jpg");
  });

  it("returns the placeholder when image is undefined", () => {
    expect(getImagePath(undefined)).toBe("/products/placeholder.jpg");
  });

  it("returns the placeholder when image is an empty string", () => {
    expect(getImagePath("")).toBe("/products/placeholder.jpg");
  });

  it("returns a Cloudinary URL as-is", () => {
    const url = "https://res.cloudinary.com/demo/image/upload/sample.jpg";
    expect(getImagePath(url)).toBe(url);
  });

  it("prefixes a local filename with /products/", () => {
    expect(getImagePath("espresso.jpg")).toBe("/products/espresso.jpg");
  });
});
