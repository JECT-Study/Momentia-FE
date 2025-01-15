import { EmblaCarouselType } from 'embla-carousel';
import { useEffect, useState } from 'react';

const useIsCarouselOverflow = (emblaApi: EmblaCarouselType | undefined) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const checkOverflow = () => {
      const canScroll = emblaApi.scrollSnapList().length > 1;

      setIsOverflowing(canScroll);
    };

    checkOverflow();

    emblaApi.on('resize', checkOverflow);

    return () => {
      emblaApi.off('resize', checkOverflow);
    };
  }, [emblaApi]);

  return isOverflowing;
};

export default useIsCarouselOverflow;
