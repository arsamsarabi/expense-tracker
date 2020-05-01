import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  expenses: [],
}
const getters = {
  getExpenses: state => state.expenses.filter(expense => !expense.recurring),
  getRecurring: state => state.expenses.filter(expense => expense.recurring),
}
const actions = {
  async fetchExpensesByUserId({ commit, rootGetters }, userID) {
    const { data } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query: `
        query getExpensesByUserId {
          getExpensesByUserId(userId: "${userID}") {
            id
            title
            description
            amount
            date
            recurring
            frequency
            endDate
            categories {
              id
              label
              icon
              color
            }
            payee
            accountId
            userId
          }
        }
      `,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      },
    )
    commit('setExpenses', data.data.getExpensesByUserId)
  },
  async postExpense({ commit, rootGetters, dispatch }, expense) {
    const query = `
      mutation addExpense($input: ExpenseInput) {
        addExpense(newExpense: $input) {
          id
          title
          description
          amount
          date
          recurring
          frequency
          endDate
          categories {
            id
            label
            icon
            color
          }
          payee
          accountId
          userId
        }
      }
    `
    const { data, errors } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          input: {
            ...expense,
            userId: rootGetters.getUser.id,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      },
    )
    if (errors) console.error(errors)
    if (data.data.addExpense) {
      dispatch('getMyCategories', rootGetters.getUser.id)
      commit('addExpense', data.data.addExpense)
    }
  },
  async patchExpense({ commit, rootGetters, dispatch }, expense) {
    const query = `
      mutation updateExpense($input: ExpenseInput) {
        updateExpense(expenseToUpdate: $input) {
          id
          title
          description
          amount
          date
          recurring
          frequency
          endDate
          categories {
            id
            label
            icon
            color
          }
          payee
          accountId
          userId
        }
      }
    `
    const { data, errors } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          input: {
            ...expense,
            categories: expense.categories?.map(cat => cat.id) || [],
            userId: rootGetters.getUser.id,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      },
    )
    if (errors) console.error(errors)
    if (data.data.updateExpense) {
      dispatch('getMyCategories', rootGetters.getUser.id)
      commit('updateExpense', data.data.updateExpense)
    }
  },
  async deleteExpense({ commit, rootGetters, dispatch }, { id }) {
    const query = `
      mutation deleteExpense($id: String) {
        deleteExpense(id: $id) {
          id
        }
      }
    `
    const { data, errors } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          id: id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      },
    )
    if (errors) console.error(errors)
    if (data.data.deleteExpense) {
      dispatch('getMyCategories', rootGetters.getUser.id)
      commit('deleteExpense', data.data.deleteExpense.id)
    }
  },
}
const mutations = {
  setExpenses(state, expenses) {
    state.expenses = expenses
  },
  addExpense(state, expense) {
    state.expenses = [...state.expenses, expense]
  },
  updateExpense(state, expense) {
    state.expenses = state.expenses.map(exp => (exp.id === expense.id ? expense : exp))
  },
  deleteExpense(state, id) {
    state.expenses = state.expenses.filter(exp => exp.id !== id)
  },
}

export const Expenses = { state, getters, actions, mutations }
