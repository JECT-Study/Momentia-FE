'use client';

import { ReactNode, useEffect, useState } from 'react';

const MSWProvider = ({ children }: { children: ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const initMsw = await import('@/mocks').then((res) => res.initMsw);
      await initMsw();
      setMswReady(true);
    };

    if (!mswReady) init();
  }, [mswReady]);

  return <>{children}</>;
};

export default MSWProvider;
