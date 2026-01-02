export function MoneyInput(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span>{props.label}</span>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder ?? ""}
        inputMode="decimal"
      />
    </label>
  );
}
