interface Props {
  children: string;
  onClick: () => void;
}

export default function SharedButton({ children, onClick }: Props) {
  return (
    <div className="shared-button-wrapper">
      <button className="shared-button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
