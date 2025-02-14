import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { TAB_OPTIONS, TabType } from '.';

interface ContentTabsProps {
  isMine: boolean;
  currentTab: TabType;
  setCurrentTab: Dispatch<SetStateAction<TabType>>;
}

const ContentTabs = ({
  currentTab,
  setCurrentTab,
  isMine,
}: ContentTabsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();

  const updatePaperId = (newId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('currentTab', newId);
    router.push(`${path}?${params.toString()}`);
  };

  const updateIndicator = () => {
    const buttons = containerRef.current?.querySelectorAll('button');
    const selectedButton = Array.from(buttons || []).find(
      (btn) => btn.textContent === currentTab,
    ) as HTMLButtonElement;

    if (selectedButton) {
      setIndicatorStyle({
        left: selectedButton.offsetLeft,
        width: selectedButton.offsetWidth,
      });
    }
  };

  useEffect(() => {
    updateIndicator();
  }, [currentTab, isMine]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);

    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, []);

  const changeTab = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    if (value) {
      setCurrentTab(value as TabType);
      updatePaperId(value);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative flex text-center border-b border-gray-500'
    >
      {TAB_OPTIONS.map(
        (option) =>
          (isMine || option !== '좋아요') && (
            <button
              key={option}
              type='button'
              value={option}
              className={`flex-1 px-2.5 pb-2.5 ${
                currentTab === option ? 'text-white' : 'text-gray-500'
              }`}
              onClick={changeTab}
            >
              {option}
            </button>
          ),
      )}
      <div
        className='absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-in-out'
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
    </div>
  );
};

export default ContentTabs;
