'use client';

import useGetSocialSignIn from '@/apis/user/socialSignIn';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const RedirectPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { hasData, isLoading } = useGetSocialSignIn({
    provider: (params.provider as string) || '',
    params: searchParams.toString(),
  });

  useEffect(() => {
    if (hasData) router.replace('/');
  }, [hasData]);

  return <></>;
};

export default RedirectPage;
