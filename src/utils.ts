export function matchKeyCombo(event: KeyboardEvent, combo: string) {
  const keys = combo.toLowerCase().split('+');
  const mainKey = keys[keys.length - 1];

  return (
    keys.includes('ctrl') === event.ctrlKey &&
    keys.includes('shift') === event.shiftKey &&
    keys.includes('alt') === event.altKey &&
    keys.includes('meta') === event.metaKey &&
    mainKey === event.key
  );
}
