import { expect, describe, it } from 'vitest';

import { matchKeyCombo } from '../utils';

describe('matchKeyCombo', () => {
  it('matches simple key combinations', () => {
    const event = {
      key: 's',
      metaKey: true,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
    } as KeyboardEvent;

    expect(matchKeyCombo(event, 'meta+s')).toBe(true);
  });

  it('matches complex key combinations', () => {
    const event = {
      key: 's',
      metaKey: true,
      ctrlKey: false,
      altKey: true,
      shiftKey: true,
    } as KeyboardEvent;

    expect(matchKeyCombo(event, 'meta+alt+shift+s')).toBe(true);
  });

  it('does not match wrong key combinations', () => {
    const event = {
      key: 's',
      metaKey: true,
    } as KeyboardEvent;

    expect(matchKeyCombo(event, 'alt+s')).toBe(false);
    expect(matchKeyCombo(event, 'meta+alt+shift+s')).toBe(false);
  });

  it('supports special keys like Enter, Escape, etc.', () => {
    const enterEvent = {
      key: 'Enter',
      metaKey: true,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
    } as KeyboardEvent;

    expect(matchKeyCombo(enterEvent, 'meta+Enter')).toBe(true);

    const escapeEvent = {
      key: 'Escape',
      ctrlKey: true,
      metaKey: false,
      altKey: false,
      shiftKey: false,
    } as KeyboardEvent;

    expect(matchKeyCombo(escapeEvent, 'ctrl+Escape')).toBe(true);
  });

  it('treats main key as optional', () => {
    // Should work with just the modifier if that's all that's specified
    const metaEvent = {
      key: 'Meta',
      metaKey: true,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
    } as KeyboardEvent;

    expect(matchKeyCombo(metaEvent, 'meta')).toBe(true);
  });

  it('supports case insensitivity', () => {
    const arrowDownEvent = {
      key: 'ArrowDown',
      altKey: true,
      metaKey: false,
      ctrlKey: false,
      shiftKey: false,
    } as KeyboardEvent;

    expect(matchKeyCombo(arrowDownEvent, 'alt+ArrowDown')).toBe(true);
    expect(matchKeyCombo(arrowDownEvent, 'alt+arrowdown')).toBe(true);
  });

  it('supports delimiter', () => {
    const delimiterEvent = {
      key: 'a',
      altKey: false,
      metaKey: false,
      ctrlKey: false,
      shiftKey: false,
    } as KeyboardEvent;

    expect(matchKeyCombo(delimiterEvent, 'a')).toBe(true);

    const modifierDelimiterEvent = {
      key: 'a',
      altKey: false,
      metaKey: false,
      ctrlKey: true,
      shiftKey: false,
    } as KeyboardEvent;

    expect(matchKeyCombo(modifierDelimiterEvent, 'ctrl+a')).toBe(true);
  });
});
