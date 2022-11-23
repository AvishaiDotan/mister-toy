<template>
    <section>
        <label>
            <el-select v-model="selectedStat" multiple collapse-tags placeholder="Select" style="width: 240px">
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
import { ref } from 'vue'

export default {
    components: { DoughnutChart, BarChart, LineChart, PieChart, PolarAreaChart, RadarChart },

    props: {
        toys: Object,
        chart: String,
    },

    data() {
        return {
            selectedStat: ref([]),
            testData: {
                labels: [],
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

                    this.selectedStat.forEach(stat => {
                        prev[label + stat] = prev[label + stat] || 0

                        if (stat === 'Frequency') prev[label + stat]++
                        else if (stat === 'Price') prev[label + stat] += toy.price
                        else if (stat === 'Reviews') prev[label + stat] += toy.reviews.length
                        else if (stat === 'Stock' & toy.inStock) prev[label + stat]++

                    })

                })
                return prev
            }, {})

            console.log(toysMap);
            for (const key in toysMap) {

                const stats = ['Frequency', 'Price', 'Reviews', 'Stock']

                stats.forEach((stat, idx) => {
                    if (key.includes(stat)) chartData.datasets[idx].data.push(toysMap[key])

                    if (key.includes(stat) && !chartData.labels.includes(key.replace(stat, ""))) chartData.labels.push(key.replace(stat, ""))
                })
            }

            chartData.datasets.forEach((dataset, idx) => {
                if (!dataset.data.length) chartData.datasets.splice(idx, 1)
            })

            return chartData


        }
    },
}
</script>