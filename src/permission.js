import router from './router'
import { start, done } from '@/utils/nprogress.js'
import { Message } from "@/utils/tool.js";
import { useUserInfo } from "@/stores/user"
const whiteList = ['/login'] // no redirect whitelist


// 路由跳转前
router.beforeEach((to, from, next) => {
    start()
    const user = useUserInfo()
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '前端模板'
    }

    let token = user.tokens
    if (!token && !whiteList.includes(to.path)) {
        done()
        Message('warning', '请登录')
        next({ path: '/login' })
        return
    }
    done()
    next()
})
// 路由跳转后
router.afterEach(() => {
    done()
})