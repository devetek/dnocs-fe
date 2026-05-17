export type Tuple<
  T,
  N extends number,
  R extends T[] = [],
> = R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;

declare global {
  interface Array<T> {
    mayIncludes: (searchElement: unknown, fromIndex?: number) => boolean;

    splitAt: (index: number) => [T[], T[]];

    toTuple: <N extends number>(length: N) => Tuple<T, N>;
    toSet: () => Set<T>;
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

Array.prototype.toSet = function () {
  return new Set(this);
};

Array.prototype.mayIncludes = function (searchElement, fromIndex) {
  return this.includes(searchElement, fromIndex);
};

Array.prototype.splitAt = function (index) {
  if (index > this.length) {
    return [this, []];
  }

  if (index < 0) {
    return [[], this];
  }

  return [this.slice(0, index), this.slice(index)];
};
