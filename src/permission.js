import router from './router'
import { start, done } from '@/utils/nprogress.js'
import { useUserInfo } from "@/stores/user"
import { useMenuTag } from "@/stores/menu";
import { judgeTab, deepCopy } from '@/utils/utils'

const whiteList = ['/login'] // no redirect whitelist
// 不加入tab页显示名单
const hideTabList = ['/login']
const APP_NAME = 'template admin'

// 路由守卫,路由跳转前
router.beforeEach((to, from, next) => {
    start()
    const user = useUserInfo()
    if (to.meta.title) {
        document.title = to.meta.title + ' - ' + APP_NAME
    } else {
        document.title = '前端模板' + ' - ' + APP_NAME
    }
    // 在此判断是否登录
    // let token = user.tokens
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
router.afterEach((to) => {
    const umt = useMenuTag()

    if (!judgeTab(to.name, umt.tabs) && hideTabList.every((x) => x !== to.path)) {
        let x = deepCopy(to)
        delete x.matched
        umt.setTab(x)
    }
    done()
})