import { FC } from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
