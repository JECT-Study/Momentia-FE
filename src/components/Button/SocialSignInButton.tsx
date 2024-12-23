import { ReactNode } from 'react';

interface SocialSignInButtonProps {
  children: ReactNode;
  label: string;
  onClick: () => void;
}

const SocialSignInButton = ({
  children,
  label,
  onClick,
}: SocialSignInButtonProps) => {
  return (
    <button
      type='button'
      className='flex flex-col gap-5 justify-center items-center'
      onClick={onClick}
    >
      {children}
      <p>{label}</p>
    </button>
  );
};

export default SocialSignInButton;
