import type { Result, ResultUnit } from './types';

export function result<T, E>(resultUnit: ResultUnit<T, E>): Result<T, E> {
  return {
    ...resultUnit,

    unwrap() {
      if ('err' in this) {
        throw this.err;
      }

      return this.data;
    },

    okay() {
      return 'err' in this ? null : this.data;
    },

    error() {
      return 'err' in this ? this.err : null;
    },

    map(mapper) {
      if (this.ok) {
        return result({
          ok: true,
          data: mapper(this.data),
        });
      }

      return result({
        ok: false,
        err: this.err,
      });
    },

    mapErr(mapper) {
      if (this.ok) {
        return result({
          ok: true,
          data: this.data,
        });
      }

      return result({
        ok: false,
        err: mapper(this.err),
      });
    },
  };
}

result.ok = <T, E>(data: T) => result<T, E>({ ok: true, data });

result.err = <T, E>(err: E) => result<T, E>({ ok: false, err });
