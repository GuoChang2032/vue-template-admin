import { useUserInfo } from "@/stores/user";
// 判断是否有权限
export function usePermission() {
  const us = useUserInfo();
  const role = ref(us.info.role);
  // watch(
  //   () => us.getInfo,
  //   (nv, ov) => {
  //     role.value = nv;
  //   }
  // );
  // 账号的非法权限列表,要做动态权限的话这里获取动态数据即可
  const permissionList = ["sys"];
  // 没有权限进入的页面,在路由层面拦截
  const pageList = ["routeManage", "userManage"];
 
  const hasPermission = (key: string): boolean => {
    if (
      role.value === "teacher" &&
      (permissionList.includes(key) || pageList.includes(key))
    ) {
      return false;
    }
    return true;
  };
  return { hasPermission };
}
