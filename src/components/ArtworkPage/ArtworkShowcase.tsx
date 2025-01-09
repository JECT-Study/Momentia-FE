import { ArtworkInfoType, PaginationType } from '@/types';

import ArtworkCard from '../Card/ArtworkCard';
import Pagination from '../Pagination';

interface ArtworkShowcaseProps {
  artworkListData: ArtworkInfoType[];
  artworkListPage: PaginationType;
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
}

const ArtworkShowcase = ({
  artworkListData,
  artworkListPage,
  setCurrentPage,
}: ArtworkShowcaseProps) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className='w-full flex flex-wrap gap-[40_20px] justify-center items-center content-center'>
        {artworkListData.map((post: ArtworkInfoType) => (
          <ArtworkCard
            key={post.postId}
            artworkInfo={post}
            mode='artwork-list'
          />
        ))}
      </div>

      {!artworkListData.length && (
        <div className='body1 flex w-full h-[511px] justify-center items-center text-gray-500 text-center'>
          선택하신 카테고리에 해당하는 작품이 아직 없어요.
        </div>
      )}

      {artworkListData.length > 0 && (
        <div className='py-[70px]'>
          <Pagination
            currentPage={artworkListPage.requestPage}
            totalPages={artworkListPage.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ArtworkShowcase;
