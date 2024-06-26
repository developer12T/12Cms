import { defineStore } from 'pinia'
import axios from 'axios'

export const useCnStore = defineStore('cn', {
  state: () => ({
    reason: [],
  }),
  actions: {
    async getReasonCN() {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/manage/Reason/getDetail',
              {
                type: 'CN'
              }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          this.reason = response.data
          console.log('reason', this.reason);
        } catch (error) {
          console.error(error);
        }
      },
  },
});
