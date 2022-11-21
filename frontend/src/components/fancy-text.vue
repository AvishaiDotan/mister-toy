<template>
  <section v-if="num && txt">
    <h1 v-rainbow>{{ txt }}</h1>
    <h2 v-rainbow>{{ num }}</h2>
  </section>
</template>

<script>
export default {
  name: 'fancy-text',
  props: {
    txt: {
      type: String,
      required: true,
      default: 'This is a really fancy text',
      validator(val) {
        return val.length > 5
      },
    },
    num: {
      type: [String, Number],
      required: true,
      default: 8,
      validator(val) {
        return [8, 1, 2, 3, '4', '5'].includes(val)
      },
    },
    testTxt: String,
  },
}
</script>
