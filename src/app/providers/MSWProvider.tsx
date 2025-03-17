'use client';

import { ReactNode, useEffect, useState } from 'react';

import Loading from '@/components/Loading';

const MSWProvider = ({ children }: { children: ReactNode }) => {
  const [isMSWReady, setIsMSWReady] = useState(false);

  useEffect(() => {
    const initMsw = async () => {
      if (process.env.NODE_ENV === 'development') {
        const { initMsw } = await import('@/mocks');
        await initMsw();
      }
      setIsMSWReady(true);
    };

    initMsw();
  }, []);

  if (!isMSWReady) {
    return (
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Loading width={300} height={400} />
      </div>
    );
  }

  return <>{children}</>;
};

export default MSWProvider;
