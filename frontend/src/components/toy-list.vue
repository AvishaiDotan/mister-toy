<template>
  <h1>Toy List</h1>
  <ul>
    <toy-preview v-for="toy in toys" :key="toy._id" :toy="toy"/>
  </ul>
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
