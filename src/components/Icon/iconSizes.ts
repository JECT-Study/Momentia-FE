export type IconSize = 'xl' | 'l' | 'm' | 's';

const iconSizes: Record<IconSize, string> = {
  xl: 'w-[60px] h-[60px]',
  l: 'w-[30px] h-[30px]',
  m: 'w-6 h-6',
  s: 'w-[18px] h-[18px]',
};

export default iconSizes;
