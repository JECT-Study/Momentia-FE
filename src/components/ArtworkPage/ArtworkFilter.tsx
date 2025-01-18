import { ArtworkField } from '@/types';

import ARTWORK_FIELDS from '../../constants/artworkFields';
import OvalButton from '../Button/OvalButton';
import DefaultCarousel from '../Carousel/DefaultCarousel';
import FilterDropdown from '../FilterDropdown';

interface ArtworkFilterProps {
  selectedArtworkField: string;
  setSelectedArtworkField: (value: string | ((prev: string) => string)) => void;
  selectedFilter: string;
  setSelectedFilter: (value: string | ((prev: string) => string)) => void;
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
}

const FILTER_OPTIONS = ['최신순', '인기순', '조회순'];

const ArtworkFilter = ({
  selectedArtworkField,
  setSelectedArtworkField,
  selectedFilter,
  setSelectedFilter,
  setCurrentPage,
}: ArtworkFilterProps) => {
  const selectedArtworkFieldName =
    ARTWORK_FIELDS.find((field) => field.value === selectedArtworkField)
      ?.name || '전체';

  const handleArtworkFieldClick = (artworkField: string) => {
    setSelectedArtworkField(artworkField);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  return (
    <>
      <div className='flex w-full justify-between items-end pb-[59px] overflow-x-auto'>
        <DefaultCarousel
          slides={ARTWORK_FIELDS}
          renderSlide={(artworkField: ArtworkField) => (
            <OvalButton
              key={artworkField.value}
              variant={
                selectedArtworkField === artworkField.value
                  ? 'primary'
                  : 'tertiary'
              }
              buttonSize='m'
              onClick={() => handleArtworkFieldClick(artworkField.value)}
            >
              {artworkField.name}
            </OvalButton>
          )}
        />
      </div>

      <div className='max-w-[1920px] py-[73px] flex justify-between items-center self-stretch'>
        <h1>{selectedArtworkFieldName}</h1>
        <FilterDropdown
          options={FILTER_OPTIONS}
          selected={selectedFilter}
          onChange={handleFilterChange}
          className='w-[149px]'
        />
      </div>
    </>
  );
};

export default ArtworkFilter;
