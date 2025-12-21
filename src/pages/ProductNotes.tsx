import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components";

export const ProductNotes = () => {
  const { t } = useTranslation("common");
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
      <h2 className="notes-title">{t("notes.title")}</h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="notes-textarea"
        placeholder={t("notes.placeholder")}
      />

      <div className="notes-actions">
        <Button onClick={handleSave}>{t("notes.save")}</Button>
      </div>

      {saved && (
        <p className="notes-message">{t("notes.saved")}</p>
      )}
    </div>
  );
};
