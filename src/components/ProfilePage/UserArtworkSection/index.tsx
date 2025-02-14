'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import ArtworkTab from './ArtworkTab';
import CollectionTab from './CollectionTab';
import ContentTabs from './ContentTabs';
import LikedTab from './LikedTab';

export const TAB_OPTIONS = ['작품', '좋아요', '컬렉션'] as const;

export type TabType = (typeof TAB_OPTIONS)[number];

const UserArtworkSection = ({ isMine }: { isMine: boolean }) => {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('currentTab') as TabType) || '작품';
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab);

  const content = () => {
    if (currentTab === '작품') return <ArtworkTab />;
    if (currentTab === '좋아요') return <LikedTab />;
    if (currentTab === '컬렉션') return <CollectionTab />;
  };

  return (
    <div className='flex-1 flex flex-col gap-[50px]'>
      <ContentTabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isMine={isMine}
      />
      {content()}
    </div>
  );
};

export default UserArtworkSection;
