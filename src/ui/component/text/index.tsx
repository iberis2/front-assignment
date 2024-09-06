import classNames from 'classnames';

import { color as colorMap } from '@/styles/color';

import S from './styles.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  typo?: 'h1' | 'h2' | 'h3' | 'h4' | 'b1' | 'b2' | 'b3' | 'b4';
  bold?: boolean;
  color?: keyof typeof colorMap;
}

export default function Text({
  children,
  typo = 'b1',
  color = 'gray-900',
  bold = false,
  className,
  ...props
}: Props) {
  const dynamicStyles = {
    color: colorMap[color],
  };
  return (
    <div
      className={classNames(S.text, S[typo], bold && S.bold, className)}
      style={dynamicStyles}
      {...props}
    >
      {children}
    </div>
  );
}
