import bgIcon from "../assets/bg.png";
import enIcon from "../assets/en.png";
import type { Lang } from "../locales/translations";

type Props = {
  lang: Lang;
  onToggle: () => void;
};

export function LanguageToggle({ lang, onToggle }: Props) {
  const nextLang: Lang = lang === "bg" ? "en" : "bg";

  const icon = nextLang === "bg" ? bgIcon : enIcon;
  const label = nextLang === "bg" ? "BG" : "EN";

  return (
    <button
      type="button"
      className="iconBtn langBtn"
      onClick={onToggle}
      aria-label={`Switch language to ${label}`}
      title={`Switch to ${label}`}
    >
      <img
        src={icon}
        alt={label}
        className="langIcon"
        draggable={false}
      />
    </button>
  );
}
