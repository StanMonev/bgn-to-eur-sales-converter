type Props = {
  href: string;
  label: string;
};

export function SupportButton({ href, label }: Props) {
  if (!href) return null;

  return (
    <a
      className="supportBtn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <span className="supportBtn__icon" aria-hidden="true">☕</span>
      <span className="supportBtn__text">{label}</span>
    </a>
  );
}
