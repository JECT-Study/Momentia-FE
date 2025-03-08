'use client';

import { ReactNode, useEffect, useState } from 'react';

const MSWProvider = ({ children }: { children: ReactNode }) => {
  const [isMSWReady, setIsMSWReady] = useState(
    process.env.NEXT_PUBLIC_USE_MSW !== 'true',
  );

  useEffect(() => {
    const initMsw = async () => {
      if (isMSWReady) return;

      if (process.env.NODE_ENV === 'development') {
        const { initMsw } = await import('@/mocks');
        await initMsw();
      }

      setIsMSWReady(true);
    };

    initMsw();
  }, []);

  if (!isMSWReady) return null;

  return <>{children}</>;
};

export default MSWProvider;
