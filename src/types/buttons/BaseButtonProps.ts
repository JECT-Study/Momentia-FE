import { ReactNode } from 'react';

export interface BaseButtonProps {
  variant: 'primary' | 'secondary' | 'tertiaty';
  children: ReactNode;

  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;

  icon?: ReactNode;
  iconPosition?: 'left' | 'right';

  type?: 'button' | 'submit';
}
