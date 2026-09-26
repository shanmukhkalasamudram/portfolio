"use client";

import { useEffect, useRef } from "react";

import Icon from "./Icon";
import styles from "./Modal.module.css";

// Full-screen popup built on the native <dialog>, which keeps keyboard focus
// inside and closes on Esc. Clicking the dimmed area around the content closes
// it too. Children only render while open, so a video stops when it closes.
export default function Modal({ open, onClose, closeLabel, onKeyDown, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
        <Icon name="close" size={24} />
      </button>
      {open && children}
    </dialog>
  );
}
