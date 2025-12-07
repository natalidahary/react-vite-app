import { useState } from "react";

export default function DailyNote() {
  const [note, setNote] = useState("");

  const savedMessage = note.trim()
    ? "Your note is saved in CalmSpace."
    : "";

  return (
    <div style={{
      maxWidth: "420px",
      margin: "2rem auto",
      padding: "1.5rem",
      borderRadius: "12px",
      background: "#d6c8c8ff"
    }}>
      <h2 style={{ marginBottom: "2rem", fontSize: "2.2rem", fontWeight: 800, textAlign: "center" }}>Daily Note</h2>
      
      <textarea 
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a gentle intention for today..."
        rows="4"
        style={{
          width: "95%",
          padding: "0.8rem",
          borderRadius: "8px",
          border: "1px solid #100f0fff",
          resize: "none"
        }}
      />

      {savedMessage && (
        <p style={{
          marginTop: "1rem",
          color: "#1b5a0dff",
          fontSize: "1rem",
          textAlign: "center",
          fontWeight: 800
        }}>
          {savedMessage}
        </p>
      )}
    </div>
  );
}