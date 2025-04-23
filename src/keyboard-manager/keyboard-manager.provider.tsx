import { useEffect, useMemo, useRef } from 'react';

import { KeyBinding, KeyboardManagerProviderProps } from '../types';
import { KeyboardManagerContext } from './keyboard-manager-context';
import { DEBUG_KEYBOARD_MANAGER, DELIMITER } from '../constants';
import { debugLog, isInputElement, matchKeyCombo } from '../utils';

export function KeyboardManagerProvider({
  children,
  enabled = true,
}: KeyboardManagerProviderProps) {
  const bindings = useRef(new Map<string, KeyBinding>());
  const performanceMetrics = useRef({
    startTime: 0,
    totalTime: 0,
    eventCount: 0,
    maxTime: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const startTime = performance.now();
      performanceMetrics.current.startTime = startTime;

      debugLog(
        `Handling keydown event for ${[
          e.ctrlKey && 'ctrl',
          e.shiftKey && 'shift',
          e.altKey && 'alt',
          e.metaKey && 'meta',
          e.key,
        ]
          .filter(Boolean)
          .join(DELIMITER.value)}`
      );
      for (const binding of bindings.current.values()) {
        if (!binding.allowInput && isInputElement(e.target as HTMLElement)) {
          debugLog(
            `Skipping binding (${binding.id}) because it is an input element`
          );
          continue;
        }
        const match = binding.combos.find((combo) => matchKeyCombo(e, combo));
        if (match) {
          if (DEBUG_KEYBOARD_MANAGER) {
            const executionTime = performance.now() - startTime;
            performanceMetrics.current.totalTime += executionTime;
            performanceMetrics.current.eventCount++;
            performanceMetrics.current.maxTime = Math.max(
              performanceMetrics.current.maxTime,
              executionTime
            );
            debugLog(
              `Binding (${binding.id}) matched key combo (${match}) [⚡ ${executionTime.toFixed(2)}ms; avg: ${(performanceMetrics.current.totalTime / performanceMetrics.current.eventCount).toFixed(2)}ms; max: ${performanceMetrics.current.maxTime.toFixed(2)}ms]`
            );
          }
          binding.handler(e);
          return;
        }
      }
    };

    debugLog('Adding event listener');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      debugLog('Removing event listener');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);

  const keyboard = useMemo(
    () => ({
      registerBinding: (binding: KeyBinding) => {
        debugLog(`Registering binding (${binding.id})`);
        bindings.current.set(binding.id, binding);
      },
      unregisterBinding: (id: string) => {
        debugLog(`Unregistering binding (${id})`);
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
