<template>

    <main v-if="toys">
        <p>Dashboard</p>
        <label>
            <el-select v-model="selectedCharts" multiple collapse-tags placeholder="Select" style="width: 240px">
                <el-option v-for="item in chartsOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </label>

        <section>
            <div v-for="chart in selectedCharts">
                <chart-comp :chart="chart" :toys="toys" />
            </div>
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
            selectedCharts: ref([]),
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