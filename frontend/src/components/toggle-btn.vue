<template>
  <label class="switch">
    <input type="checkbox" :checked="modelValue" @change="toggleBtn" />
    <div></div>
  </label>
  <div><span class="fw-bold">modelValue</span> {{ modelValue }}</div>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
  },
  methods: {
    toggleBtn() {
      this.$emit('update:modelValue', !this.modelValue)
    },
  },
}
</script>

<style>
.switch input {
  position: absolute;
  opacity: 0;
}

.switch {
  display: inline-block;
  font-size: 20px; /* 1 */
  height: 1em;
  width: 2em;
  background: #bdb9a6;
  border-radius: 1em;
  cursor: pointer;
}

.switch div {
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background: #fff;
  box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
  transition: all 300ms;
}

.switch input:checked + div {
  transform: translate3d(100%, 0, 0);
  background: greenyellow;
}
</style>
