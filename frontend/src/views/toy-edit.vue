<template>
    <main class="full toy-edit-container">
        <section class="toy-edit">
            <form>
                <h2>Add Toy</h2>
                <router-link class="return-action" to="/">Return</router-link>
                <p>Name</p>
                <el-input v-model="toyToEdit.name" type="text" placeholder="Toy's Name" />
                <p>Price</p>
                <label>
                    <el-input-number v-model="toyToEdit.price" :min="10" :max="550" />
                </label>
                <p>Labels</p>
                <label>
                    <el-select v-model="toyToEdit.labels" multiple collapse-tags collapse-tags-tooltip
                        placeholder="Select" style="width: 240px">
                        <el-option v-for="item in labels" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </label>

                <el-radio-group v-model="toyToEdit.inStock" size="large">
                    <el-radio-button label="Stock" />>
                    <el-radio-button label="Ordered" />>
                </el-radio-group>
                <span class="save-action" @click="save">Save</span>
            </form>
        </section>
    </main>

</template>

<script>

export default {
    name: 'toy-edit',
    data() {
        return {
            toyToEdit: {},
            toyLabels: []
        }
    },

    methods: {
        getEmptyToy() {
            const emptyToy = this.$store.getters.emptyToy
            return emptyToy
        },

        async loadToyToEdit() {
            this.toyToEdit = await this.$store.dispatch({ type: 'getToyById', id: this.$route.params.id })
            this.toyLabels = this.toyToEdit.labels
        },

        async save() {
            const toy = JSON.parse(JSON.stringify(this.toyToEdit))
            toy.inStock = (toy.inStock === 'Stock') ? true : false

            await this.$store.dispatch({ type: 'saveToy', toy })
            this.$router.push('/')
        },

    },

    computed: {
        labels() {
            return this.$store.getters.labels
        },

        isChecked(label) {
            return this.toyToEdit.labels.includes(label)
        }
    },

    created() {
        const id = this.$route.params?.id

        if (!id) {
            const emptyToy = JSON.parse(JSON.stringify(this.getEmptyToy()))
            this.toyToEdit = emptyToy
            return
        }

        this.loadToyToEdit()
    },
}

</script>
