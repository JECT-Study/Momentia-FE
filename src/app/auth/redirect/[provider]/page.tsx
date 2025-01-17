'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import ROUTE from '@/constants/routes';
import useGetSocialSignIn from '@/hooks/serverStateHooks/useGetSocialSignIn';

const RedirectPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { hasData, isLoading } = useGetSocialSignIn({
    provider: (params.provider as string) || '',
    params: searchParams.toString(),
  });

  useEffect(() => {
    if (hasData) router.replace(ROUTE.home);
  }, [hasData]);

  return <></>;
};

export default RedirectPage;
