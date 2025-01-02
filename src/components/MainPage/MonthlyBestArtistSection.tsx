import useGetMonthlyPopularArtists from '@/apis/monthly/getMonthlyPopularArtists';
import ArtistProfileCard from '../Card/ArtistProfileCard';
import ControlledCarousel from '../Carousel/ControllableCarousel';

const MonthlyBestArtistSection = () => {
  const { cardsInfo, isLoading } = useGetMonthlyPopularArtists();

  if (isLoading) return <div>로딩중</div>;

  return (
    <div className='flex flex-col gap-[90px]'>
      <div className='flex flex-col gap-[30px]'>
        <p className='title-l'>이달의 예술가 TOP10</p>
        <p className='subtitle1'>
          지난 한 달간 가장 많은 작품 좋아요를 받은 작가들이에요.
        </p>
      </div>
      <ControlledCarousel
        slides={cardsInfo}
        renderSlide={(info: ArtistInfoType, index: number) => (
          <ArtistProfileCard artistInfo={{ ...info }} rank={index + 1} />
        )}
      />
    </div>
  );
};

export default MonthlyBestArtistSection;
