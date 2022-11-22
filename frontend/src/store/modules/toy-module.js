import { toyService } from '../../services/toy-service'
import { utilService } from '../../services/util-service'

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

    labels(state) {
      let labels = toyService.getLabels().map(label => ({value: label, label}))
      labels = JSON.parse(JSON.stringify(labels))
      return labels
    }

  },

  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    }

  },

  actions: {
    loadToys({ commit }) {
      return toyService.query()
        .then(toys => commit({ type: 'setToys', toys }))
    },

    getToyById(context, { id }) {
      return toyService.getById(id)
        .then(toy => {
          return JSON.parse(JSON.stringify(toy))
        })
    },

    deleteToy(context, { id }) {
      toyService.remove(id)
        .then(() => {
          context.dispatch({ type: 'loadToys' })
        })
    },

    saveToy(context, { toy }) {
      return toyService.save(toy)
        .then(() => {
          return context.dispatch({ type: 'loadToys' })
        })
    },

    setFilter({commit}, { filterBy }) {
      console.log(filterBy);
      toyService.query(filterBy)
        .then(toys => commit({ type: 'setToys', toys }))
    }




  },
}
