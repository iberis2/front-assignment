import classNames from 'classnames';

import S from './styles.module.scss';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end';
  grow?: boolean;
}

export default function Flex({
  children,
  direction = 'row',
  justify = 'flex-start',
  align = 'flex-start',
  grow = false,
  gap,
  className,
}: FlexProps) {
  return (
    <div
      className={classNames(
        S.flex,
        S[direction],
        S[`justify-${justify}`],
        S[`align-${align}`],
        grow && S.grow,
        className,
      )}
      style={{ gap }}
    >
      {children}
    </div>
  );
}
