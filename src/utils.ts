import { DELIMITER, MODIFIER_KEYS } from './constants';

/**
 * Match a key combo against a keyboard event
 * @param event - The keyboard event to match against
 * @param combo - The key combo to match. Format: one or more modifiers followed by an optional single main key.
 * @returns True if the key combo matches the event, false otherwise
 *
 * @example
 * matchKeyCombo(new KeyboardEvent('keydown', { key: 'ctrl+shift+a' }), 'ctrl+shift+a') // true
 * matchKeyCombo(new KeyboardEvent('keydown', { key: 'ctrl+shift+a' }), 'ctrl+a') // false
 */
export function matchKeyCombo(event: KeyboardEvent, combo: string) {
  const keys = combo.toLowerCase().split(DELIMITER.value);
  const mainKey = keys[keys.length - 1];

  const modifiersMatch =
    keys.includes(MODIFIER_KEYS.CTRL) === event.ctrlKey &&
    keys.includes(MODIFIER_KEYS.SHIFT) === event.shiftKey &&
    keys.includes(MODIFIER_KEYS.ALT) === event.altKey &&
    keys.includes(MODIFIER_KEYS.META) === event.metaKey;
  if (!modifiersMatch) return false;

  if (Object.values(MODIFIER_KEYS).includes(mainKey)) return true;

  if (mainKey === DELIMITER.key) return event.key === DELIMITER.value;
  return mainKey.toLowerCase() === event.key.toLowerCase();
}
