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
    searchText: '',
    searchData: [],
  }),
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
      console.log('5555', address)
    },
    setSearchText(text) {
      this.searchText = text
    },
    setSearchData(data) {
      this.searchData = data
    },
  },
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
});
