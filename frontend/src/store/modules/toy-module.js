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
      const allLables = []

      state.toys.forEach(({ labels }) => {
        labels.forEach(label => {
          if (!allLables.includes(label)) allLables.push(label)
        })
      });

      return allLables
    }

  },

  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    }

  },

  actions: {
    loadToys({ commit }) {
      toyService.query()
        .then(toys => commit({ type: 'setToys', toys }))
    },
    getToyById(context, { id }) {
      return toyService.getById(id)
        .then(toy => {
          console.log(toy);
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
          context.dispatch({ type: 'loadToys' })
        })
    },

    setFilter({commit}, { filterBy }) {
      toyService.query(filterBy)
        .then(toys => commit({ type: 'setToys', toys }))
    }




  },
}
