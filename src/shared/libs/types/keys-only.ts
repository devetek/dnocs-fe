type BuiltinLeaf =
  | Date
  | RegExp
  | Error
  | Promise<any>
  | Map<any, any>
  | ReadonlyMap<any, any>
  | Set<any>
  | ReadonlySet<any>
  | WeakMap<any, any>
  | WeakSet<any>
  | ArrayBuffer
  | DataView
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | bigint
  | symbol;

export type KeysOnlyDeep<T> = T extends (...args: any) => any
  ? unknown
  : T extends readonly [/* tuple */ ...infer _]
    ? { [I in keyof T]: KeysOnlyDeep<T[I]> | undefined } // preserves tuple slots (+ readonly if present)
    : T extends readonly any[] | any[]
      ? unknown[] // force mutable arrays
      : T extends BuiltinLeaf // Discard known classes
        ? unknown
        : T extends object
          ? { [K in keyof T]: KeysOnlyDeep<T[K]> | undefined } // preserves optional/readonly modifiers
          : unknown;

export type KeysOnly<T> = T extends object
  ? { [K in keyof T]: unknown | undefined }
  : unknown;
