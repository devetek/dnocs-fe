/** biome-ignore-all lint/suspicious/noExplicitAny: This is for generic constraints */
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null;

export type Builtin =
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
  | Float64Array;
