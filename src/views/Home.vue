<template>
    <LayoutMain>
        <template v-slot:header>
            <div class="flex items-center justify-between pb-[138px]">
                <div class="flex justify-end ml-5">
                    <img src="/public/logo-onetwo.png" class="me-3 sm:h-16 md:h-20">
                </div>
                <div class="flex justify-end mr-2">
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex justify-start">
                </div>
                <div class="flex justify-end">

                </div>
            </div>
        </template>
        <template v-slot:body>
            <div class="flex justify-center relative bottom-20">
                <MobileChart v-if="isMobile" />
                <TabletChart v-else />
            </div>
            <div class="flex justify-center relative bottom-10">
                <MobileAnnounce v-if="isMobile" />
                <TabletAnnounce v-else />
            </div>
        </template>
    </LayoutMain>
    <MobileButtonNav v-if="isMobile" />
    <TabletButtonNav v-else />
</template>

<script setup>
import LayoutMain from './LayoutMain.vue'
import TabletButtonNav from '../components/tablet/ButtonNav.vue'
import MobileButtonNav from '../components/mobile/ButtonNav.vue'
import TabletAnnounce from '../components/tablet/Announce.vue'
import MobileAnnounce from '../components/mobile/Announce.vue'
import TabletChart from '../components/tablet/ChartSales.vue'
import MobileChart from '../components/mobile/ChartSales.vue'
import { useDisplaySize } from '../composable/DisplaySize'

const { isMobile } = useDisplaySize()

</script>