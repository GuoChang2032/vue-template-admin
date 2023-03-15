export type queryParams = {
  pageNo: number;
  pageSize: number;
  column: string;
  order: string;
  articleName: string;
  querySource: string;
  processStatus: string;
  articleAuthor: string;
};

export interface ResType<T> {
  code: number;
  data?: T;
  message: string;
  timestamp?: string;
  success: Boolean;
}


export type pageType = {
  page:number,
  total:number
}