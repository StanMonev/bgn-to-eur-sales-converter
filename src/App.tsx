import { useMemo, useState } from "react";
import "./App.css";

import { BGN_PER_EUR } from "./domain/money";
import { calculateChange } from "./domain/change";
import { parseNumber } from "./utils/parse";
import { translations, type Lang } from "./locales/translations";

import { LanguageToggle } from "./components/LanguageToggle";
import { MoneyInput } from "./components/MoneyInput";
import { SummaryCard } from "./components/SummaryCard";
import bgnToEuroIcon from "./assets/bgn_to_euro.png";
import { CreditsModal } from "./components/CreditsModal";
import { useLocalStorageState } from "./hooks/useLocalStorageState";



type Theme = "light" | "dark";

export default function App() {
  const isLang = (v: string): v is Lang => v === "bg" || v === "en";
  const isTheme = (v: string): v is Theme => v === "light" || v === "dark";

  const [lang, setLang] = useLocalStorageState<Lang>("app.lang", "bg", isLang);
  const [theme, setTheme] = useLocalStorageState<Theme>("app.theme", "light", isTheme);
  const translation = translations[lang];
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);


  const [totalEur, setTotalEur] = useState("");
  const [paidEur, setPaidEur] = useState("");
  const [paidBgn, setPaidBgn] = useState("");

  const total = useMemo(() => parseNumber(totalEur), [totalEur]);
  const eur = useMemo(() => parseNumber(paidEur), [paidEur]);
  const bgn = useMemo(() => parseNumber(paidBgn), [paidBgn]);
  const [availableEur, setAvailableEur] = useState("");
  const avail = useMemo(() => parseNumber(availableEur), [availableEur]);

  const result = useMemo(
    () =>
      calculateChange({
        totalEur: total,
        paidEur: eur,
        paidBgn: bgn,
        availableChangeEur: avail,
        missingTotalMessage: translation.enterTotal,
      }),
    [total, eur, bgn, avail, translation.enterTotal]
  );

  const year = new Date().getFullYear();

  return (
    <div className="app" data-theme={theme}>
      <div className="bg" aria-hidden="true" />

      {/* HEADER */}
      <header className="appHeader">
        <div className="wide">
          <div className="appHeader__left">
            <div className="brandIcon">
              <img
                src={bgnToEuroIcon}
                alt="BGN to EUR"
                className="brandIcon__img"
              />
            </div>

          </div>

          <div className="appHeader__center">
          </div>

          <div className="appHeader__right">
            <LanguageToggle
              lang={lang}
              onToggle={() => setLang((p) => (p === "bg" ? "en" : "bg"))}
            />


            <button
              type="button"
              className="iconBtn"
              onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="appMain">
        <div className="container">
          <div className="titleContainer">
            <h1 className="title">{translation.title}</h1>
            <p className="subtitle">{translation.rate(BGN_PER_EUR)}</p>
          </div>
          <section className="grid">
            <div className="card">
              <div className="card__title">{translation.inputsTitle}</div>

              <div className="form">
                <MoneyInput
                  label={translation.total}
                  value={totalEur}
                  onChange={setTotalEur}
                  placeholder={translation.totalPlaceholder}
                />

                <div className="twoCol">
                  <MoneyInput label={translation.paidEur} value={paidEur} onChange={setPaidEur} placeholder={translation.paidEurPlaceholder} />
                  <MoneyInput label={translation.paidBgn} value={paidBgn} onChange={setPaidBgn} placeholder={translation.paidBgnPlaceholder} />
                </div>
                <MoneyInput
                  label={translation.availableEur}
                  value={availableEur}
                  onChange={setAvailableEur}
                  placeholder={translation.availableEurPlaceholder}
                />


                <div className="row">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => {
                      setTotalEur("");
                      setPaidEur("");
                      setPaidBgn("");
                    }}
                  >
                    {translation.clear}
                  </button>
                </div>
              </div>
            </div>

            <div className="card card--result">
              <SummaryCard
                result={result}
                labels={{
                  summary: translation.summary,
                  totalLabel: translation.totalLabel,
                  paidEurLabel: translation.paidEurLabel,
                  paidBgnLabel: translation.paidBgnLabel,
                  paidTotalLabel: translation.paidTotalLabel,
                  change: translation.change,
                  changeInEur: translation.changeInEur,
                  changeInBgn: translation.changeInBgn,
                  owed: translation.owed,
                  hint: translation.hint,
                  eur: translation.eur,
                  bgn: translation.bgn,
                }}
              />
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="appFooter">
        <div className="wide">
          <div className="footer__inner">
            <div className="footer__left">© {year}</div>
            <div className="footer__center">{translation.madeWithLove}
              <a
                className="link linkBtn"
                href="https://www.stanimirmonevworks.com"
              >
                {translation.authorName}
              </a>
            </div>
            <div className="footer__right">
              <button
                type="button"
                className="link linkBtn"
                onClick={() => setIsCreditsOpen(true)}
              >
                {translation.credits}
              </button>
            </div>

          </div>
        </div>
      </footer>

      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
        title={translation.creditsTitle}
        iconsTitle={translation.creditsIconsTitle}
        items={[
          {
            label: translation.creditsIconBgnEur,
            by: translation.creditsIconBgnEurBy,
            link: "https://www.flaticon.com/free-icons/stock-market",
          },
          {
            label: translation.creditsIconBgFlag,
            by: translation.creditsIconBgFlagBy,
            link: "https://www.flaticon.com/free-icons/bulgaria",
          },
          {
            label: translation.creditsIconEnFlag,
            by: translation.creditsIconEnFlagBy,
            link: "https://www.flaticon.com/free-icons/english",
          },
        ]}
      />


    </div>
  );

}
