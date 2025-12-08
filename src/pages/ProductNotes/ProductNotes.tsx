import { useState } from "react";
import SharedButton from "@/components/SharedButton/SharedButton";
import styles from "./ProductNotes.module.css";

export default function ProductNotes() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!note.trim()) return;

    setSaved(true);
    setNote("");

    setTimeout(() => setSaved(false), 1200);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Product Notes</h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note about a product..."
        className={styles.textarea}
      />

      <div className={styles.buttonWrapper}>
        <SharedButton onClick={handleSave}>Save Note</SharedButton>
      </div>

      {saved && <p className={styles.message}>Your note has been saved.</p>}
    </div>
  );
}