import { BaseButtonProps } from './BaseButtonProps';

export interface OvalButtonProps
  extends Omit<BaseButtonProps, 'loading' | 'icon' | 'iconPosition'> {
  buttonSize: 's' | 'm';
  className?: string;
}
