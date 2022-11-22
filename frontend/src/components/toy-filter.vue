<template>
  <section class="toy-filter">
    <div class="filter">

      <input  v-model="filterBy.txt" @input="setFilter" type="search" class="form-input"
        placeholder="Search Toy" />


      <div class="labels-multiple-select-container">
        <label v-for="label in labels" :key="label" class="container">
          {{ label }}
          <input @input.stop="setCheck($event, label)" type="checkbox">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>

    <div class="sort">
      <p @click.stop="setSort('name')">Name {{arrow}}</p>
      <p @click.stop="setSort('price')">Price {{arrow}}</p>
    </div>

  </section>

</template>



<script>
import { utilService } from '../services/util-service';


export default {
  name: 'toy-filter',
  props: {
    labels: Object,
  },

  data() {
    return {
      filterBy: {
        txt: '',
        labels: [],
        sortBy: {
          prop: '',
          isDesc: false,
        }
      },

    }
  },
  methods: {
    setFilter() {
      this.$emit('set-filter', this.filterBy)
    },
    setSort(prop) {
      const sortBy = this.filterBy.sortBy
      if (sortBy.prop === prop) sortBy.isDesc = !sortBy.isDesc
      sortBy.prop = prop
      this.setFilter()
    },

    setCheck(ev, label) {
            if (ev.target.checked) {
                this.filterBy.labels.push(label)
            } else {
                const idx = this.filterBy.labels.findIndex(currLabel => currLabel === label)
                this.filterBy.labels.splice(idx, 1)
            }
            this.setFilter()
        },
        
  },

  computed: {
    arrow() {
            return (this.filterBy.sortBy.isDesc) ? '↓' : '↑'
        }
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter, 1000)
  },
}
</script>

