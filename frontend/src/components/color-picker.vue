<template>
  <div class="color-picker">
    <div v-for="color in colors" :key="color">
      <div @click="changeColor(color)" class="color-item" :style="{ backgroundColor: color }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'color-picker',
  props: {
    modelValue: String,
  },
  data() {
    return {
      colors: [
        '#f87171',
        '#fbbf24',
        '#34d399',
        '#a1a1aa',
        '#f472b6',
        '#a78bfa',
        '#818cf8',
        '#60a5fa',
        '#2dd4bf',
      ],
    }
  },
  methods: {
    changeColor(color) {
      this.$emit('update:modelValue', color)
    },
  },
}
</script>

<style scoped>
.color-picker {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  gap: 0.5em;
}

.color-item {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.color-item:hover {
  transform: scale(105%);
}
</style>
