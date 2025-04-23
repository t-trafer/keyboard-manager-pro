import { useEffect, useMemo, useRef } from 'react';

import { KeyBinding, KeyboardManagerProviderProps } from '../types';
import { KeyboardManagerContext } from './keyboard-manager-context';
import { matchKeyCombo } from '../utils';

export function isInputElement(element: HTMLElement): boolean {
  const tagName = element.tagName?.toLowerCase();
  return (
    tagName === 'input' || tagName === 'textarea' || element.isContentEditable
  );
}

export function KeyboardManagerProvider({
  children,
  enabled = true,
}: KeyboardManagerProviderProps) {
  const bindings = useRef(new Map<string, KeyBinding>());

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      for (const binding of bindings.current.values()) {
        if (!binding.allowInput && isInputElement(e.target as HTMLElement)) {
          continue;
        }
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
  }, [enabled]);

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
