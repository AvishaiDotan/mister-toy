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

    }
  },
  mutations: {
    setToys(state, {toys}) {
      state.toys = toys
    }
  },
  actions: {
    loadToys({commit}) {
      toyService.query()
        .then(toys => commit({ type: 'setToys', toys }))
    },
    getToyById(context, {id}) {
      return toyService.getById(id)
        .then(toy => JSON.parse(JSON.stringify(toy)))
    } 


  },
}
