import { ReactNode } from 'react';

interface SocialSignInButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const SocialSignInButton = ({ children, onClick }: SocialSignInButtonProps) => {
  return (
    <button
      type='button'
      className='flex flex-col gap-5 justify-center items-center'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SocialSignInButton;
