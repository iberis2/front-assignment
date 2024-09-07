'use client';

import classNames from 'classnames';
import { createContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { DialogContent, DialogFooter, DialogTitle as DialogTitle } from './Children';
import S from './styles.module.scss';

export const DialogContext = createContext<{
  onClose: () => void;
  closeButton: boolean;
} | null>(null);

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  closeButton?: boolean;
  onClose: () => void;
  fullWidth?: boolean;
}

function Dialog({
  children,
  open,
  closeButton = true,
  onClose,
  fullWidth = false,
  className,
  ...props
}: ModalProps) {
  const [portalEl, setPortalEl] = useState<Element | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [open]);

  useEffect(() => {
    setPortalEl(document.getElementById('portal'));
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const handleClickOutSide = () => {
    document.body.style.overflowY = 'auto';
    return onClose();
  };

  return (
    open &&
    portalEl &&
    createPortal(
      <DialogContext.Provider value={{ onClose, closeButton }}>
        {!fullWidth && <div className={S.background} onClick={handleClickOutSide} />}
        <div className={classNames(S.modal, className)} {...props}>
          {children}
        </div>
      </DialogContext.Provider>,
      document.body,
    )
  );
}

export default Object.assign(Dialog, {
  Title: DialogTitle,
  Content: DialogContent,
  Footer: DialogFooter,
});
