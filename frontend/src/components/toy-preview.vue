<template>
  <section @click.stop="goToDetails(toy._id)">
    <h1>Toy Preview</h1>
    <pre>{{ toy }}</pre>
    <button @click.stop="goToEdit(toy._id)">Edit</button>
  </section>
</template>


<script>
  export default {
    name: 'toy-preview',
    props: {
      toy: Object,
    },
    methods: {
        goToEdit(toyId) {
            this.$router.push('/edit/' + toyId)
        },
        goToDetails(toyId) {
            this.$router.push('/toy/' + toyId)
        }
    },
  }
</script>
