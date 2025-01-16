import { BaseButtonProps } from './BaseButtonProps';

export interface OvalButtonProps
  extends Omit<
    BaseButtonProps,
    'disabled' | 'loading' | 'icon' | 'iconPosition' | 'type'
  > {
  buttonSize: 's' | 'm';
  className?: string;
}
