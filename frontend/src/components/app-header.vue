<template>
  <header class="main-header flex items-center justify-between">
    <div class="logo uppercase">
      <h2 v-rainbow>Cars</h2>
    </div>
    <nav class="flex gap-1">
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/car">Car</router-link>
      <router-link class="link" to="/about">About</router-link>
    </nav>
  </header>
</template>
