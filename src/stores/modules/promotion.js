import { defineStore } from 'pinia';
import axios from 'axios';

export const usePromotionStore = defineStore('promotion', {
    state: () => ({
        freeList: [],
        discountList: [],
    }),
    getter: {

    },
    actions: {
        async getPromotionReward(area, store) {
            try {
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/summaryCompare',
                    {
                        area: area,
                        storeId: store
                    }
                );
                this.freeList = response.data.listFree;
                this.discountList = response.data.listDiscount;
                console.log('free', this.freeList)
                console.log('discount', this.discountList)
            } catch (error) {
                console.error(error)
            }
        },
    },
});