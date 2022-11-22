<template>
  <section class="toy-filter">
    <div class="filter">

      <el-input v-model="filterBy.txt" @input="setFilter"  type="search" placeholder="Search Toy" class="form-input"/>
      <div style="display: inline-block">
        <el-select @change="setFilter" v-model="filterBy.labels" multiple collapse-tags placeholder="Select"
          style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>


      <el-radio-group @change="setFilter" v-model="filterBy.inStock"  size="large">
        <el-radio-button label="Stock" />>
        <el-radio-button label="Ordered" />>
      </el-radio-group>
    </div>

    <div class="sort">
      <p v-for="prop in sortProps" :class="{ 'selected': isSelected(prop) }" @click.stop="setSort(prop)">
        {{ prop }} <span>{{ arrow(prop) }}</span>
      </p>
    </div>


  </section>

</template>




<script>
import { utilService } from '../services/util-service';
import { ref } from 'vue'


export default {
  name: 'toy-filter',
  props: {
    labels: Object,
  },

  data() {
    return {
      filterBy: {
        txt: '',
        inStock: false,
        labels: ref([]),
        sortBy: {
          prop: 'name',
          isDesc: true,
        }
      },
      sortProps: ['name', 'price'],
      options: this.labels
    }

  },
  methods: {
    setFilter() {
      const filter = JSON.parse(JSON.stringify(this.filterBy))
      filter.inStock = (filter.inStock === 'Stock') ? true : false
      this.$emit('set-filter', filter)
    },

    setSort(prop) {
      const sortBy = this.filterBy.sortBy

      if (sortBy.prop === prop) sortBy.isDesc = !sortBy.isDesc
      sortBy.prop = prop
      this.setFilter()
    },

    setInStockFilter(ev) {
      this.filterBy.inStock = (ev.target.checked !== true)
      this.setFilter()
    },

    isSelected(prop) {
      return this.filterBy.sortBy.prop === prop
    },

    arrow(prop) {
      if (!this.isSelected(prop)) return ''
      return (this.filterBy.sortBy.isDesc) ? '↓' : '↑'
    },

  },

  created() {
    this.setFilter = utilService.debounce(this.setFilter, 1000)

    this.setFilter()
  },
}
</script>

