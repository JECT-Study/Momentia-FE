import { ComponentType, FC } from 'react';

import { IconProps } from '@/types';

import iconSizes from './iconSizes';
import { iconsNames } from './iconsNames';

const Icon: FC<IconProps> = ({
  name,
  size = 'm',
  className = '',
  onClick,
}: IconProps) => {
  const Component = iconsNames[name] as ComponentType<{
    className?: string;
    onClick?: () => void;
  }>;

  const iconSize = iconSizes[size];
  const cursorStyle = onClick ? 'cursor-pointer' : '';

  if (!Component) {
    return null;
  }

  return (
    <Component
      className={`${iconSize} ${className} ${cursorStyle}`}
      onClick={onClick}
    />
  );
};

export default Icon;
