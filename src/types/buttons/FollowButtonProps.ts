import { BaseButtonProps } from './BaseButtonProps';

export interface FollowButtonProps
  extends Omit<
    BaseButtonProps,
    'children' | 'disabled' | 'loading' | 'icon' | 'iconPosition' | 'type'
  > {
  initFollowState: boolean;
  followUserId: number;
}
