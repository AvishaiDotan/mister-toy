<template>
  <app-header />
  <router-view></router-view>
</template>

<script>
  import appHeader from './components/app-header.vue'

  export default {
    name: 'main-app',
    components: {
    appHeader
    }
  }
</script>