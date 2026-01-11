import '@/shared/libs/browser/array';
import type {
  Permission,
  PermissionUnit,
  PermissionUnitSpecial,
} from '../rules/schema/parts';

// =============================================================================
//   Parsers
// =============================================================================

const digitToPermissionUnit = (n: number): PermissionUnit => ({
  read: (n & 4) !== 0,
  write: (n & 2) !== 0,
  execute: (n & 1) !== 0,
});

const specialToPermissionUnit = (sp: number): PermissionUnitSpecial => ({
  setuid: (sp & 4) !== 0,
  setgid: (sp & 2) !== 0,
  sticky: (sp & 1) !== 0,
});

const parseFromOctal = (raw: string): Permission => {
  const s = raw.padStart(4, '0');

  if (!/^[0-7]{4}$/.test(s))
    throw new Error('Octal must be 3 - 4 digits (0 - 7).');

  const [sp, u, g, o] = s.split('').map(Number).toTuple(4);

  return {
    owner: digitToPermissionUnit(u),
    group: digitToPermissionUnit(g),
    public: digitToPermissionUnit(o),
    special: specialToPermissionUnit(sp),
  };
};

const parseFromSymbolic = (s: string): Permission => {
  if (!/^[r-][w-][xsStT-][r-][w-][xsStT-][r-][w-][xtT-]$/.test(s))
    throw new Error(
      'Symbolic must be 9 chars like rwxr-xr-x (s/S,t/T allowed).',
    );

  const seg = (i: number) => s.slice(i, i + 3);

  const [a, b, c] = [seg(0), seg(3), seg(6)];

  const unit = (sss: string, special: 'u' | 'g' | 'o') => {
    const x = sss[2];
    const exec = x === 'x' || x === (special === 'o' ? 't' : 's');
    const read = sss[0] === 'r';
    const write = sss[1] === 'w';

    return { read, write, execute: exec };
  };

  return {
    owner: unit(a, 'u'),
    group: unit(b, 'g'),
    public: unit(c, 'o'),
    special: {
      setuid: a[2] === 's' || a[2] === 'S',
      setgid: b[2] === 's' || b[2] === 'S',
      sticky: c[2] === 't' || c[2] === 'T',
    },
  };
};

// =============================================================================
//   Converters
// =============================================================================

const digitFromPermissionUnit = (u: PermissionUnit) =>
  (u.read ? 4 : 0) + (u.write ? 2 : 0) + (u.execute ? 1 : 0);

const xChar = (exec: boolean, setBit: boolean, letter: 's' | 't') =>
  setBit ? (exec ? letter : letter.toUpperCase()) : exec ? 'x' : '-';

// =============================================================================
//   Public APIs
// =============================================================================

export function translateUnixPermission(input: string): Permission {
  const raw = input.trim();

  if (/^[0-7]{3,4}$/.test(raw)) {
    return parseFromOctal(raw);
  }

  if (/^[r-][w-][xsStT-][r-][w-][xsStT-][r-][w-][xtT-]$/.test(raw)) {
    return parseFromSymbolic(raw);
  }

  throw new Error(
    'Use octal (e.g. 755/4755) or symbolic (e.g. rwxr-xr-x/rwsr-xr-x).',
  );
}

export function convertOctalFromPermission(p: Permission) {
  const sp =
    (p.special.setuid ? 4 : 0) +
    (p.special.setgid ? 2 : 0) +
    (p.special.sticky ? 1 : 0);

  const u = digitFromPermissionUnit(p.owner);
  const g = digitFromPermissionUnit(p.group);
  const o = digitFromPermissionUnit(p.public);

  return sp === 0 ? `${u}${g}${o}` : `${sp}${u}${g}${o}`;
}

export function convertSymbolicFromPermission(p: Permission) {
  const r = (b: boolean) => (b ? 'r' : '-');
  const w = (b: boolean) => (b ? 'w' : '-');

  const ow =
    r(p.owner.read) +
    w(p.owner.write) +
    xChar(p.owner.execute, p.special.setuid, 's');

  const gr =
    r(p.group.read) +
    w(p.group.write) +
    xChar(p.group.execute, p.special.setgid, 's');

  const pu =
    r(p.public.read) +
    w(p.public.write) +
    xChar(p.public.execute, p.special.sticky, 't');

  return ow + gr + pu;
}
