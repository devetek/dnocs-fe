import { useEffect, useLayoutEffect } from 'react';

import { isBrowser } from '../browser/environment';

export const useIsomorphicEffect = isBrowser() ? useLayoutEffect : useEffect;
