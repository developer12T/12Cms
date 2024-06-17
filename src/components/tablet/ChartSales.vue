<template>
    <div>
        <div class="bg-white sm:w-[350px] md:w-card px-1 sha shadow-slate-300 shadow-md sm:rounded-lg h-[350px]">
            <div class="grid grid-cols-2">
                <dl class="flex items-center">
                    <dt class="text-gray-500 text-md font-normal me-1">รายงานยอดขาย</dt>
                </dl>
                <dl class="flex items-center justify-end">
                  <router-link to="/cms/report/main">
                    <dt class="text-gray-500 text-md font-normal me-1" >
                      รายละเอียด
                    </dt>
                  </router-link>
                </dl>
            </div>
            <VueApexCharts type="bar" height="300" :options="chartOptions" :series="chartSeries" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from "vue3-apexcharts";
import { useReportStore } from '../../stores';

const store = useReportStore();
const chartSales = computed(() => {
    return store.chartSale;
});

const chartOptions = ref({});
const chartSeries = ref([]);

const updateChartData = () => {
    chartOptions.value = {
        series: [{
          name: 'Sale',
          data: chartSales.value.dataSalePercentNumber,
        }],
        chart: {
          height: 300,
          type: 'bar',
          toolbar: { 
                show: false,
            },
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', 
            },
          }
        },

        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '15px',
            colors: ["#304758"]
          }
        },
        
        xaxis: {
          categories: chartSales.value.month,
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        
        },
    };
};
const reportDetail = () => {
    console.log('55555');
}
onMounted(async () => {
    await store.getChartMain()
    console.log('test', chartSales.value.dataSale)
    updateChartData()
});


</script>
