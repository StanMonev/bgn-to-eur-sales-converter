import { Modal } from "./Modal";

type CreditsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  iconsTitle: string;
  items: {
    label: string;
    by: string;
    link: string;
  }[];
};

export function CreditsModal({
  isOpen,
  onClose,
  title,
  iconsTitle,
  items,
}: CreditsModalProps) {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <strong>{iconsTitle}</strong>

      <ul style={{ paddingLeft: 18, marginTop: 8 }}>
        {items.map((item) => (
          <li key={item.label} style={{ marginBottom: 6 }}>
            <div>{item.label}</div>
            <a
              className="link"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.by}
            </a>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
