<template>
    <LayoutSub>
        <template v-slot>
            <div class="flex flex-col h-full">
                <div class="flex flex-row items-center">
                    <div class="mt-2">
                        <ButtonBack />
                    </div>
                    <div class="mt-2 ml-2 flex items-center">
                        <Icon icon="mdi:file-exchange-outline" width="40" />
                        <span class="ml-2 text-3xl">สินค้าที่รับคืน</span>
                    </div>
                </div>
                <TableProduct>
                </TableProduct>
                <div class="flex justify-end mt-3 mr-5">
                    <router-link to="/cms/manage/refund">
                        <ButtonCart :icon="'bytesize:cart'" />
                    </router-link>
                </div>
            </div>
        </template>
    </LayoutSub>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import LayoutSub from '../../LayoutSub.vue'
import ButtonBack from '../../../components/IconBack.vue'
import TableProduct from '../../../components/TableProduct.vue'
import ButtonCart from '../../../components/ButtonCircle.vue'

export default {
    components: {
        Icon,
        LayoutSub,
        ButtonBack,
        TableProduct,
        ButtonCart,
    },
    setup() {

    }
}
</script>
