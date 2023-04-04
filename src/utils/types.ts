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
  status: number;
  message: string;
  success: boolean;
  data?: any;
}

export type pageType = {
  page: number;
  total: number;
};

export type UserInfoType = {
  account: string;
  nickName: string;
  phone: string;
  role: string;
  token: string;
};

export interface ApiReturnType{
  status: number;
  message: string;
  success: boolean;
  data?: any;
};
