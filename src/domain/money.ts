export const BGN_PER_EUR = 1.95583;

export function eurToCents(eur: number): number {
  return Math.round(eur * 100);
}

export function centsToEur(cents: number): number {
  return cents / 100;
}

export function bgnToEurCents(bgn: number): number {
  const eur = bgn / BGN_PER_EUR;
  return Math.round(eur * 100);
}

// NEW: EUR cents -> BGN stotinki (cents)
export function eurCentsToBgnCents(eurCents: number): number {
  // 1 EUR cent = 1.95583 stotinki
  return Math.round(eurCents * BGN_PER_EUR);
}

export function centsToBgn(cents: number): number {
  return cents / 100;
}
