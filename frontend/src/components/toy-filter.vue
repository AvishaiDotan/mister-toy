<template>
  <section class="toy-filter">
    <div class="filter">

      <input v-model="filterBy.txt" @input="setFilter" type="search" class="form-input" placeholder="Search Toy" />

      <div class="specific-filter">
        <div style="display: inline-block; margin-left: 20px">
          <p style="margin-left: 10px">Labels</p>
            <el-select @change="setFilter"
              v-model="filterBy.labels"
              multiple
              collapse-tags
              placeholder="Select"
              style="width: 240px"
            >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
            </el-select>
      </div>

        <p>In Stock</p>
        <label class="switch" v-if="filterBy.inStock">
          <input  @change="setInStockFilter($event)" :checked="filterBy.inStock" type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="sort">
      <p v-for="prop in sortProps" 
        :class="{'selected': isSelected(prop)}"
        @click.stop="setSort(prop)">
        {{prop}} <span>{{ arrow(prop) }}</span>
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

