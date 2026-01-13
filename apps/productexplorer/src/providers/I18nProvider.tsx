// src/providers/I18nProvider.tsx
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isRtlLang } from "@productexplorer/i18n";

interface Props {
  children: ReactNode;
}

export const I18nProvider = ({ children }: Props) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = isRtlLang(i18n.language) ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return <>{children}</>;
};
