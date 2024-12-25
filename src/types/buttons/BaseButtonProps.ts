import { ReactNode } from 'react';

export interface BaseButtonProps {
  backgroundColor?: string;
  textColor?: string;
  textSize: string;
  children: ReactNode;

  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;

  icon?: ReactNode;
  iconPosition?: 'left' | 'right';

  type?: 'button' | 'submit' | 'reset';
}
