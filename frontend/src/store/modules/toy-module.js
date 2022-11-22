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

    saveToy(state, {toy, method}) {
      if (method === 'put') {
        const {_id} = toy
        const toyIdx = state.toys.findIndex(toy => toy._id === _id)
        state.toys[toyIdx] = toy
      } else {
        state.toys.unshift(toy)
      }
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

    deleteToy({commit}, { id }) {
      return toyService.remove(id)
      .then(() => {
          commit({type:'removeToy', id})
      })

    },

    saveToy(context, { toy }) {    
      return toyService.save(toy)
        .then(() => {
          if (toy._id) context.commit({type:'saveToy', toy, method: 'put'})
          else context.commit({type:'saveToy', toy, method: 'post'})
        })
        .catch(() => {
          return context.dispatch({ type: 'loadToys' })
        })
    },

    setFilter({ commit }, { filterBy }) {
      toyService.query(filterBy)
        .then(toys => commit({ type: 'setToys', toys }))
    }




  },
}
