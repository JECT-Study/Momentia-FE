import { useEffect, useRef } from 'react';

const useClickOutside = <T extends HTMLElement>(handler: () => void) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        !targetRef.current ||
        targetRef.current.contains(event.target as Node)
      ) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [handler]);

  return targetRef;
};

export default useClickOutside;
