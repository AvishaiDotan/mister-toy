<template>
  <nav class="dropdown-nav">
    <h2>Drop Down Menu</h2>
    <input class="dropdown-input" id="toggle" type="checkbox" checked />
    <ul>
      <li>
        <a :value="modelValue" @click="changeSection('Section 01')"> Section 01 </a>
      </li>
      <li>
        <a :value="modelValue" @click="changeSection('Section 02')"> Section 02 </a>
      </li>
      <li>
        <a :value="modelValue" @click="changeSection('Section 03')"> Section 03 </a>
      </li>
      <li>
        <a :value="modelValue" @click="changeSection('Section 04')"> Section 04 </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['modelValue'],
  methods: {
    changeSection(section) {
      this.$emit('update:modelValue', section)
    },
  },
}
</script>

<style></style>
