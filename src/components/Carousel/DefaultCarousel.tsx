'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ReactNode } from 'react';

interface DefaultCarouselPropsType<T> {
  slides: T[];
  renderSlide: (card: T) => ReactNode;
  spaceSize?: 'small' | 'medium' | 'large';
}

const DefaultCarousel = <T,>({
  slides,
  renderSlide,
  spaceSize = 'small',
}: DefaultCarouselPropsType<T>) => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
  });

  const [gapSizeClassName, padddingSizeClassName] =
    spaceSize === 'large'
      ? ['ml-[-50px]', 'pl-[50px]']
      : spaceSize === 'medium'
        ? ['ml-[-45px]', 'pl-[45px]']
        : ['ml-[-30px]', 'pl-[30px]'];

  return (
    <section className='relative flex flex-col gap-[90px]'>
      <div className='w-[1640px] overflow-hidden' ref={emblaRef}>
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
