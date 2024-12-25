'use client';

import useGetSocialLogin from '@/apis/user/socialLogIn';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface ProviderPageProps {
  provider: string;
}

function ProviderPage({ provider }: ProviderPageProps) {
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

export default ProviderPage;
