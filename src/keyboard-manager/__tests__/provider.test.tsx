import { render, fireEvent, screen } from '@testing-library/react';
import React, { useEffect } from 'react';
import { vi, describe, it, expect } from 'vitest';

import { KeyboardManagerProvider } from '../keyboard-manager.provider';
import { useKeyboard } from '../use-keyboard';

describe('KeyboardManagerProvider', () => {
  it('renders children correctly', () => {
    render(
      <KeyboardManagerProvider>
        <div data-testid="child">Child</div>
      </KeyboardManagerProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('handles keyboard shortcuts', () => {
    const handler = vi.fn();

    function TestComponent() {
      const { registerBinding, unregisterBinding } = useKeyboard();

      useEffect(() => {
        registerBinding({
          id: 'test',
          combos: ['meta+s'],
          handler,
        });

        return () => {
          unregisterBinding('test');
        };
      }, [registerBinding, unregisterBinding]);

      return null;
    }

    const { unmount } = render(
      <KeyboardManagerProvider>
        <TestComponent />
      </KeyboardManagerProvider>
    );

    fireEvent.keyDown(document, {
      key: 's',
      metaKey: true,
    });

    expect(handler).toHaveBeenCalled();

    handler.mockClear();

    unmount();

    fireEvent.keyDown(document, {
      key: 's',
      metaKey: true,
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
