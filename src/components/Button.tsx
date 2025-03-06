import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
