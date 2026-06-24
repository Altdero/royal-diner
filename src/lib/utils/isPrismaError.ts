// Duck-type instead of instanceof PrismaClientKnownRequestError because Prisma
// uses import.meta internally, which Jest/ts-jest cannot parse.
export function isPrismaError(error: unknown, code: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === code
  );
}
