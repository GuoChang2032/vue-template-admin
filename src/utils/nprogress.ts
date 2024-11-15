import NProgress from 'nprogress'
// 进度条配置
NProgress.configure({
    easing: 'ease',
    speed: 500,
})

export const start = () => {
    NProgress.start()
}

export const done = () => {
    NProgress.done()
}