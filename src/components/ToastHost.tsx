import { useEffect } from "react";
import { useToastStore } from "@/stores/toastStore";

export const ToastHost = () => {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    toasts.forEach((t) => {
      if (t.timeout) {
        setTimeout(() => removeToast(t.id), t.timeout);
      }
    });
  }, [toasts, removeToast]);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{t.message}</span>

          <button className="toast-close" onClick={() => removeToast(t.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
