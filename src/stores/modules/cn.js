import { defineStore } from 'pinia'
import axios from 'axios'

export const useCnStore = defineStore('cn', {
  state: () => ({
    reason: [],
    orderCnMain: [],
    orderCnDetail: [],
    orderCnDetailList: [],
    noData: false,
  }),
  actions: {
    async addFromOrder(orderData) {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL +
          '/cms/cnOrder/addCnOrderFromOrder',
          orderData
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
    async getCnOrderMain(area) {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/cnOrder/getMain',
          {
            area: area
          }
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        if (response.status === 204) {
          this.noData = true;
        } else {
          this.noData = false;
          this.orderCnMain = response.data;
        }
        console.log('orderCnMain', this.orderCnMain);
      } catch (error) {
        console.error(error);
      }
    },
    async getCnOrderDetail(orderNo) {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/cnOrder/getDetail',
          {
            orderNo: orderNo
          }
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        this.orderCnDetail = response.data;
        this.orderCnDetailList = response.data.list;
        console.log('Cndetail', this.orderCnDetail);
        console.log('CndetailList', this.orderCnDetailList);
      } catch (error) {
        console.error(error);
      }
    },
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
