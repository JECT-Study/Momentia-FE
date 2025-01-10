import { EmblaCarouselType } from 'embla-carousel';
import { useLayoutEffect, useState } from 'react';

const useIsCarouselOverflow = (emblaApi: EmblaCarouselType | undefined) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    if (!emblaApi) return;

    const checkOverflow = () => {
      const canScroll = emblaApi.scrollSnapList().length > 1;

      setIsOverflowing(canScroll);
    };

    emblaApi.on('init', checkOverflow);
    emblaApi.on('resize', checkOverflow);

    return () => {
      emblaApi.off('init', checkOverflow);
      emblaApi.off('resize', checkOverflow);
    };
  }, [emblaApi]);

  return isOverflowing;
};

export default useIsCarouselOverflow;
