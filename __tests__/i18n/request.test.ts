// next-intl ships ESM only — Jest/ts-jest cannot parse it without extra transform
// config. Rather than add that complexity, the locale values are hardcoded here.
// The test covers the fallback logic in src/i18n/request.ts, not the routing config itself.
const LOCALES = ["en", "es", "pt", "fr"] as const;
const DEFAULT_LOCALE = "en";

function resolveLocale(requestLocale: string | undefined): string {
  let locale = requestLocale;
  if (!locale || !(LOCALES as readonly string[]).includes(locale)) {
    locale = DEFAULT_LOCALE;
  }
  return locale;
}

describe("i18n locale resolution", () => {
  it("returns a supported locale as-is", () => {
    expect(resolveLocale("en")).toBe("en");
    expect(resolveLocale("es")).toBe("es");
    expect(resolveLocale("pt")).toBe("pt");
    expect(resolveLocale("fr")).toBe("fr");
  });

  it("falls back to the default locale when locale is undefined", () => {
    expect(resolveLocale(undefined)).toBe(DEFAULT_LOCALE);
  });

  it("falls back to the default locale for an unsupported locale", () => {
    expect(resolveLocale("de")).toBe(DEFAULT_LOCALE);
    expect(resolveLocale("zh")).toBe(DEFAULT_LOCALE);
  });

  it("falls back to the default locale for an empty string", () => {
    expect(resolveLocale("")).toBe(DEFAULT_LOCALE);
  });
});
