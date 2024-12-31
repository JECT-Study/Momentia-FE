'use client';
import useGetMonthlyPopularArtworks from '@/apis/monthly/getMonthlyPopularArtwork';
import ArtworkCard from '../Card/ArtworkCard';
import ControlledCarousel from '../Carousel/ControllableCarousel';

const MonthlyPopularArtworkSection = () => {
  const { artworksInfo, isLoading } = useGetMonthlyPopularArtworks();

  if (isLoading) return <div>로딩중</div>; // TODO:

  return (
    <div className='flex flex-col gap-[90px]'>
      <div className='flex flex-col gap-[30px]'>
        <p className='title-l'>이번 달, 놓치지 말아야 할 인기작품</p>
        <p className='subtitle1'>
          한 달간 모멘티아에서 가장 많은 좋아요를 받은 작품들을 만나보세요.
        </p>
      </div>
      <ControlledCarousel
        slides={artworksInfo}
        renderSlide={(info: ArtworkInfoType, index: number) => (
          <ArtworkCard
            key={info.postId}
            artworkInfo={info}
            mode='artwork-default'
            rank={index + 1}
          />
        )}
        spaceSize='l'
      />
    </div>
  );
};

export default MonthlyPopularArtworkSection;
