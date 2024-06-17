import { defineStore } from 'pinia';
import axios from 'axios';

export const useReportStore = defineStore('report', {
    state: () => ({
        chartSale: [],
        monthSale: [],
    }),
    getter: {
    },
    actions: {
        async getChartMain() {
            try {
                //   const token = JSON.parse(localStorage.getItem('token'));
                const area = localStorage.getItem('area')
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/cms/dashBoard/getMain',
                    {
                          area: area,
                    }
                    // {
                    //   headers: { Authorization: `Bearer ${token}` },
                    // }
                );
                const result = response.data
                this.chartSale = result
                console.log('mainChart', this.chartSale)
            } catch (error) {
                console.error(error);
            }
        },
        async getMonthSale() {
            try {
                //   const token = JSON.parse(localStorage.getItem('token'));
                const area = localStorage.getItem('area')
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/cms/dashBoard/report/getDaily',
                    {
                          area: area,
                          year: '2024',
                          month: '04',
                    }
                    // {
                    //   headers: { Authorization: `Bearer ${token}` },
                    // }
                );
                const result = response.data
                this.monthSale = result.list
                console.log('monthData', this.monthSale)
            } catch (error) {
                console.error(error);
            }
        },
    },
});
