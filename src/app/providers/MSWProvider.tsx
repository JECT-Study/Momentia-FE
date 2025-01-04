'use client';

import { ReactNode, useEffect, useState } from 'react';

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
    return <div>Loading Mock Service Worker...</div>;
  }

  return <>{children}</>;
};

export default MSWProvider;
