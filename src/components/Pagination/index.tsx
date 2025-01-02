import Icon from '../Icon/Icon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const calculateVisiblePages = (
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number,
  ): number[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const currentPageGroup = Math.floor(currentPage / maxVisiblePages);
    const groupStartPage = currentPageGroup * maxVisiblePages;
    const groupEndPage = Math.min(
      groupStartPage + maxVisiblePages - 1,
      totalPages - 1,
    );

    const visiblePages = Array.from(
      { length: groupEndPage - groupStartPage + 1 },
      (_, i) => groupStartPage + i,
    );

    if (groupEndPage < totalPages - 1) {
      visiblePages.push(-1);
    }

    return visiblePages;
  };

  const visiblePages = calculateVisiblePages(currentPage, totalPages, 5);

  return (
    <div className='flex items-center justify-center gap-6'>
      <div className='flex gap-1' id='first-previous-buttons'>
        <button
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
          aria-label='Go to first page'
          className={`p-2 rounded ${
            isFirstPage ? 'text-gray-800 cursor-not-allowed' : 'text-gray-500'
          }`}
        >
          <Icon name='ChevronDoubleLeft' size='s' />
        </button>

        <button
          onClick={() => onPageChange(currentPage)}
          disabled={isFirstPage}
          aria-label='Go to previous page'
          className={`p-2 rounded ${
            isFirstPage ? 'text-gray-800 cursor-not-allowed' : 'text-gray-500'
          }`}
        >
          <Icon name='ChevronLeft' size='s' />
        </button>
      </div>

      <div
        className='button-s flex items-center text-gray-600'
        id='number-buttons'
      >
        {visiblePages.map((page, index) =>
          page === -1 ? (
            <span key={`ellipsis-${index}`} className='flex items-center'>
              <Icon name='MoreHorizontal' size='s' className='mx-[13px]' />
              <span className='mx-[18px]'>{totalPages}</span>
            </span>
          ) : (
            <div>
              <button
                key={page}
                onClick={() => onPageChange(page + 1)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`rounded-full w-[46px] h-[46px] p-[13px 7px] ${
                  page === currentPage
                    ? 'text-white bg-main'
                    : 'text-gray-600 hover:bg-gray-900'
                }`}
              >
                {page + 1}
              </button>
            </div>
          ),
        )}
      </div>

      <div className='flex gap-1' id='next-last-buttons'>
        <button
          onClick={() => onPageChange(currentPage + 2)}
          disabled={isLastPage}
          aria-label='Go to next page'
          className={`p-2 rounded ${
            isLastPage ? 'text-gray-800 cursor-not-allowed' : 'text-gray-500'
          }`}
        >
          <Icon name='ChevronRight' size='s' />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
          aria-label='Go to last page'
          className={`p-2 rounded ${
            isLastPage ? 'text-gray-800 cursor-not-allowed' : 'text-gray-500'
          }`}
        >
          <Icon name='ChevronDoubleRight' size='s' />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
