import { defineStore } from 'pinia';
import axios from 'axios';

export const usePromotionStore = defineStore('promotion', {
    state: () => ({
        freeList: [],
        discountList: [],
        changeList: [],
    }),
    actions: {
        async getPromotionCompare(data) {
            try {
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/compare',
                    data
                );
                console.log('compare', response.data)
            } catch (error) {
                console.error(error)
            }
        },
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
        async getChangeReward(data) {
            try {
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/getChangeRewardSummary',
                    data
                )
                this.changeList = response.data.listProduct;
                console.log('change', this.changeList)
            } catch (error) {
                console.error(error)
            }
        },
        async updateReward(data) {
            try {
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/updateRewardSummary',
                    data
                )
                this.changeList = response.data.listProduct;
                // console.log('change', this.changeList)
            } catch (error) {
                console.error(error)
            }
        },
    },
});