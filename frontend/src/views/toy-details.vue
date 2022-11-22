<template>
    <main>
        <section class="toy-details">
            <router-link class="return-action" to="/">Return</router-link>
            <h2>Toy Details</h2>
            <h3>Name</h3>
            <p>{{ toy.name }}</p>
            <h3>Price</h3>
            <p>${{ toy.price }}</p>
            <h3>Date</h3>
            <p>{{ formattedDate }}</p>
            <h3>In Stock</h3>
            <p>{{ inStock }}</p>
            <h3>Labels</h3>
            <ul>
                <el-tag v-for="label in toy.labels" :key="label" class="ml-2" type="danger">{{ label }}</el-tag>
            </ul>
            <router-link class="edit-route" :to="'/edit/' + toy._id">Edit</router-link>
        </section>
    </main>

</template>

<script>
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
            .then(toy => {
                this.toy = toy
                console.log(toy);
            })
    },
    computed: {
        inStock() {
            return (this.toy.inStock) ? 'Yes' : 'No'
        },
        formattedDate() {
            const d = new Date(this.toy.createdAt)
            const cd = num => num.toString().padStart(2, 0)
            return d.getFullYear() + "/" + cd(d.getMonth() + 1) + "/" + cd(d.getDate())
        }
    }
}

</script>

