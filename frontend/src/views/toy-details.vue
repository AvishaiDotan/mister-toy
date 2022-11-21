<template>
    <section>
        <h2>Toy Details</h2>
        <div>
            <h3>{{toy.name}}</h3>
            <p>${{toy.price}}</p>
            <p>{{toy.createAt}}</p>
            <p>{{toy.inStock}}</p>
            <ul>
                <li v-for="label in toy.labels" :key="label">{{label}}</li>
            </ul>
            <ul>
                <li v-for="review in toy.reviews" :key="review">{{review}}</li>
            </ul>
        </div>
    </section>
    <pre>{{toy}}</pre>
    
</template>

<script>

import { toyService } from "../services/toy-service"
// import { showSuccessMsg, showErrorMsg, eventBus } from "../services/event-bus.service.js"


export default {
    name: 'toy-details',
    props: {
        id: String
    },
    data() {
        return {
            toy: {}
        }
    },
    mounted() {
        const id = this.$route.params.id
        this.$store.dispatch({ type: 'getToyById', id, })
            .then(toy => this.toy = toy)
    },
}

</script>

