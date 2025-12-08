import { useState } from "react";
import SharedButton from "@/components/SharedButton/SharedButton";
import styles from "./DailyNote.module.css";

export default function DailyNote() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!note.trim()) return;

    setSaved(true);
    setNote("");

    setTimeout(() => setSaved(false), 1000);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Daily Note</h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className={styles.textarea}
        placeholder="Write your intention..."
      />

      <SharedButton onClick={handleSave}>Save Note</SharedButton>

      {saved && <p className={styles.message}>Your note is saved.</p>}
    </div>
  );
}