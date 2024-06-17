<template>
    <div>
        <p v-if="error">Error: {{ error }}</p>
        <p v-else>
            Latitude: {{ latitude }}<br>
            Longitude: {{ longitude }}
        </p>
    </div>
</template>

<script>
import { useGeolocation } from '../../stores';

export default {
    setup() {

        const { latitude, longitude, error } = useGeolocation()

        return {
            latitude,
            longitude,
            error,
        };
    },
};
</script>
