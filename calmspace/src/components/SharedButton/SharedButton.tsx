import styles from "./SharedButton.module.css";

interface Props {
  children: string;
  onClick: () => void;
}

export default function SharedButton({ children, onClick }: Props) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
