export type Tuple<
  T,
  N extends number,
  R extends T[] = [],
> = R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;

declare global {
  interface Array<T> {
    toTuple: <N extends number>(length: N) => Tuple<T, N>;
  }
}

Array.prototype.toTuple = function <T, N extends number>(
  length: N,
): Tuple<T, N> {
  if (this.length < length) {
    throw new Error(
      `Expected array of length >= ${length}, but got ${this.length}`,
    );
  }

  return this as Tuple<T, N>;
};
