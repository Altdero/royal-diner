import en from "@/messages/en.json";
import es from "@/messages/es.json";
import pt from "@/messages/pt.json";
import fr from "@/messages/fr.json";

function flattenKeys(obj: object, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof value === "object" && value !== null
      ? flattenKeys(value as object, fullKey)
      : [fullKey];
  });
}

const locales = { en, es, pt, fr } as const;
const enKeys = flattenKeys(en).sort();

describe("i18n message files", () => {
  for (const [locale, messages] of Object.entries(locales)) {
    if (locale === "en") continue;

    it(`${locale}.json has the same keys as en.json`, () => {
      expect(flattenKeys(messages).sort()).toEqual(enKeys);
    });
  }
});
