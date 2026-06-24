import { getImagePath } from "@/src/lib/utils/getImagePath";

describe("getImagePath", () => {
  it("returns null when image is null", () => {
    expect(getImagePath(null)).toBeNull();
  });

  it("returns null when image is undefined", () => {
    expect(getImagePath(undefined)).toBeNull();
  });

  it("returns null when image is an empty string", () => {
    expect(getImagePath("")).toBeNull();
  });

  it("returns a Cloudinary URL as-is", () => {
    const url = "https://res.cloudinary.com/demo/image/upload/sample.jpg";
    expect(getImagePath(url)).toBe(url);
  });

  it("prefixes a local filename with /products/", () => {
    expect(getImagePath("espresso.jpg")).toBe("/products/espresso.jpg");
  });
});
