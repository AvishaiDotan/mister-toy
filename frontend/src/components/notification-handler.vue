<template>
  <div class="root">
    <button class="btn btn-secondary" @click="isOpen = true">Open</button>
    <teleport to="body">
      <div class="modal flex items-center justify-center" v-if="isOpen">
        <div class="flex flex-col items-center justify-center gap-1" :class="type">
          <h2>{{ msg }}</h2>
          <button class="btn btn-secondary-text" @click="isOpen = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    type: String,
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<style scoped>
.root {
  position: relative;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
}

.modal > div {
  background-color: #fff;
  padding: 20px 50px;
  border-radius: 10px;
}

.danger {
  border: 2px solid #fee2e2;
}

.success {
  border: 2px solid #d1fae5;
}
</style>
