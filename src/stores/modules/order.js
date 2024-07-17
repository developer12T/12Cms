import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    productId: '',
    productDetail: [],
    productUnit: [],
    orderCart: [],
    orderCartList: [],
    orderCartAmount: 0,
    orderCheckout: [],
    orderCheckoutList: [],
    orderCheckoutFree: [],
    orderMain: [],
    orderDetail: [],
    orderDetailList: [],
    productUnitDetail: {
      id: '',
      unitId: '',
      qty: 1,
    },
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
    productOption: {
      group: [],
      brand: [],
      size: [],
      flavour: [],
    },
    option: [],
    orders: [],
    orderCADetail: [],
    orderItem: [],
    orderCustomer: [],
    noData: false,
  }),
  getter: {
    getProductDetail: (state) => state.productDetail,
    getProductUnitDetail: (state) => state.productUnitDetail,
  },
  actions: {
    resetProduct() {
      (this.productUnitDetail.unitId = ''), (this.productUnitDetail.qty = 1);
    },
    setProduct(id) {
      localStorage.setItem('productId', id);
      this.productId = id;
      this.productUnitDetail.id = id;
    },
    async updateProductData(data) {
      this.productUnitDetail = data;
      await this.getSaleProductDetailUnit();
    },
    async addProductData(data) {
      this.productData = data;
      await this.addProductToCart();
    },
    // async addOrderData(data) {
    //   this.addOrder = data;
    //   console.log('add', this.addOrder);
    //   await this.addNewOrder();
    // },
    async getDataOpion() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/getDataOption'
        );
        const result = response.data;
        this.productOption.group = result.group
        this.productOption.brand = result.brand
        this.productOption.size = result.size
        this.productOption.flavour = result.flavour
        this.option = result
      } catch (error) {
        console.error(error)
      }
    },
    async getSaleProductDetailUnit() {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const localProductId = localStorage.getItem('productId');
        if (!localProductId) return;
        this.productUnitDetail.id = localProductId;
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/getProductDetailUnit',
          this.productUnitDetail

          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        const result = response.data;
        const resultList = response.data.unitList;
        this.productDetail = result;
        this.productUnit = resultList;
        console.log('productDetail', this.productDetail);
      } catch (error) {
        console.error(error);
      }
    },
    async addProductToCart() {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/addProductToCart',
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
    async addNewOrder(orderData) {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/order/newOrder',
          orderData
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        const result = response.data;
        console.log('createOrder', result);
      } catch (error) {
        console.error(error);
      }
    },
    async getOrderCart() {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const area = localStorage.getItem('area');
        const storeId = localStorage.getItem('routeStoreId');
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/getCartToShow',
          {
            area: area,
            storeId: storeId,
          }
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        const result = response.data
        const resultList = response.data.list || []
        this.orderCart = result
        this.orderCartList = resultList
        this.orderCartAmount = resultList.length
        console.log('orderCart', this.orderCartAmount)
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
          import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/getPreOrder',
          {
            area: area,
            storeId: storeId,
            saleCode: sale,
          }
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        const result = response.data
        const resultList = response.data.list
        const resultFree = response.data.listFree
        this.orderCheckout = result
        this.orderCheckoutList = resultList
        this.orderCheckoutFree = resultFree
        console.log('orderCheckout', this.orderCheckout)
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
          import.meta.env.VITE_API_BASE_URL + '/cms/saleProduct/deleteItemCart',
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
        const result = response.data;
        this.orderCart = result;
        console.log('delete', this.orderCart);
      } catch (error) {
        console.error(error);
      }
    },
    async getOrderMain() {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const area = localStorage.getItem('area');
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/order/getMain',
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
          this.orderMain = response.data;
        }
        console.log('orderMain', this.orderMain);
        console.log('status', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getOrderDetail(orderNo) {
      try {
        //   const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/order/getDetail',
          {
            orderNo: orderNo
          }
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        );
        this.orderDetail = response.data;
        this.orderDetailList = response.data.list;
        console.log('detail', this.orderDetail);
        console.log('detailList', this.orderDetailList);
      } catch (error) {
        console.error(error);
      }
    },
    async getOrder(area) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_CA_BASE_URL + '/orders',
          { area }
        )
        this.orders = response.data
        console.log('order', this.orders)
      } catch (error) {
        console.error(error)
      }
    },
    async getCAOrderDetail(order) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_CA_BASE_URL + '/orderDetail',
          { order }
        )
        this.orderCADetail = response.data[0]
        this.orderItem = response.data[0].items
        this.orderCustomer = response.data[0].customer
        console.log('orderDetail', this.orderCADetail)
      } catch (error) {
        console.error(error)
      }
    },
  },
});
