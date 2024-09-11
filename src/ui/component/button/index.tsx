import classNames from 'classnames';

import Flex from '../flex';
import S from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 's' | 'm' | 'l';
  color?: 'success' | 'info' | 'error' | 'default';
  isLoading?: boolean;
}

export default function Button({
  children,
  size = 's',
  color = 'default',
  className,
  isLoading,
  disabled,
  ...props
}: Props) {
  return (
    <button
      className={classNames(S.button, S[size], S[color], className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {!isLoading ? (
        children
      ) : (
        <Flex justify='center'>
          <div className={S.spinner} />
        </Flex>
      )}
    </button>
  );
}
