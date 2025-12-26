// src/providers/I18nProvider.tsx
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  children: ReactNode;
}

export const I18nProvider = ({ children }: Props) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.language === "he";

    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return <>{children}</>;
};
