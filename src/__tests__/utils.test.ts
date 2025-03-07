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
});
