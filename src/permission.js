import router from './router'
import { start, done } from '@/utils/nprogress.js'
import { useUserInfo } from "@/stores/user"
import { useMenuTag } from "@/stores/menu";
import { judgeTab, deepCopy, Message } from '@/utils/utils'
import { usePermission } from "@/hooks/common/business";

const whiteList = ['/login'] // no redirect whitelist
// 不加入tab页显示名单
const hideTabList = ['/login']
// 允许访问角色
const roleList = ['admin', 'teacher']
const APP_NAME = 'template admin'

// 路由守卫,路由跳转前
router.beforeEach((to, from, next) => {
    start()
    const user = useUserInfo()
    const { hasPermission } = usePermission()
    document.title = to.meta.title ? to.meta.title + ' - ' + APP_NAME : '前端模板' + ' - ' + APP_NAME
    // 在此判断是否登录和确定角色是否有权限访问
    let token = user?.info?.token || ''
    let role = user?.info?.role || ''
    if (!whiteList.includes(to.path) && !token) {
        // 判断是否登录
        done()
        Message('warning', '请登录')
        next({ path: '/login' })
        return
    } else if (!whiteList.includes(to.path) && !roleList.includes(role)) {
        // 账号是否有角色进入系统
        done()
        Message('warning', '账号没有权限')
        next({ path: '/login' })
        return
    } else if (role !== 'admin' && !hasPermission(to.name)) {
        // 禁止没有权限的角色进入某个页面
        done()
        Message('warning', '没有权限进入')
        next({ path: '/' })
        return
    }
    const umt = useMenuTag()
    // 不在非显示列表,没有重复,
    if (hideTabList.every((x) => x !== to.path) && !judgeTab(to.name, umt.tabs)) {
        let x = deepCopy(to)
        delete x.matched
        umt.setTab(x)
    }
    done()
    next()
})
// 路由跳转后
router.afterEach((to) => {
})