<template>
  <section>
    <h3>{{ msg }}</h3>
    <button @click="count++" class="btn btn-secondary fw-bold">Count is: {{ count }}</button>
  </section>
</template>

<script>
export default {
  name: 'hello-world',
  props: {
    msg: String,
    num: Number,
  },
  data() {
    return {
      count: 0,
    }
  },
}
</script>
