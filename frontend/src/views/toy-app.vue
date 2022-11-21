

<template>
      <main>
        <h1>Main Toys App</h1>
        <toy-filter/>
        <toy-list :toys="toys"/>
      </main>
</template>
  
  <script>
    import toyList from '../components/toy-list.vue';
    import toyFilter from '../components/toy-filter.vue';
  
    export default {
      name: 'toys-app',
      created() {
          this.$store.dispatch({ type: 'loadToys'})
      },
      computed: {
          toys() {
              return this.$store.getters.toys
          }
      },
      components: {
        toyList,
        toyFilter
      }
    }
    
  </script>
  