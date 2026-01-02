import { bgnToEurCents, eurToCents, eurCentsToBgnCents } from "./money";

export type ChangeResult =
  | { ok: false; message: string }
  | {
      ok: true;
      totalCents: number;
      paidEurCents: number;
      paidBgnEurCents: number;
      paidTotalCents: number;
      diffCents: number; // +change, -owed
      changeEurCents: number;
      changeBgnCents: number;
    };

export function calculateChange(args: {
  totalEur: number | null;
  paidEur: number | null;
  paidBgn: number | null;
  availableChangeEur: number | null;
  missingTotalMessage: string;
}): ChangeResult {
  const { totalEur, paidEur, paidBgn, availableChangeEur, missingTotalMessage } = args;

  if (totalEur === null) return { ok: false, message: missingTotalMessage };

  const totalCents = eurToCents(totalEur);
  const paidEurCents = paidEur === null ? 0 : eurToCents(paidEur);
  const paidBgnEurCents = paidBgn === null ? 0 : bgnToEurCents(paidBgn);

  const paidTotalCents = paidEurCents + paidBgnEurCents;
  const diffCents = paidTotalCents - totalCents;

  let changeEurCents = 0;
  let changeBgnCents = 0;

  if (diffCents > 0) {
    const availableCents = availableChangeEur === null ? 0 : eurToCents(availableChangeEur);
    changeEurCents = Math.min(diffCents, Math.max(availableCents, 0));
    const remainingEurCents = diffCents - changeEurCents;
    changeBgnCents = remainingEurCents > 0 ? eurCentsToBgnCents(remainingEurCents) : 0;
  }

  return {
    ok: true,
    totalCents,
    paidEurCents,
    paidBgnEurCents,
    paidTotalCents,
    diffCents,
    changeEurCents,
    changeBgnCents,
  };
}
