export interface KeyBinding {
  id: string;
  combos: string[];
  handler: (e: KeyboardEvent) => void;
}

export interface KeyboardManagerContextValue {
  registerBinding: (binding: KeyBinding) => void;
  unregisterBinding: (id: string) => void;
}

export interface KeyboardManagerProviderProps {
  children: React.ReactNode;
}
