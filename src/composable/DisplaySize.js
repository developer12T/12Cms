import { onMounted, onUnmounted, reactive, toRefs } from 'vue'

export function useDisplaySize() {
    const sizes = reactive({
        browserWidth: window.innerWidth,
        browserHeight: window.innerHeight,
        deviceWidth: screen.width,
        deviceHeight: screen.height,
        isMobile: false
    })

    const browserResized = () => {
        sizes.browserWidth = window.innerWidth
        sizes.browserHeight = window.innerHeight,
        sizes.deviceWidth = screen.width
        sizes.deviceHeight = screen.height
        sizes.isMobile = isMobile()
    }

    const isMobile = () => {
        return window.innerWidth < 600
    }

    onMounted(() => {
        window.addEventListener('resize', browserResized)
        sizes.isMobile = isMobile()
    })

    onUnmounted(() => {
        window.removeEventListener('resize', browserResized)
    })

    return {
        ...toRefs(sizes),
    }
}