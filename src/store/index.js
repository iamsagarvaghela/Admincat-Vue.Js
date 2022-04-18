import { createStore } from 'vuex'
import todaydeal from './modules/todaydeal'
// import axios from 'axios'
// axios.defaults.baseURL = "http://localhost:8000/api/"

export default createStore({
  modules: {
    todaydeal
  }
})



// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//     firstName: 'Sagar',
//     lastName: 'Vaghela'
//   },
//   getters: {
//     fullname: function (state) {
//       return `${state.firstName} ${state.lastName}`
//     }
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
// Called in Today Deal