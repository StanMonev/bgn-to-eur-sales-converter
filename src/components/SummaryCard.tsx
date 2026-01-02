
import type { ChangeResult } from "../domain/change";
import { centsToEur, centsToBgn } from "../domain/money";


export function SummaryCard(props: {
  result: ChangeResult;
  labels: {
    summary: string;
    totalLabel: string;
    paidEurLabel: string;
    paidBgnLabel: string;
    paidTotalLabel: string;
    change: string;
    changeInEur: string;
    changeInBgn: string;
    owed: string;
    hint: string;
    eur: string;
    bgn: string;
  };
}) {
  const { result, labels: L } = props;

  if (!result.ok) {
    return <div style={{ opacity: 0.8 }}>{result.message}</div>;
  }

  return (
    <>
      <div style={{ opacity: 0.8, marginBottom: 6 }}>{L.summary}</div>

      <div style={{ display: "grid", gap: 6, fontSize: 16 }}>
        <div>
          {L.totalLabel} <b>{centsToEur(result.totalCents).toFixed(2)} {L.eur}</b>
        </div>
        <div>
          {L.paidEurLabel} <b>{centsToEur(result.paidEurCents).toFixed(2)} {L.eur}</b>
        </div>
        <div>
          {L.paidBgnLabel} <b>{centsToEur(result.paidBgnEurCents).toFixed(2)} {L.eur}</b>
        </div>
        <div>
          {L.paidTotalLabel} <b>{centsToEur(result.paidTotalCents).toFixed(2)} {L.eur}</b>
        </div>
      </div>

      <hr style={{ margin: "14px 0" }} />

      {result.diffCents >= 0 ? (
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 28, fontWeight: 800 }}>
            {L.change} {centsToEur(result.diffCents).toFixed(2)} {L.eur}
          </div>

          <div style={{ color: "var(--muted)" }}>
            {L.changeInEur}: <b>{centsToEur(result.changeEurCents).toFixed(2)} {L.eur}</b>
          </div>

          {result.changeBgnCents > 0 && (
            <div style={{ color: "var(--muted)" }}>
              {L.changeInBgn}: <b>{centsToBgn(result.changeBgnCents).toFixed(2)} {L.bgn}</b>
            </div>
          )}
        </div>
      ) : (
        <div style={{ fontSize: 28, fontWeight: 800 }}>
          {L.owed} {centsToEur(Math.abs(result.diffCents)).toFixed(2)} {L.eur}
        </div>
      )}

      <div style={{ marginTop: 10, opacity: 0.7 }}>{L.hint}</div>
    </>
  );
}
