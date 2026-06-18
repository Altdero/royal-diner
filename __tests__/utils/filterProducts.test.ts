import { filterProducts } from "@/src/lib/utils/filterProducts";
import type { ProductType } from "@/src/types";

const cat = { id: "cat-1", name: "Coffee" };

const products: ProductType[] = [
  {
    id: "1",
    name: "Espresso",
    price: 3.5,
    image: null,
    categoryId: "cat-1",
    category: cat,
  },
  {
    id: "2",
    name: "Cappuccino",
    price: 4.5,
    image: null,
    categoryId: "cat-1",
    category: cat,
  },
  {
    id: "3",
    name: "Burger",
    price: 8.0,
    image: null,
    categoryId: "cat-2",
    category: { id: "cat-2", name: "Burgers" },
  },
];

describe("filterProducts", () => {
  it("returns all products when search is empty", () => {
    expect(filterProducts(products, "")).toEqual(products);
  });

  it("matches case-insensitively", () => {
    expect(filterProducts(products, "ESPRESSO")).toEqual([products[0]]);
  });

  it("matches on a partial name", () => {
    expect(filterProducts(products, "cap")).toEqual([products[1]]);
  });

  it("returns multiple matches", () => {
    expect(filterProducts(products, "o")).toHaveLength(2);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterProducts(products, "pizza")).toEqual([]);
  });
});
