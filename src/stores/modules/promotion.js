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
        async getPromotionReward() {
            try {
                const area = localStorage.getItem('area');
                const storeId = localStorage.getItem('routeStoreId');
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/summaryCompare',
                    {
                        area: area,
                        storeId: storeId,
                    }
                );
                const result = response.data;
                this.freeList = result.listFree;
                this.discountList = result.listDiscount;
                console.log('reward', this.freeList);
            } catch (error) {
                console.error(error)
            }
        },
    },
  });