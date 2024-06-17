import { defineStore } from "pinia";
import axios from "axios";

export const useRouteStore = defineStore('routes', {
    state: () => ({
      routeMain: [],
      routeDetail: [],
      routeDetailList: [],
      routeStore: [],
      routeStoreList: [],
    }),
    // getter: {
    //     getRouteMain: (state) => state.routeMain,
    //     getRouteDetail: (state) => state.routeDetail,
    //     getRouteStore: (state) => state.routeStore,
    // },
    actions: {
      async getRouteMain() {
        try {
        //   const token = JSON.parse(localStorage.getItem("token"));
          const area = localStorage.getItem("area")
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              "/cms/route/getRouteMain",
            {
              "area":area
            }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          this.routeMain = result;
          console.log("route", this.routeMain);
        } catch (error) {
          console.error(error);
        }
      },
      async getRouteDetail() {
        try {
        //   const token = JSON.parse(localStorage.getItem("token"));
        const routeid = localStorage.getItem('routeId')
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              "/cms/route/getRouteDetail",
            {
              "id":routeid
            }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          const resultList = response.data.list;
          this.routeDetail = result;
          this.routeDetailList = resultList;
          console.log("detail", this.routeDetail);
        } catch (error) {
          console.error(error);
        }
      },
      async getRouteStore() {
        try {
        //   const token = JSON.parse(localStorage.getItem("token"));
        const routeId = localStorage.getItem('routeId')
        const storeId = localStorage.getItem('routeStoreId')
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              "/cms/route/getStoreDetail",
            {
              "idRoute":routeId,
              "storeId":storeId
            }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data;
          const resultList = response.data.list;
          this.routeStore = result;
          this.routeStoreList = resultList;
          console.log("storeList", this.routeStore);
        } catch (error) {
          console.error(error);
        }
      },
      async addVisitStore(data) {
        try {
        //   const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.post(
            import.meta.env.VITE_API_BASE_URL +
              "/cms/route/visit",
            {
              ...data
            }
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // }
          );
          const result = response.data
          console.log("visited", result)
        } catch (error) {
          console.error(error);
        }
      },
    },
  });