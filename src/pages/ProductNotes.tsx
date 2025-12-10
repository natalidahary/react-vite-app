import { useState } from "react";
import { SharedButton } from "@/components";

export const ProductNotes = () => {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!note.trim()) return;

    setSaved(true);
    setNote("");

    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="notes-card">
      <h2 className="notes-title">Product Notes</h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="notes-textarea"
        placeholder="Write a note about a product..."
      />

      <div className="notes-actions">
        <SharedButton onClick={handleSave}>Save Note</SharedButton>
      </div>

      {saved && <p className="notes-message">Your note has been saved.</p>}
    </div>
  );
};