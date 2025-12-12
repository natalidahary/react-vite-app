interface SharedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const SharedButton = ({ children, className = "", ...props }: SharedButtonProps) => {
  return (
    <button
      className={`shared-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};