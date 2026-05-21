/**
 * Remove all nested nulls recursively
 */
export type DeepNonNullable<T> = T extends null | undefined
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: DeepNonNullable<T[K]>;
      }
    : T;

type _NonNullish<T> = Exclude<T, null | undefined>;

// Internal unconstrained recursive helper — avoids the constraint mismatch on recursion
type _DeepGet<T, Path extends string> =
  _NonNullish<T> extends (infer E)[]
    ? _DeepGet<_NonNullish<E>, Path>
    : Path extends `${infer K}.${infer Rest}`
      ? K extends keyof _NonNullish<T>
        ? _DeepGet<_NonNullish<T>[K], Rest>
        : never
      : Path extends keyof _NonNullish<T>
        ? _NonNullish<_NonNullish<T>[Path]> extends (infer E)[]
          ? _NonNullish<E>
          : _NonNullish<_NonNullish<T>[Path]>
        : never;

/**
 * Follow a dot-notation path through T, unwrapping arrays and nulls automatically.
 * Arrays are transparent: `"items.name"` works for `{ items: { name: string }[] }`.
 * The final value is also unwrapped from arrays, so you get `Person` instead of `Person[]`.
 *
 * @example
 * type T = { items: { name: string | null }[] | null };
 * type R = DeepGet<T, "items.name">; // string
 */
export type DeepGet<T, Path extends PathString<T> = PathString<T>> = _DeepGet<T, Path>;

/**
 * All valid dot-notation paths into T (used for autocomplete with DeepGet).
 * Arrays are transparent: paths skip array indices.
 *
 * @example
 * type T = { a: { b: string }[] };
 * type P = PathString<T>; // "a" | "a.b"
 */
export type PathString<T> =
  _NonNullish<T> extends (infer E)[]
    ? PathString<_NonNullish<E>>
    : _NonNullish<T> extends object
      ? {
          [K in keyof _NonNullish<T> & string]:
            | K
            | (PathString<_NonNullish<_NonNullish<T>[K]>> extends infer P extends string
                ? `${K}.${P}`
                : never);
        }[keyof _NonNullish<T> & string]
      : never;
