import router from './router'
import { start, done } from '@/utils/nprogress.js'
import { useUserInfo } from "@/stores/user"

const whiteList = ['/login'] // no redirect whitelist
const APP_NAME = ' - 前端模板项目'

// 路由跳转前
router.beforeEach((to, from, next) => {
    start()
    const user = useUserInfo()
    if (to.meta.title) {
        document.title = to.meta.title + APP_NAME
    } else {
        document.title = '前端模板项目'
    }

    // let token = user.token
    // if (!token && !whiteList.includes(to.path)) {
    //     done()
    //     Message('warning', '请登录')
    //     next({ path: '/login' })
    //     return
    // }
    done()
    next()
})
// 路由跳转后
router.afterEach(() => {
    done()
})