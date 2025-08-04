'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import Loading from '@/components/Loading';
import ROUTE from '@/constants/routes';
import useGetSocialSignIn from '@/hooks/server/useGetSocialSignIn';

const RedirectPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { hasData } = useGetSocialSignIn({
    provider: (params.provider as string) || '',
    params: searchParams.toString(),
  });

  useEffect(() => {
    if (hasData) router.replace(ROUTE.home);
  }, [hasData]);

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Loading width={300} height={400} />
    </div>
  );
};

export default RedirectPage;
