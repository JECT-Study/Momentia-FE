'use client';

import useGetSocialSignIn from '@/apis/user/socialSignIn';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface RedirectPageProps {
  provider: string;
}

function RedirectPage({ provider }: RedirectPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasData, isLoading } = useGetSocialSignIn({
    provider,
    params: searchParams.toString(),
  });

  useEffect(() => {
    if (hasData) router.replace('/');
  }, [hasData]);

  return <></>;
}

export default RedirectPage;
