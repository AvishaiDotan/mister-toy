<template>

    <main class="full dashboard" v-if="toys">
        <header>
            <h2>Dashboard</h2>
        </header>

        <label>
            <p style="text-align: center; padding: 5px;">Select Charts</p>
            <el-select v-model="selectedCharts" multiple collapse-tags placeholder="Select" style="width: 240px">
                <el-option v-for="item in chartsOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </label>

        <section class="charts-container">
            <chart-comp v-for="chart in selectedCharts" :chart="chart" :toys="toys" />
        </section>
    </main>

</template>
  
<script>
import chartComp from '../components/chart-comp.vue';
import { ref } from 'vue'

export default {
    name: 'dashboard',
    data() {
        return {
            toys: [],
            selectedCharts: ref(['DoughnutChart', 'BarChart']),
            chartsOptions: [{
                value: 'DoughnutChart',
                label: 'Doughnut Chart'
            }, {
                value: 'BarChart',
                label: 'Bar Chart'
            }, {
                value: 'LineChart',
                label: 'Line Chart'
            }, {
                value: 'PieChart',
                label: 'Pie Chart'
            }, {
                value: 'PolarAreaChart',
                label: 'Polar Area Chart'
            }, {
                value: 'RadarChart',
                label: 'Radar Chart'
            },
            ],
        }
    },
    created() {
        const toys = JSON.parse(JSON.stringify(this.$store.getters.toys))
        this.toys = toys
    },
    components: {
        chartComp
    }
}
</script>