import NProgress from 'nprogress'

NProgress.configure({
    easing: 'ease',
    speed: '500',
})

export const start = () => {
    NProgress.start()
}

export const done = () => {
    NProgress.done()
}