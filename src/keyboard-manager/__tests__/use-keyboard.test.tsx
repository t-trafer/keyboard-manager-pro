import { renderHook } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { KeyBinding } from '../../types';
import { KeyboardManagerProvider } from '../keyboard-manager.provider';
import { useKeyboard } from '../use-keyboard';

describe('useKeyboard', () => {
  it('throws error when used outside provider', () => {
    const { result } = renderHook(() => useKeyboard());
    expect(() =>
      result.current.registerBinding({} as KeyBinding)
    ).toThrowError();
    expect(() => result.current.unregisterBinding('')).toThrowError();
  });

  it('provides keyboard context', () => {
    const wrapper = ({ children }) => (
      <KeyboardManagerProvider>{children}</KeyboardManagerProvider>
    );

    const { result } = renderHook(() => useKeyboard(), { wrapper });

    expect(result.current.registerBinding).toBeDefined();
    expect(result.current.unregisterBinding).toBeDefined();
  });
});
