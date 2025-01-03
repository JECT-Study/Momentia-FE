'use client';

import MonthlyBestArtistSection from '@/components/MainPage/MonthlyBestArtistSection';
import MonthlyPopularArtworkSection from '@/components/MainPage/MonthlyPopularArtworkSection';

const Home = () => {
  return (
    <div className='max-w-[1960px] w-full mx-auto my-[126px] flex flex-col gap-[126px] px-[32px] tablet:px-[140px]'>
      <MonthlyPopularArtworkSection />
      {/* <LatestArtworkSection /> */}
      <MonthlyBestArtistSection />
    </div>
  );
};

export default Home;
