import { BaseButtonProps } from './BaseButtonProps';

export interface OvalButtonProps
  extends Omit<BaseButtonProps, 'loading' | 'icon' | 'iconPosition' | 'type'> {
  buttonSize: 's' | 'm';
  className?: string;
}
