export interface Ok<T> {
  ok: true;
  data: T;
}

export interface Err<E> {
  ok: false;
  err: E;
}

export type ResultUnit<T, E> = Ok<T> | Err<E>;

export type Result<T, E> = ResultUnit<T, E> & {
  unwrap: () => T;
  okay: () => T | null;
  error: () => E | null;
  map: <U>(mapper: (before: T) => U) => Result<U, E>;
  mapErr: <F>(mapper: (before: E) => F) => Result<T, F>;
};
