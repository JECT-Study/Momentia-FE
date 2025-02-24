import useGetArtworkList from '@/hooks/serverStateHooks/useGetArtworkList';
import useToastStore from '@/stores/useToastStore';
import { ArtworkInfoType } from '@/types';

import ArtworkCard from '../Card/ArtworkCard';
import ControlledCarousel from '../Carousel/ControllableCarousel';

const LatestArtworkSection = () => {
  const { showToast } = useToastStore();

  const {
    data: { data: artwork },
    isLoading,
    isError,
  } = useGetArtworkList({
    sort: 'recent',
    search: '',
    page: 1,
    size: 10,
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) showToast('error', '작품 목록 조회에 실패하였습니다.');

  return (
    <div className='flex flex-col gap-[90px]'>
      <div className='flex flex-col gap-[30px]'>
        <p className='title-l'>창작의 순간, 따끈따끈 신규작품</p>
        <p className='subtitle1'>신규 작품을 가장 먼저 확인해 보세요.</p>
      </div>
      <ControlledCarousel
        slides={artwork}
        renderSlide={(info: ArtworkInfoType) => (
          <ArtworkCard artworkInfo={info} mode='artwork-latest' />
        )}
      />
    </div>
  );
};

export default LatestArtworkSection;
