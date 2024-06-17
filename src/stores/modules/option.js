import { defineStore } from 'pinia'
import axios from 'axios'

export const useOptionStore = defineStore('option', {
  state: () => ({
    reason: [],
  }),
  actions: {
    async getReason() {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/manage/Reason/getDetail',
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          this.reason = result;
          console.log('reason', this.reason);
        } catch (error) {
          console.error(error);
        }
      },
  },
});
