import Image from 'next/image';

import GoogleLogo from '@/../public/images/google.svg';
import KakaoLogo from '@/../public/images/kakako.svg';

import SocialSignInButton from './Button/SocialSignInButton';

const SocialSignInSection = () => {
  const handleKakaoSignIn = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_PATH}`,
    });
  };

  const handleGoogleSignIn = () => {
    const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_PATH;
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile&access_type=offline`;

    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <>
      <div className='flex items-center'>
        <div className='flex-grow h-[1px] bg-gray-600'></div>
        <span className='px-4 text-gray-400'>간편로그인</span>
        <div className='flex-grow h-[1px] bg-gray-600'></div>
      </div>
      <div className='flex gap-20 justify-center'>
        <SocialSignInButton
          children={<Image src={KakaoLogo} alt='kakao logo' />}
          onClick={handleKakaoSignIn}
        />
        <SocialSignInButton
          children={<Image src={GoogleLogo} alt='kakao logo' />}
          onClick={handleGoogleSignIn}
        />
      </div>
    </>
  );
};

export default SocialSignInSection;
