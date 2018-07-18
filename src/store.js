import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurants: []
  },
  mutations: {
    restaurantStatus: (state, restaurants) => {
      state.restaurants = restaurants
    }
  },
  actions: {
    setRestaurant: ({commit}, restaurants) => {
      commit('restaurantStatus', restaurants)
    }
  }
})
