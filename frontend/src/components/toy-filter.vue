<template>
  <section class="toy-filter">
    <input
        v-focus
        v-model="filterBy.vendor"
        @input="setFilter"
        type="text"
        class="form-input"
        placeholder="Search vendor..."
    />
  </section>
</template>

<script>
export default {
  name: 'toy-filter',
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
