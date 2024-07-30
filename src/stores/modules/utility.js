import { defineStore } from 'pinia';

export const useUtilityStore = defineStore('utility', {
  state: () => ({
    errorMessage: '',
    storeName: '',
    storeTax: '',
    storePhone: '',
    storeRoute: '',
    storeType: '',
    storeLine: '',
    storeNote: '',
    storeAddress: '',
    storeProvince: '',
    storeDistrict: '',
    storeSubdistrict: '',
    storeZipcode: '',
    optionGroup: '',
    optionBrand: '',
    optionSize: '',
    optionFlavour: '',
    searchText: '',
    searchData: [],
    zone: localStorage.getItem('zone'),
    area: localStorage.getItem('area'),
    saleCode: localStorage.getItem('saleCode'),
    storeId: localStorage.getItem('routeStoreId'),
    latitude: localStorage.getItem('latitude'),
    longitude: localStorage.getItem('longitude'),
    routeId: localStorage.getItem('routeId'),
    orderNo: localStorage.getItem('orderNo'),
    orderCn: localStorage.getItem('orderCn'),
  }),
  getters: {
    filteredData(state) {
      const search = state.searchText.toLowerCase();
      if (!search) {
        return state.searchData
      }
      return state.searchData.filter(item =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(search)
      );
    },
  },
  actions: {
    validateInput(value) {
      const isValid = !!value; 
      this.errorMessage = isValid ? '' : 'กรุณากรอกข้อมูล'
      return isValid
    },
    getValidate() {
      return this.errorMessage
    },
    clearValidate() {
      this.errorMessage = ''
    },
    updateStoreData(store) {
      Object.assign(this, store)
    },
    updateAddress(address) {
      Object.assign(this, address)
    },
    setSearchText(text) {
      this.searchText = text
    },
    setSearchData(data) {
      this.searchData = data
    },
    updateLocation(lat, long) {
      this.latitude = lat;
      this.longitude = long;
      localStorage.setItem('latitude', lat);
      localStorage.setItem('longitude', long);
    },
  },
});
