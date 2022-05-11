// import { createStore } from 'vuex'
// import Vue from 'vuex'
import Vuex from 'vuex'
import todaydeal from './modules/todaydeal'

// import axios from 'axios'
// axios.defaults.baseURL = "http://localhost:8000/api/"

// Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    todaydeal
  },
})

export default store

