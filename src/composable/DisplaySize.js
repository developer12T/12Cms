import { onMounted, onUnmounted, reactive, toRefs } from "vue";

export function useDisplaySize() {
    const sizes = reactive({
        browserWidth: window.innerWidth,
        deviceWidth: screen.width,
        deviceHeight: screen.height,
        isMobile: false
    })

    const browserResized = () => {
        sizes.browserWidth = window.innerWidth
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