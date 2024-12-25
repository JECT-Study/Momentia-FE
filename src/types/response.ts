interface ResponseRootType<T> {
  code: number;
  message: string;
  value: T;
}
