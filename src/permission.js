import router from './router'
import { start, done } from '@/utils/nprogress.js'
import { Message } from "@/utils/tool.js";
import { useUserInfo } from "@/stores/user"
const whiteList = ['/login'] // no redirect whitelist


router.beforeEach((to, from, next) => {
    start()
    const user = useUserInfo()
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '论文查引系统'
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
router.afterEach(() => {
    done()
})