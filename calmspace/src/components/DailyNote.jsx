import { useState } from "react";
import styles from "./DailyNote.module.css";

export default function DailyNote() {
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (!note.trim()) {
      setIsSaved(false);
      return;
    }

    setIsSaved(true);
    setNote("");

    setTimeout(() => {
      setIsSaved(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Daily Note</h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a gentle intention for today..."
        rows="4"
        className={styles.textarea}
      />

      <div className={styles.buttonWrapper}>
        <button onClick={handleSave} className={styles.button}>
          Save Note
        </button>
      </div>

      {isSaved && (
        <p className={styles.message}>
          Your note is saved in CalmSpace.
        </p>
      )}
    </div>
  );
}