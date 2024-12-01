export type SearchParams = Record<string, string | string[] | undefined>;

export interface PageDataParams<T extends Record<string, string> = Record<string, string>> {
  params: T;
  searchParams: SearchParams;
}
