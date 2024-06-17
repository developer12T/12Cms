<template>
    <div class="text-center">
        <button type="button" :data-drawer-target="drawerId" :data-drawer-show="drawerId" @click="toggleBottomDrawer"
            :aria-controls="drawerId" data-drawer-placement="bottom" :class="btClass"
            class="text-white bg-blue-700 font-medium rounded-lg sm:text-xs md:text-lg inline-flex flex-col items-center justify-center">
            <slot name="icon"></slot>
            <span>ถ่ายรูป</span>
        </button>
    </div>
    <div v-show="showBackdrop" @click="closeDrawer" class="fixed inset-0 bg-black bg-opacity-50"></div>

    <div v-if="showDrawer" :id="drawerId"
        class="fixed bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform  bg-white transform-none"
        tabindex="-1" aria-labelledby="drawer-bottom-label">
        <div class="flex flex-col">
            <div>
                <button type="button" :data-drawer-hide="drawerId" :aria-controls="drawerId" @click="closeDrawer"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center">
                    <Icon class="w-5 h-5" icon="ph:x-bold" />
                </button>
            </div>
            <div class="sm:text-lg md:text-4xl text-center">
                ถ่ายรูปภาพร้านค้า
            </div>
            <div class="mt-5">
                <div id="controls-carousel" class="relative w-full">
                    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                        <div data-carousel-item="active">
                            <img v-if="imageUrl" :src="imageUrl"
                                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                            <img v-else src="../../public/imgUser.svg"
                                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <input type="file" @change="handleImage"
                    class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-3">
                <button type="button" @click="uploadImage"
                    class="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg md:text-xl px-5 py-2.5 me-2 mb-2">บันทึก</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue'
import { useUploadStore } from '../stores';
export default {
    props: {
        storeID: String,
        storeName: String,
        btClass: String,
        icHeight: String,
        icWidth: String,
        icName: String,
    },
    components: {
        Icon,
    },
    setup() {

        const showDrawer = ref(false);
        const showBackdrop = ref(false);
        const drawerId = 'drawer-bottom-picture';

        const toggleBottomDrawer = () => {
            showDrawer.value = !showDrawer.value;
            if (showDrawer.value) {
                showBackdrop.value = true
            }
        };

        const closeDrawer = () => {
            showDrawer.value = false;
            showBackdrop.value = false;
        };

        const uploadStore = useUploadStore()
        const imageUrl = ref(null);
        const handleImage = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    imageUrl.value = reader.result;
                }
                reader.readAsDataURL(file);
                uploadStore.setSelectedImage(file);
            } else {
                imageUrl.value = null;
            }
        }

        const uploadImage = () => {
            uploadStore.uploadResizedImage();
        };

        const UploadFinished = ref(false);
        watch(() => uploadStore.imageName, (newVal) => {
            if (newVal !== null) {
                UploadFinished.value = true;
                closeDrawer(); 
            }
        });

        return {
            showDrawer,
            showBackdrop,
            drawerId,
            toggleBottomDrawer,
            closeDrawer,
            imageUrl,
            handleImage,
            uploadImage
        }
    }

}
</script>
