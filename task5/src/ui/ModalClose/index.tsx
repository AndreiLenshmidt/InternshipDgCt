import React, { useEffect } from 'react';
import Image from 'next/image';
import Close from '@public/icons/close.svg';
import styles from '@/ui/ModalClose/ModalClose.module.scss';

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

export default function ModalClose({
  title,
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) {
  // Закрытие модального окна при клике вне его области
  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  // Подключение обработчика событий
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles['close-button']} onClick={onClose}>
            {/* &times; */}
            <Close />
          </button>
        </div>

        <div className={styles.footer}>
          <button className={styles.button} onClick={onConfirm}>
            Да
          </button>
          <button className={styles.button} onClick={onClose}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
