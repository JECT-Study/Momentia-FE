'use client';

import useGetSocialLogin from '@/apis/user/socialLogIn';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface RedirectPageProps {
  provider: string;
}

function RedirectPage({ provider }: RedirectPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasData, isLoading } = useGetSocialLogin({
    provider,
    params: searchParams.toString(),
  });

  useEffect(() => {
    if (hasData) router.replace('/');
  }, [hasData, isLoading]);

  return <></>;
}

export default RedirectPage;
