<template>
  <section class="toy-preview" @click.stop="goToDetails(toy._id)" @mouseenter="isHover = true" @mouseleave="isHover = false">
      <h3 class="toy-name">{{toy.name}}</h3>
      <p class="toy-price">${{toy.price}}</p>



    <div class="actions-container" v-if="isHover">
      <span @click.stop="deleteToy(toy._id)">
        <img src="../assets/bin.png"/>
      </span>
      <span @click.stop="goToEdit(toy._id)">
        <img src="../assets/edit.png"/>
      </span>
    </div>
    </section>
</template>

<script>
  import {eventBus} from '../services/event-bus.service'

  export default {
    name: 'toy-preview',
    props: {
      toy: Object,
    },
    data() {
      return {
        isHover: false
      }
    },
    methods: {
        goToEdit(toyId) {
            this.$router.push('/edit/' + toyId)
        },
        goToDetails(toyId) {
            this.$router.push('/toy/' + toyId)
        },
        deleteToy(toyId) {
          eventBus.emit('delete-toy', toyId)
        }
    },
  }
</script>
