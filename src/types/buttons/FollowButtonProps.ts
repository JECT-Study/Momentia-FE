import { BaseButtonProps } from './BaseButtonProps';

export interface FollowButtonProps
  extends Omit<
    BaseButtonProps,
    | 'variant'
    | 'children'
    | 'disabled'
    | 'loading'
    | 'icon'
    | 'iconPosition'
    | 'type'
  > {
  initFollowState: boolean | null;
  followUserId: number;
  isFull?: boolean;
}
