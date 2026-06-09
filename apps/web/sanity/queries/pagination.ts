export type PaginationParameters<T extends string> = {
  page: number;
  perPage: number;
  orderBy: T;
  order: "asc" | "desc";
};

export type PaginationResult<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
};

export type PaginationQueryFunction<T, TParams> = (
  params: PaginationParameters<any> & TParams
) => Promise<PaginationResult<T>>;
