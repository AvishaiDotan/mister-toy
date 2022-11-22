<template>
    <el-select v-model="selectedChart" placeholder="Select">
        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>

    <component :is="selectedChart" :chartData="chartsData"></component>
</template>
  
<script>
import { DoughnutChart, BarChart, LineChart, PieChart, PolarAreaChart, RadarChart } from 'vue-chart-3';
import { } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
    name: 'Home',
    components: { DoughnutChart, BarChart, LineChart, PieChart, PolarAreaChart, RadarChart },
    data() {
        return {
            toys: [],
            testData: {
                labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
                datasets: [
                    {
                        data: [30, 40, 60, 70, 5],
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                ],
            },
            selectOptions: [{
                value: DoughnutChart,
                label: 'Doughnut Chart'
            }, {
                value: BarChart,
                label: 'Bar Chart'
            }, {
                value: LineChart,
                label: 'Line Chart'
            }, {
                value: PieChart,
                label: 'Pie Chart'
            }, {
                value: PolarAreaChart,
                label: 'Polar Area Chart'
            }, {
                value: RadarChart,
                label: 'Radar Chart'
            },
            ],
            selectedChart: null,
        }
    },
    computed: {
        chartsData() {

            const toysMap = this.toys.reduce((prev, toy) => {
                toy.labels.forEach(label => {
                    prev[label] = prev[label] || 0
                    prev[label]++

                    prev[label + 'Price'] = prev[label + 'Price'] || 0
                    prev[label + 'Price'] += toy.price

                    prev[label + 'Reviews'] = prev[label + 'Reviews'] || 0
                    prev[label + 'Reviews'] += toy.reviews.length
                    
                    prev[label + 'InStock'] = prev[label + 'InStock'] || 0
                    if (toy.inStock) prev[label + 'InStock']++


                })
                return prev
            }, {})

            const chartData = {
                labels: [],
                normalized: true,
                datasets: [
                    {
                        label: 'Frequency',
                        data: [],
                        backgroundColor: ['#cfc5ff', '#ac9bff', '#856cff', '#5f3eff', '#2e15a6',],
                    },
                    {
                        label: 'Mean Price',
                        backgroundColor: ['#ffb9b4', '#ff9494', '#ff6666', '#ff3f3f', '#b72b2b', '#8f1717'],
                        data: []
                    },
                    {
                        label: 'Reviews Count',
                        backgroundColor: ['#ecffa9', '#e4ff86', '#bdd85f', '#879f34', '#5e7020', '#52660d'],
                        data: []
                    },
                    {
                        label: 'Stock Percentage',
                        backgroundColor: ['#cef8ff', '#87bec7', '#5ba0ab', '#429dab', '#1a8c9e', '#0d6472'],
                        data: []
                    }
                ],
            }

            for (const key in toysMap) {

                if (key.includes('Price')) chartData.datasets[1].data.push(toysMap[key])
                else if (key.includes('Reviews')) chartData.datasets[2].data.push(toysMap[key] * 100)
                else if (key.includes('InStock')) chartData.datasets[3].data.push((toysMap[key] / toysMap[key.replace('InStock', '')]) * 1000)
                else {
                    chartData.datasets[0].data.push(toysMap[key] * 100)
                    chartData.labels.push(key)
                }
            }

            return chartData

        }
    },
    created() {
        const toys = JSON.parse(JSON.stringify(this.$store.getters.toys))
        this.toys = toys

    }
}
</script>