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

interface ArtworkField {
  name: string;
  value: string;
}

const ArtworkFilter = ({
  selectedArtworkField,
  setSelectedArtworkField,
  selectedFilter,
  setSelectedFilter,
  setCurrentPage,
}: ArtworkFilterProps) => {
  const ARTWORK_FIELDS = [
    { name: '전체', value: 'ALL' },
    { name: '회화', value: 'PAINTING' },
    { name: '공예/조각', value: 'CRAFTSCULPTURE' },
    { name: '드로잉', value: 'DRAWING' },
    { name: '판화', value: 'PRINTMAKING' },
    { name: '서예', value: 'CALLIGRAPHY' },
    { name: '일러스트', value: 'ILLUSTRATION' },
    { name: '디지털아트', value: 'DIGITALART' },
    { name: '사진', value: 'PHOTOGRAPHY' },
    { name: '기타', value: 'OTHERS' },
  ];
  const FILTER_OPTIONS = ['최신순', '인기순', '조회순'];

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
      <div className='flex w-full justify-between items-end pb-[59px]'>
        <DefaultCarousel
          slides={ARTWORK_FIELDS}
          renderSlide={(artworkField: ArtworkField) => (
            <OvalButton
              key={artworkField.value}
              variant={
                selectedArtworkField === artworkField.value
                  ? 'primary'
                  : 'tertiaty'
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
        />
      </div>
    </>
  );
};

export default ArtworkFilter;
