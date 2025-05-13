'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export function useDebouncedState<T>(initialValue: T, delay = 0) {
  const state = useState<T>(initialValue);

  const debounce = useDebounce(state[0], delay);

  return [debounce, state] as const;
}
