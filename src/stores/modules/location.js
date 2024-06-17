import { ref, onMounted, watchEffect } from 'vue'
import { defineStore } from 'pinia'

const useGeolocationStore = defineStore({
  id: 'geolocation',
  state: () => ({
    latitude: null,
    longitude: null,
    error: null,
  }),
  actions: {
    getLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
          },
          (error) => {
            this.error = error.message
          }
        )
      } else {
        this.error = 'Geolocation is not supported'
      }
    },
  },
})

export function useGeolocation() {
  const store = useGeolocationStore()

  onMounted(() => {
    store.getLocation()
  })

  const latitude = ref(store.latitude)
  const longitude = ref(store.longitude)
  const error = ref(store.error)

  watchEffect(() => {
    latitude.value = store.latitude
    longitude.value = store.longitude
    error.value = store.error
  })

  return {
    latitude,
    longitude,
    error,
  }
}
