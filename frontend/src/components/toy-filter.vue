<template>
  <section class="toy-filter">
    <div class="filter">

      <input v-model="filterBy.txt" @input="setFilter" type="search" class="form-input" placeholder="Search Toy" />

      <div class="specific-filter">
        <div class="labels-multiple-select-container">
          <label v-for="label in labels" :key="label" class="container">
            {{ label }}
            <input @input.stop="setCheck($event, label)" type="checkbox">
            <span class="checkmark"></span>
          </label>
        </div>
        <p>In Stock</p>
        <label class="switch">
          
          <input @change="setInStockFilter($event)" checked="false" type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="sort">
      <p @click.stop="setSort('name')">Name {{ arrow }}</p>
      <p @click.stop="setSort('price')">Price {{ arrow }}</p>
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
        inStock: false,
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

    setInStockFilter(ev) {
      this.filterBy.inStock = (ev.target.checked !== true)
      this.setFilter()
    }

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

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>



