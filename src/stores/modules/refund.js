import { defineStore } from 'pinia';
import axios from 'axios';

export const useRefundStore = defineStore('refund', {
  state: () => ({
    refundCart: {
        returnList:[],
        changeLsit:[]
    },
  }),
  getter: {
  },
  actions: {
    async getRefundCart() {
        try {
          //   const token = JSON.parse(localStorage.getItem('token'));
          const area = JSON.parse(localStorage.getItem('area'));
          const storeId = localStorage.getItem('routeStoreId');
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL + '/cms/refund/getPreRefund',
            {
              area: area,
              storeId: storeId,
            }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data
          this.refundCart = result
          this.refundCart.returnList = result.listReturn
          this.refundCart.changeLsit = result.listChange
          console.log('refundCart', this.refundCart)
        } catch (error) {
          console.error(error);
        }
      },
  },
});
