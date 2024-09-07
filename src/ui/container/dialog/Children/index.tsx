import classNames from 'classnames';
import { useContext } from 'react';

import Flex, { FlexProps } from '@/src/ui/component/flex';

import { DialogContext } from '..';
import S from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

export function DialogTitle({ children }: Props) {
  const context = useContext(DialogContext);

  return (
    <Flex direction='column'>
      {context?.closeButton && (
        <button className={S.closeButton} onClick={context?.onClose}>
          X
        </button>
      )}
      <div className={S.title}>{children}</div>
      <div className={S.divider} />
    </Flex>
  );
}

export function DialogContent({ children }: Props) {
  return <div className={S.content}>{children}</div>;
}

interface ModalFooterProps extends Props, FlexProps {}

export function DialogFooter({ children, gap = 4, className, ...flexProps }: ModalFooterProps) {
  return (
    <Flex className={classNames(S.footer, className)} gap={gap} justify='flex-end' {...flexProps}>
      {children}
    </Flex>
  );
}
