import { SORT_OPTIONS } from '@/constants/sortOptions';
import { ArtworkField } from '@/types';

import ARTWORK_FIELDS from '../../constants/artworkFields';
import OvalButton from '../Button/OvalButton';
import DefaultCarousel from '../Carousel/DefaultCarousel';
import SortDropdown from '../SortDropdown';

interface ArtworkFilterProps {
  selectedArtworkField: string;
  setSelectedArtworkField: (value: string | ((prev: string) => string)) => void;
  selectedOption: string;
  setSelectedOption: (value: string | ((prev: string) => string)) => void;
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
}

const ARTWORK_FIELDS_WITH_ALL_OPTION = [
  { name: '전체', value: 'ALL' },
  ...ARTWORK_FIELDS,
];

const ArtworkFilter = ({
  selectedArtworkField,
  setSelectedArtworkField,
  selectedOption,
  setSelectedOption,
  setCurrentPage,
}: ArtworkFilterProps) => {
  const selectedArtworkFieldName =
    ARTWORK_FIELDS_WITH_ALL_OPTION.find(
      (field) => field.value === selectedArtworkField,
    )?.name || '전체';

  const handleArtworkFieldClick = (artworkField: string) => {
    setSelectedArtworkField(artworkField);
    setCurrentPage(1);
  };

  const handleSortChange = (newOption: string) => {
    setSelectedOption(newOption);
  };

  return (
    <>
      <div className='flex w-full justify-between items-end pb-[59px] overflow-x-auto'>
        <DefaultCarousel
          slides={ARTWORK_FIELDS_WITH_ALL_OPTION}
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
        <SortDropdown
          options={SORT_OPTIONS}
          selected={selectedOption}
          onChange={handleSortChange}
          className='w-[149px]'
        />
      </div>
    </>
  );
};

export default ArtworkFilter;
