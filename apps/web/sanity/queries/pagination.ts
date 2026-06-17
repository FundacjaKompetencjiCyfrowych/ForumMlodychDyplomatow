export type PaginationParameters = {
  page?: number;
  perPage?: number;
  q?: string;
};

export type PaginationResult<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
};

export type PaginationQueryFunction<T, TParams> = (
  params: PaginationParameters & TParams
) => Promise<PaginationResult<T>>;
