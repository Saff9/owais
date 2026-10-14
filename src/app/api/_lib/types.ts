/** Minimal structural type for a zod issue — keeps helpers testable. */
export interface ZodIssueLike {
  code?: string;
  message?: string;
  path?: (string | number | symbol)[];
}
