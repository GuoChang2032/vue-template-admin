
// http请求返回数据格式
export interface ResType {
  status: number;
  message: string;
  success: boolean;
  data?: any;
}

// 分页格式
export type pageType = {
  page: number;
  total: number;
  size?: number;
};

// 用户登录返回数据类型
export type UserLoginReturnType = {
  account: string;
  nickName: string;
  phone: string;
  role: string;
  token: string;
};

// 接口返回值类型
export interface ApiReturnType {
  status: number;
  message: string;
  success: boolean;
  data?: any;
  records?: any;
}

// 用户登录后缓存的数据类型
export interface UserLoginInfoType {
  role: string;
  token: string;
  account?: string;
  nickName?: string;
  phone?: string;
}
// 国际化选项类型
export interface LanguageType {
  label: string;
  key: string;
}
// 头像下拉选项类型
export interface IndexUserMenu {
  label: string;
  key: string;
  icon: Function;
}

// store中的tabs类型
export interface TabsType {
  fullPath: string;
  path: string;
  query: Object;
  hash: string;
  name: string;
  params: Object;
  meta: {
    title: string;
  };
  href: string;
}

// 全局监听事件中传递的数据的类型
export interface EmitDataType {
  val?: string;
}

// 用户管理列头数据类型
export interface UserManageListType {
  prop: string;
  label: string;
  width?: string;
}

// 用户管理列表数据类型
export interface UserManageListDataType {
  account: string;
  id: string;
  nickName: string;
  password: string;
  phone: string;
  role: string;
}

// 菜单数据类型
export interface MenuDataType {
  parentMenu: string;
  menuName: string;
  menuKey: string;
  menuIcon: string;
  pagePath: string;
  menuSort: string;
  rolePermiss: string[];
  status: string;
  children?: [];
}

// 分页改变事件中传递的数据的类型
export interface pageChangeDataType {
  page: number;
}

// 一般ui组件中，例如select中选项的值类型
export interface optsType {
  label: string;
  value: number | string;
}

// Message弹窗的类型
export type msgType = "success" | "warning" | "info" | "error";

export type fetchReturnType = {
  data: any;
  error: any;
};
