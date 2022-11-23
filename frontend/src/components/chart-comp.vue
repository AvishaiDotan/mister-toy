<template>
    <section>
        <label>
            <el-select v-model="selectedStat" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in statOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </label>
        <component :is="chart" :chartData="chartsData"></component>
    </section>
</template>

<script>
import { DoughnutChart, BarChart, LineChart, PieChart, PolarAreaChart, RadarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
    components: { DoughnutChart, BarChart, LineChart, PieChart, PolarAreaChart, RadarChart },

    props: {
        toys: Object,
        chart: String,
    },

    data() {
        return {
            selectedStat: '',
            testData: {
                labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
                datasets: [
                    {
                        data: [30, 40, 60, 70, 5],
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                ],
            },
            statOptions: [
                {
                    value: 'Frequency',
                    label: 'Frequency'
                },
                {
                    value: 'Price',
                    label: 'Mean Price'
                }, {
                    value: 'Reviews',
                    label: 'Reviews Count'
                }, {
                    value: 'Stock',
                    label: 'Stock Percentage'
                },
            ],

        }
    },
    computed: {
        chartsData() {

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

            const toysMap = this.toys.reduce((prev, toy) => {
                toy.labels.forEach(label => {
                    if (!chartData.labels.includes(label)) chartData.labels.push(label)
                    if (this.selectedStat === 'Frequency') {
                        prev[label + 'Frequency'] = prev[label + 'Frequency'] || 0
                        prev[label + 'Frequency']++
                    } else if (this.selectedStat === 'Price') {
                        prev[label + 'Price'] = prev[label + 'Price'] || 0
                        prev[label + 'Price'] += toy.price
                    } else if (this.selectedStat === 'Reviews') {
                        prev[label + 'Reviews'] = prev[label + 'Reviews'] || 0
                        prev[label + 'Reviews'] += toy.reviews.length
                    } else if (this.selectedStat === 'Stock') {
                        prev[label + 'Stock'] = prev[label + 'Stock'] || 0
                        if (toy.inStock) prev[label + 'Stock']++
                    }

                })
                return prev
            }, {})


           
            for (const key in toysMap) {
                console.log(key);
                if (this.selectedStat === 'Price') chartData.datasets[1].data.push(toysMap[key])
                else if (this.selectedStat === 'Reviews') chartData.datasets[2].data.push(toysMap[key] * 100)
                else if (key.includes('Stock')) chartData.datasets[3].data.push((toysMap[key] / toysMap[key.replace('InStock', '')]) * 1000)
                else if (this.selectedStat === 'Stock') {
                    chartData.datasets[0].data.push(toysMap[key] * 100)
                    chartData.labels.push(key)
                }
            }

            chartData.datasets.forEach((dataset, idx) => {
                if (!dataset.label.includes(this.selectedStat)) chartData.datasets.splice(idx, 1)
            })
            // console.log(chartData);
            return chartData


        }
    },
}
</script>