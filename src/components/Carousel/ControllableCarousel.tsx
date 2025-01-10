'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { ReactNode } from 'react';

import { usePrevNextButtons } from '@/hooks/clientStateHooks/usePrevNextButtons';

import Icon from '../Icon/Icon';
import { IndicatorButton, useIndicatorButton } from './CarouselIndicator';

type ControlledCarouselPropsType<T> = {
  slides: T[];
  renderSlide: (card: T, index: number) => ReactNode;
  spaceSize?: 's' | 'm' | 'l';
};

const ControlledCarousel = <T,>({
  slides,
  renderSlide,
  spaceSize = 'm',
}: ControlledCarouselPropsType<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
    },
    [WheelGesturesPlugin()],
  );

  const { selectedIndex, scrollSnaps, onIndicatorButtonClick } =
    useIndicatorButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const [gapSizeClassName, padddingSizeClassName] =
    spaceSize === 'l'
      ? ['ml-[-45px] mobile:ml-[-50px]', 'pl-[45px] mobile:pl-[50px]']
      : spaceSize === 'm'
        ? ['ml-[-35px] mobile:ml-[-45px]', 'pl-[35px] mobile:pl-[45px]']
        : ['ml-[-30px]', 'pl-[30px]'];

  return (
    <section className='relative flex flex-col gap-[90px]'>
      <div className='absolute -top-[120px] right-0  hidden tablet:flex gap-[35px]'>
        <button
          type='button'
          className='touch-manipulation  cursor-pointer w-[60px] h-[60px] rounded-full  disabled:text-gray-800'
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        >
          <Icon
            name='ChevronLeft'
            size='xl'
            className={`${prevBtnDisabled ? 'text-gray-800' : 'text-gray-500'}`}
          />
        </button>
        <button
          type='button'
          className='touch-manipulation  cursor-pointer w-[60px] h-[60px] rounded-full  disabled:text-gray-800'
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        >
          <Icon
            name='ChevronRight'
            size='xl'
            className={`${nextBtnDisabled ? 'text-gray-800' : 'text-gray-500'}`}
          />
        </button>
      </div>

      <div className='max-w-[1980px] overflow-hidden' ref={emblaRef}>
        <div
          className={`flex backface-hidden touch-pan-y pinch-zoom ${gapSizeClassName}`}
        >
          {slides.map((item, index) => (
            <div
              className={`min-w-0 flex-[0_0_fit-content] ${padddingSizeClassName}`}
              key={index}
            >
              {renderSlide(item, index)}
            </div>
          ))}
        </div>
      </div>

      <div className='flex w-full h-[10px] bg-gray-900 rounded-[10px] overflow-hidden'>
        {scrollSnaps.map((_, index) => (
          <IndicatorButton
            key={index}
            onClick={() => onIndicatorButtonClick(index)}
            className={`w-full h-[10px] flex rounded-[10px] transition-all duration-300 ease-in-out ${index === selectedIndex ? ' bg-main ' : ''}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ControlledCarousel;
