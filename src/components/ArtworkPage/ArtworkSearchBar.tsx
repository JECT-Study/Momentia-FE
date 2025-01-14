import { ChangeEvent, KeyboardEvent } from 'react';

import Icon from '../Icon/Icon';

interface ArtworkSearchBarProps {
  searchKeyword: string;
  setSearchKeyword: (value: string | ((prev: string) => string)) => void;
  setSubmittedKeyword: (value: string) => void;
}

const ArtworkSearchBar = ({
  searchKeyword,
  setSearchKeyword,
  setSubmittedKeyword,
}: ArtworkSearchBarProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSubmittedKeyword(searchKeyword.trim());
  };

  const handleEnterKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='flex items-center w-[760px] h-[78px] px-5 rounded-[10px] bg-gray-900 mb-[110px] self-stretch'>
        <input
          className='flex-grow body1 bg-transparent border-none focus:outline-none placeholder-gray-500 focus:text-white'
          placeholder={`'작품 제목 또는 작가 이름'으로 검색`}
          value={searchKeyword}
          onChange={handleSearchChange}
          onKeyDown={handleEnterKeyDown}
        />
        <button onClick={handleSearchSubmit}>
          <Icon
            name='Search'
            size='l'
            className='text-white flex-shrink-0 ml-3'
          />
        </button>
      </div>
    </div>
  );
};

export default ArtworkSearchBar;
