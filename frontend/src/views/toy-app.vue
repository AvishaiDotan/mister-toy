

<template>
      <main class="full">
        <toy-filter @set-filter="setFilter" :labels="labels"/>
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
          this.$store.dispatch({ type: 'loadToys', filterBy: {}})

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

      methods: {
        setFilter(filterBy) {
            filterBy = JSON.parse(JSON.stringify(filterBy))
            this.$store.dispatch({ type: 'setFilter', filterBy })
        }
      },
      components: {
        toyList,
        toyFilter
      },
    }
    
  </script>
  