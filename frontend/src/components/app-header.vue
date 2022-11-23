<template>
  <header class="main-header">
    <div>
      <h1 v-rainbow>Bali Express</h1>
    </div>
    <nav>
      <router-link class="home-link" to="/">Home</router-link>
      <router-link class="add-action" to="/edit">Add Toy</router-link>
      <router-link class="add-action" to="/dashboard">Dashboard</router-link>
    </nav>
  </header>
</template>
