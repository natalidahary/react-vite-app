import { Trans, useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation("common");

  return (
    <div className="about-page">
      <h2 className="about-title">{t("about.title")}</h2>

      <p className="about-text">{t("about.p1")}</p>

      <p className="about-text">{t("about.p2")}</p>

      <p className="about-text">
        <Trans
          i18nKey="about.more"
          ns="common"
          components={[
            <span />,
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            />
          ]}
        />
      </p>
    </div>
  );
};
