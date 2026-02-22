import { result } from '../result';
import type { Result } from '../result/types';

export interface MatchWithFuzzyBitapParams {
  skipNormalization?: boolean;
  maxDistance?: 1 | 2 | 3;
  sourceText: string;
  query: string;
}

export function matchWithFuzzyBitap(
  params: MatchWithFuzzyBitapParams,
): Result<boolean, Error> {
  const sourceText = params.skipNormalization
    ? params.sourceText
    : params.sourceText.toLowerCase();
  const query = params.skipNormalization
    ? params.query
    : params.query.toLowerCase();

  const m = query.length;
  if (m === 0) return result.ok(true);
  if (m > 31) return result.err(new Error('Pattern too long'));

  const maxDistance = params.maxDistance ?? 1;

  // Use a Map for Unicode support while keeping lookups fast
  const charMasks: Record<number, number> = {};
  for (let i = 0; i < m; i++) {
    const code = query.charCodeAt(i);
    if (!(code in charMasks)) charMasks[code] = ~0;
    charMasks[code]! &= ~(1 << i);
  }

  // Pre-allocate arrays ONCE outside the loop
  const R = new Int32Array(maxDistance + 1).fill(~0);
  const oldR = new Int32Array(maxDistance + 1);
  R[0] = ~1;

  const matchBit = 1 << m;

  for (let i = 0; i < sourceText.length; i++) {
    const charCode = sourceText.charCodeAt(i);
    const charMask = charMasks[charCode] ?? ~0;

    // Fast copy without new allocation
    oldR.set(R);

    // Update exact match
    R[0] = (oldR[0]! | charMask) << 1;

    for (let k = 1; k <= maxDistance; k++) {
      // Bitwise transitions for Substitution, Insertion, and Deletion
      const substitution = oldR[k - 1]! << 1;
      const insertion = oldR[k - 1]!;
      const deletion = R[k - 1]! << 1;

      R[k] = ((oldR[k]! | charMask) << 1) & substitution & insertion & deletion;
    }

    if ((R[maxDistance]! & matchBit) === 0) {
      return result.ok(true);
    }
  }

  return result.ok(false);
}
