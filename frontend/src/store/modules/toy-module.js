import { toyService } from '../../services/toy-service'

export default {
  state: {
    toys: [],

  },
  getters: {
    toys(state) {
      return state.toys
    },
    emptyToy() {
      return {
        name: '',
        price: 0,
        labels: [],
        inStock: true
      }
    },

    labels() {
      return toyService.getLabels().map(label => ({ value: label, label }))
    }

  },

  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },

    removeToy(state, { id }) {
      const idx = state.toys.findIndex(toy => toy._id === id)
      state.toys.splice(idx, 1)
    },

    putToy(state, {toy}) {
      // console.log('putToy', toy);
      const {_id} = toy
      const toyIdx = state.toys.findIndex(toy => toy._id === _id)
      state.toys[toyIdx] = toy
      return toy
    },

    postToy(state, {toy}) {
      state.toys.unshift(toy)
      return toy
    }

  },

  actions: {
    async loadToys({ commit }, {filterBy}) {
      const toys = await toyService.query(filterBy)
      commit({ type: 'setToys', toys })
    },

    async getToyById(context, { id }) {
      return await toyService.getById(id)
    },

    async deleteToy({commit}, { id }) {
      const deletedToy = await toyService.remove(id)
      commit({type:'removeToy', id})
    },

    async saveToy({commit}, { toy }) {   
      const method = toy._id ? 'putToy' : 'postToy'
      const {toy: savedToy} = await toyService.save(toy)
      return commit({type: method, toy: savedToy})
    },

    async setFilter({ commit }, { filterBy }) {
      const toys = await toyService.query(filterBy)
      commit({ type: 'setToys', toys })
    }

  },
}
