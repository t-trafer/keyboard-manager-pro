import { useContext } from 'react';

import { KeyboardManagerContext } from './keyboard-manager-context';
import type { KeyboardManagerContextValue } from '../types';

export function useKeyboard(): KeyboardManagerContextValue {
  const context = useContext(KeyboardManagerContext);
  return context;
}
