import { IconSize } from '@/components/Icon/iconSizes';
import { iconsNames } from '@/components/Icon/iconsNames';

export interface IconProps {
  name: keyof typeof iconsNames;
  size?: IconSize;
  className?: string;
  onClick?: () => void;
}
