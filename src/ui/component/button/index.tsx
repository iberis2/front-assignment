import classNames from 'classnames';

import S from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 's' | 'm' | 'l';
  color?: 'success' | 'info' | 'error' | 'default';
}

export default function Button({
  children,
  size = 's',
  color = 'default',
  className,
  ...props
}: Props) {
  return (
    <button className={classNames(S.button, S[size], S[color], className)} {...props}>
      {children}
    </button>
  );
}
