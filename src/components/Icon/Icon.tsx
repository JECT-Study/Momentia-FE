import { ComponentType } from 'react';

import iconSizes, { IconSize } from './iconSizes';
import { iconsNames } from './iconsNames';

interface IconProps {
  name: keyof typeof iconsNames;
  size?: IconSize;
  className?: string;
  onClick?: () => void;
}

const Icon = ({ name, size = 'm', className = '', onClick }: IconProps) => {
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
