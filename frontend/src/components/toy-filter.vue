<template>
  <section class="toy-filter">
    <div class="filter">

      <input v-focus v-model="filterBy.vendor" @input="setFilter" type="search" class="form-input"
        placeholder="Search vendor..." />


      <div class="labels-multiple-select-container">
        <label v-for="label in labels" :key="label" class="container">
          {{ label }}
          <input type="checkbox" checked="checked">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>

    <div class="sort">

    </div>

  </section>

</template>



<script>

export default {
  name: 'toy-filter',
  props: {
    labels: Object,
  },

  data() {
    return {
      filterBy: {
        vendor: '',
      },
    }
  },
  methods: {
    setFilter() {
      this.$emit('setFilter', this.filterBy)
    },
  },
}
</script>

