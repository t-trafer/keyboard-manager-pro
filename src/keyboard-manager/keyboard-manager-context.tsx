import { createContext } from 'react';

import type { KeyboardManagerContextValue } from '../types';

export const KeyboardManagerContext =
  createContext<KeyboardManagerContextValue>({
    registerBinding: () => {
      throw new Error('[KeyboardManager] Provider is missing');
    },
    unregisterBinding: () => {
      throw new Error('[KeyboardManager] Provider is missing');
    },
  });

KeyboardManagerContext.displayName = 'KeyboardManagerContext';
