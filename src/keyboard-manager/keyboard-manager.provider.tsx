import { useEffect, useMemo, useRef } from 'react';

import { KeyBinding, KeyboardManagerProviderProps } from '../types';
import { KeyboardManagerContext } from './keyboard-manager-context';
import { matchKeyCombo } from '../utils';

export function KeyboardManagerProvider({
  children,
}: KeyboardManagerProviderProps) {
  const bindings = useRef(new Map<string, KeyBinding>());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const binding of bindings.current.values()) {
        const match = binding.combos.some((combo) => matchKeyCombo(e, combo));
        if (match) {
          binding.handler(e);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const keyboard = useMemo(
    () => ({
      registerBinding: (binding: KeyBinding) => {
        bindings.current.set(binding.id, binding);
      },
      unregisterBinding: (id: string) => {
        bindings.current.delete(id);
      },
    }),
    []
  );

  return (
    <KeyboardManagerContext.Provider value={keyboard}>
      {children}
    </KeyboardManagerContext.Provider>
  );
}
