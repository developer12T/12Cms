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
        async getPromotionReward(data) {
            try {
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/summaryCompare',
                    data
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