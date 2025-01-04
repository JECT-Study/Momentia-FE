import { ComponentType } from 'react';

import { IconProps } from '@/types/iconProps';

import iconSizes from './iconSizes';
import { iconsNames } from './iconsNames';

const Icon = ({ name, size = 'm', className = '', onClick }: IconProps) => {
  if (!name) {
    throw new Error('아이콘 이름은 필수입니다.');
  }

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
