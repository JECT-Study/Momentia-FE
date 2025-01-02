export interface PaginationType {
  totalDataCnt: number;
  totalPages: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  requestPage: number;
  requestSize: number;
}
