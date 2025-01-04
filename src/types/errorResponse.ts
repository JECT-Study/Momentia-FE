export interface ErrorResponseType<T> {
  code: number;
  message: string;
  value: T | null;
}
