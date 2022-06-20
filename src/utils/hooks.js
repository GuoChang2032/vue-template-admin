import { Message } from "./tool.js";
import router from '@/router'
import {useUserInfo} from '@/stores/user'
// 退出登录
export function logout() {
    Message('warning','登录过期,请重新登录')
    const reg =/^(?:(?:\+|00)86)?1\d{10}$/
    const user = useUserInfo()
    user.remove()
    router.replace({ path: "/login" });
}
