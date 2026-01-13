import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  className?: string;
};

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
