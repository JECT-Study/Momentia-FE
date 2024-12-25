import { ReactNode } from 'react';

interface SocialLoginButtonProps {
  children: ReactNode;
  label: string;
  onClick: () => void;
}

const SocialLoginButton = ({
  children,
  label,
  onClick,
}: SocialLoginButtonProps) => {
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

export default SocialLoginButton;
