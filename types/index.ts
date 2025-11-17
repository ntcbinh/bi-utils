/**
 * Nullable type
 * @example
 * ```ts
 * interface User {
 *   id: string;
 *   name: string;
 *   phone: Nullable<string>;
 * }
 *
 * const u: User = {
 *   id: "1",
 *   name: "Alice",
 *   phone: null,        // OK
 *   // phone: undefined // OK
 *   // phone: "123"     // OK
 * };
 * ```
 * @returns {T | null}
 */
export type Nullable<T> = T | null;

/**
 * Optional type
 * @example
 * ```ts
 * interface User {
 *   id: string;
 *   name: string;
 *   phone: Optional<string>;
 * }
 *
 * const u: User = {
 *   id: "1",
 *   name: "Alice",
 *   phone: undefined, // OK
 *   // phone: "123"     // OK
 * };
 * ```
 */
export type Optional<T> = T | undefined;

/**
 * Nilable type
 * @example
 * ```ts
 * interface User {
 *   id: string;
 *   name: string;
 *   phone: Nilable<string>;
 * }
 *
 * const u: User = {
 *   id: "1",
 *   name: "Alice",
 *   phone: null,        // OK
 *   // phone: undefined // OK
 *   // phone: "123"     // OK
 * };
 * ```
 * @returns {T | null | undefined}
 */
export type Nilable<T> = T | null | undefined;

/**
 * Deep partial type
 * @example
 * ```ts
 * interface User {
 *   id: string;
 *   name: string;
 *   phone: string;
 *   address: {
 *     city: string;
 *     street: string;
 *   };
 * }
 *
 * function updateProfile(data: DeepPartial<User>) {
 *   // ...
 * }
 *
 * updateProfile({
 *   address: {
 *     city: "Hanoi",
 *   },
 * });
 * ```
 * @returns {Partial<T>}
 */
export type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

/**
 * Deep required type
 * @example
 * ```ts
 * interface User {
 *   id: string;
 *   name: string;
 *   phone: string;
 *   address: {
 *     city: string;
 *     street: string;
 *   };
 * }
 *
 * type StrictProfile = DeepRequired<User>;
 *
 * const p: StrictProfile = {
 *   id: "1",
 *   name: "Alice",
 *   phone: "123",
 *   address: {
 *     city: "HN",
 *     street: "123",
 *   },
 * };
 * // if missing any field  → TS throw error
 * ```
 * @returns {Required<T>}
 */
export type DeepRequired<T> = {
  [K in keyof T]-?: DeepRequired<T[K]>;
};

/**
 * Value of type
 * @example
 * ```ts
 * const Colors = {
 *   primary: "#3498db",
 *   danger: "#e74c3c",
 *   success: "#2ecc71",
 * } as const;
 *
 * type ColorName = keyof typeof Colors;  // "primary" | "danger" | "success"
 * type ColorValue = ValueOf<typeof Colors>; // "#3498db" | "#e74c3c" | "#2ecc71"
 * ```
 * @returns {T[keyof T]}
 */
export type ValueOf<T> = T[keyof T];

/**
 * Union to array
 * @example
 * ```ts
 * type Role = "admin" | "user" | "guest";
 *
 * type RoleArray = UnionToArray<Role>;  // => ("admin" | "user" | "guest")[]
 * ```
 * @returns {T[]}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionToArray<T> = T extends any ? T[] : never;

/**
 * Prettify type
 * @example
 * ```ts
 * type A = {
 *   id: string;
 * };
 *
 * type B = {
 *   name: string;
 * };
 *
 * type C = Prettify<A & B>;  // => { id: string; name: string; }
 * ```
 * @returns {T}
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
