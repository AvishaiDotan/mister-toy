<template>
    <main>
        <section class="toy-edit">
            <form>
                <router-link class="return-action" to="/">Return</router-link>
                <p>Name</p>
                <label>
                    <input v-model="toyToEdit.name" type="text">
                </label>
                <p>Price</p>
                <label>
                    <input v-model="toyToEdit.price" type="number">
                </label>
                <p>Labels</p>
                <div class="labels-multiple-select-container">
                    <label v-for="label in labels" :key="label.txt" class="container">
                        {{ label.txt }}
                        <input @input.stop="setCheck($event, labelName)" type="checkbox" checked="checked">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <p>On Stock</p>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider round"></span>
                </label>
                <span class="save-action" @click="save">Save</span>
                <pre>{{labels}}</pre>
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
        }
    },

    methods: {
        getEmptyToy() {
            const emptyToy = this.$store.getters.emptyToy
            return emptyToy
        },

        loadToyToEdit() {
            this.$store.dispatch({ type: 'getToyById', id: this.$route.params.id })
                .then(toy => this.toyToEdit = toy)
        },

        save() {
            this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
                .then(() => {
                    this.$router.push('/')
                })
        },

        setCheck(ev, label) {
            const labels = this.toyToEdit.labels
            if (ev.target.checked) {
                labels.push(label)
            } else {
                const idx = labels.findIndex(currLabel => currLabel === label)
                labels.splice(idx, 1)
            }
            this.toyToEdit = this.toyToEdit
        },

        getLabels() {
            return this.$store.getters.labels
        }
        
    },

    computed: {
        labels() {

            const allLabels = this.getLabels() 
            const allLabelsMap = [];

            const toyLabels = this.toyToEdit.labels
            allLabels.forEach(label => {
                allLabelsMap.push(
                    {   
                        isOn: (toyLabels.includes(label)) ? true : false,
                        txt:label  
                    })
            })

            return allLabelsMap
        }
    },

    created() {
        const id = this.$route.params?.id

        if (!id) {
            this.toyToEdit = this.getEmptyToy()
            return
        }

        this.loadToyToEdit()
    },
}

</script>

<style>
/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: #2196F3;
}

input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>

