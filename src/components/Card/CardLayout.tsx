import { ReactNode } from 'react';

interface CardLayoutProps {
  children: ReactNode;
  onClick: () => void;
  classname?: string;
}

const CardLayout = ({ children, classname, onClick }: CardLayoutProps) => {
  return (
    <div
      className={`relative overflow-hidden group rounded-[5px] w-full aspect-[4/5] bg-gray-900 cursor-pointer ${classname}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardLayout;
