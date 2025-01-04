'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ReactNode } from 'react';

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
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
  });

  const [gapSizeClassName, padddingSizeClassName] =
    spaceSize === 'l'
      ? ['ml-[-50px]', 'pl-[50px]']
      : spaceSize === 'm'
        ? ['ml-[-45px]', 'pl-[45px]']
        : ['ml-[-31px]', 'pl-[31px]'];

  return (
    <section className='relative flex flex-col gap-[90px]'>
      <div className='max-w-[1980px] overflow-hidden' ref={emblaRef}>
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
      </div>
    </section>
  );
};

export default DefaultCarousel;
