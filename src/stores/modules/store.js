import { defineStore } from 'pinia'
import axios from 'axios'

export const useStoresStore = defineStore('stores', {
    state: () => ({
      storeAll: [],
      storeNew: [],
      provice: [],
      district: [],
      subdistrict: [],
      zipcode: [],
      storeType: [],
      addedStoreInfo: {
        storeId: '',
        storeName: ''
      },
    }),
    getter: {
      // getCustomerAll: (state) => state.storeAll,
      // getCustomerNew: (state) => state.storeNew,
    },
    actions: {
      async getCustomerAll() {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const area = localStorage.getItem('area')
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/store/getStore',
            {
              'area': area
            }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          this.storeAll = result;
          console.log('stores', this.storeAll);
        } catch (error) {
          console.error(error);
        }
      },
      async getCustomerNew() {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const area = localStorage.getItem('area')
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/store/getStoreNew',
            {
              'area':area
            }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          this.storeNew = result;
          console.log('storesNew', this.storeNew);
        } catch (error) {
          console.error(error);
        }
      },
      async addCustomerNew(dataStore) {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/store/addStore',
            {
              ...dataStore
            }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data
          console.log('addStore', result)
          console.log('188',result)
          this.addedStoreInfo = {
            storeId: result.additionalData.storeId,
            storeName: result.additionalData.storeName
          }
        } catch (error) {
          console.error(error)
        }
      },
      async getProvince() {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/manage/Address/getProvince',
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          this.provice = result;
          console.log('province', this.provice);
        } catch (error) {
          console.error(error);
        }
      },
      async getDistrict(selectedProvince) {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/manage/Address/getAmphoe',
              {
                'province': selectedProvince
              }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          this.district = result;
          console.log('district', this.district);
        } catch (error) {
          console.error(error);
        }
      },
      async getSubdistrict(selectedProvince,selectedDistrict) {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/manage/Address/getDistrict',
              {
                'province' : selectedProvince,
                'amphoe': selectedDistrict
              }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          this.subdistrict = result;
          console.log('subdistrict', this.subdistrict);
        } catch (error) {
          console.error(error);
        }
      },
      async getZipcode(selectedProvince,selectedDistrict,selectedSubdistrict) {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/manage/Address/getZipcode',
              {
                'province': selectedProvince,
                'amphoe': selectedDistrict,
                'district': selectedSubdistrict
              }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          this.zipcode = result;
          console.log('zipcode', this.zipcode);
        } catch (error) {
          console.error(error);
        }
      },
      async getStoreType() {
        try {
        //   const token = JSON.parse(localStorage.getItem('token'));
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              '/cms/promotion/getTypeStore',
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          this.storeType = result;
          console.log('typeStore', this.storeType);
        } catch (error) {
          console.error(error);
        }
      },
    },
  });