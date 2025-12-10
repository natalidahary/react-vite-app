interface SharedButtonProps {
  children: string;
  onClick: () => void;
}

export const SharedButton = ({ children, onClick }: SharedButtonProps) => {
  return (
    <div className="shared-button-wrapper">
      <button className="shared-button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};