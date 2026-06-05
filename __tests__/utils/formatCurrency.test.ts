import { formatCurrency } from "@/src/lib/utils/formatCurrency";

describe("formatCurrency", () => {
  it("formats a whole number", () => {
    expect(formatCurrency(10)).toBe("$10.00");
  });

  it("formats a decimal value", () => {
    expect(formatCurrency(5.99)).toBe("$5.99");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats a large number with commas", () => {
    expect(formatCurrency(1000)).toBe("$1,000.00");
  });

  it("rounds to two decimal places", () => {
    expect(formatCurrency(2.999)).toBe("$3.00");
  });
});
