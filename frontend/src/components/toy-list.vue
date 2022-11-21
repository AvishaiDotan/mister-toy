<template>
  <section class="toy-list">
    <ul class="toy-preview-container">
      <toy-preview v-for="toy in toys" :key="toy._id" :toy="toy" />
    </ul>
  </section>
</template>

<script>
import toyPreview from './toy-preview.vue'

export default {
  name: 'toy-list',
  props: {
    toys: Object
  },
  components: {
    toyPreview
  }
}
</script>
