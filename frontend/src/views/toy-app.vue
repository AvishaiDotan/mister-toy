

<template>
      <main>
        <toy-filter :labels="labels"/>
        <toy-list :toys="toys"/>
      </main>
</template>
  
  <script>
    import toyList from '../components/toy-list.vue';
    import toyFilter from '../components/toy-filter.vue';

    import { eventBus } from '../services/event-bus.service.js';
  
    export default {
      name: 'toys-app',
      created() {
          this.$store.dispatch({ type: 'loadToys'})

          eventBus.on('delete-toy', (toyId) => {
            this.$store.dispatch({ type: 'deleteToy', id: toyId })
        })
      },
      computed: {

          toys() {
              return this.$store.getters.toys
          },

          labels() {
              return this.$store.getters.labels
          }
      },
      components: {
        toyList,
        toyFilter
      },
    }
    
  </script>
  