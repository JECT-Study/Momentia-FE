'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { ReactNode } from 'react';

import useIsCarouselOverflow from '@/hooks/clientStateHooks/useIsCarouselOverflow';

interface DefaultCarouselPropsType<T> {
  slides: T[];
  renderSlide: (card: T) => ReactNode;
  spaceSize?: 's' | 'm' | 'l';
}

const DefaultCarousel = <T,>({
  slides,
  renderSlide,
  spaceSize = 's',
}: DefaultCarouselPropsType<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
    },
    [WheelGesturesPlugin()],
  );

  const isOverflowing = useIsCarouselOverflow(emblaApi);

  const [gapSizeClassName, padddingSizeClassName] =
    spaceSize === 'l'
      ? ['ml-[-50px]', 'pl-[50px]']
      : spaceSize === 'm'
        ? ['ml-[-45px]', 'pl-[45px]']
        : ['ml-[-31px]', 'pl-[31px]'];

  return (
    <section className='relative flex flex-col gap-[90px]'>
      <div className='relative max-w-[1980px] overflow-hidden' ref={emblaRef}>
        <div
          className={`flex backface-hidden touch-pan-y pinch-zoom ${gapSizeClassName}`}
        >
          {slides.map((item, index) => (
            <div
              className={`min-w-0 flex-[0_0_fit-content] ${padddingSizeClassName}`}
              key={index}
            >
              {renderSlide(item)}
            </div>
          ))}
        </div>
        {isOverflowing && (
          <div className='absolute top-0 right-0 bg-gradient-to-r from-background-base/0 to-background-base w-28 h-full' />
        )}
      </div>
    </section>
  );
};

export default DefaultCarousel;
