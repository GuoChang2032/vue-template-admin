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

export type Song = {
  id: number;
  querySource_dictText: string;
  articleName: string;
  authorComp: string;
  articleAuthor: string;
  articleSource: string;
  articleDate: string;
  sourceType: string;
  beiyinNum: string;
  beiyinNames: string;
  beiyinQikans: string;
  beiyinAuthors: string;
  impactFactor: string;
  downloadCount: string;
  createTime: string;
  processStatus: number;
  processStatus_dictText: string;
};

