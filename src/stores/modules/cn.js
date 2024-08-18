import { defineStore } from 'pinia'
import axios from 'axios'

export const useCnStore = defineStore('cn', {
  state: () => ({
    cnCart: [],
    cnCartList: [],
    cnCartAmount: 0,
    cnCheckout: [],
    cnCheckoutList: [],
    reason: [],
    orderCnMain: [],
    orderCnDetail: [],
    orderCnDetailList: [],
    noData: false,
    productData: {
      area: '',
      storeId: '',
      list: {
        id: '',
        name: '',
        pricePerUnitSale: 0.0,
        qty: 1,
        unitId: '',
      },
    },
  }),
  actions: {
    async addProductData(data) {
      this.productData = data
      await this.addProductToCart()
    },
    async addProductToCart() {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/cnOrder/addProductToCart',
          this.productData,
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        const result = response.data;
        console.log('addTocart', result);
      } catch (error) {
        console.error(error);
      }
    },
    async getCnCart() {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const area = localStorage.getItem('area');
        const storeId = localStorage.getItem('routeStoreId');
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/cnOrder/getCartToShow',
          {
            area: area,
            storeId: storeId,
          }
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        const resultList = response.data.list || []
        this.cnCart = response.data
        this.cnCartList = resultList
        this.cnCartAmount = resultList.length
        console.log('orderCart', this.cnCartAmount)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItemCart(id, unitId) {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const area = localStorage.getItem('area');
        const storeId = localStorage.getItem('routeStoreId');
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/cnOrder/deleteProduct',
          {
            area: area,
            storeId: storeId,
            idProduct: id,
            unitId: unitId,
          }
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        this.cnCart = response.data
        console.log('delete', this.cnCart);
      } catch (error) {
        console.error(error);
      }
    },
    async getOrderCheckout() {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const area = localStorage.getItem('area');
        const storeId = localStorage.getItem('routeStoreId');
        const sale = localStorage.getItem('saleCode');
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/cnOrder/getCnCheckout',
          {
            area: area,
            storeId: storeId,
            saleCode: sale,
          }
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        this.cnCheckout = response.data
        this.cnCheckoutList = response.data.list
        console.log('cnCheckout', this.cnCheckout)
      } catch (error) {
        console.error(error);
      }
    },
    async addCnOrder(orderData) {
      try {
          // const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/cnOrder/addCnOrder',
          orderData
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        const result = response.data
        console.log('createCn', result)
      } catch (error) {
        console.error(error)
      }
    },
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
        console.log('reason', this.reason)
      } catch (error) {
        console.error(error)
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
