import { useArtworkList } from '@/hooks/useArtworkList';
import ArtworkCard from '../Card/ArtworkCard';
import ControlledCarousel from '../Carousel/ControllableCarousel';

const LatestArtworkSection = () => {
  const { data: artWorkData, isLoading } = useArtworkList();

  if (isLoading) return <div>로딩중</div>; // TODO:

  return (
    <div className='flex flex-col gap-[90px]'>
      <div className='flex flex-col gap-[30px]'>
        <p className='title-l'>창작의 순간, 따끈따끈 신규작품</p>
        <p className='subtitle1'>신규 작품을 가장 먼저 확인해 보세요.</p>
      </div>
      <ControlledCarousel
        slides={artWorkData}
        renderSlide={(info: ArtworkInfoType) => (
          <ArtworkCard artworkInfo={info} mode='artwork-latest' />
        )}
      />
    </div>
  );
};

export default LatestArtworkSection;