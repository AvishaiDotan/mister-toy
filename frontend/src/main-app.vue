<template>
  <app-header />
  <main>
    <router-view></router-view>
  </main>
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