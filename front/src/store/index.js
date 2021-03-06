import Vue from 'vue'
import Vuex from 'vuex'

import { Accounts, Auth, Categories, Expenses, Incomes, User } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Accounts,
    Auth,
    Categories,
    Expenses,
    Incomes,
    User,
  },
})
