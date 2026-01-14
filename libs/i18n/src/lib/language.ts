const RTL_LANGS = new Set(["he", "ar", "fa"]);

export const isRtlLang = (lang: string) => RTL_LANGS.has(lang);

export const getStoredLanguage = () => {
  if (typeof localStorage === "undefined") {
    return "en";
  }

  return localStorage.getItem("lang") || "en";
};

export const setLanguage = (language: string) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("lang", language);
  }
};
