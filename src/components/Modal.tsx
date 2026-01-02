type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <button
            type="button"
            className="iconBtn modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="modal__body">{children}</div>

        <div className="modal__footer">
          <button type="button" className="btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
