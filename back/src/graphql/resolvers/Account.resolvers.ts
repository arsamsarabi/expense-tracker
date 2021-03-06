import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import { Account, Expense, Income } from '../../db'

dayjs.extend(isSameOrAfter)

const queries = {
  getAccountsByUserId: async (_: any, { userId }: { userId: string }) =>
    await Account.find({ userId }),
}

const mutations = {
  addAccount: async (_: unknown, { newAccount }: any) => {
    const account = new Account(newAccount)
    return await account.save()
  },
  updateAccount: async (_: unknown, { accountToUpdate }: any) => {
    return await Account.findOneAndUpdate({ _id: accountToUpdate.id }, accountToUpdate, {
      new: true,
    })
  },
  deleteAccount: async (_: unknown, { id }: any) => {
    const deletedAccount = await Account.findOneAndDelete({ _id: id })
    await Expense.deleteMany({ accountId: id })
    return deletedAccount
  },
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
  Account: {
    expenses: async ({ _id }: any) => await Expense.find({ accountId: _id }),
    incomes: async ({ _id }: any) => await Income.find({ accountId: _id }),
    expenditureSumTotal: async ({ _id }: any) => {
      const expenses: any = await Expense.find({ accountId: _id })
      return parseFloat(
        expenses.reduce((acc: number, expense: any) => acc + expense.amount, 0),
      ).toFixed(2)
    },
    expenditureSumMonth: async ({ _id }: any) => {
      const expenses: any = await Expense.find({ accountId: _id })
      const now = dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
      const filtered = expenses.filter((exp: any) => dayjs(exp.date).isSameOrAfter(now))
      return parseFloat(
        filtered.reduce((acc: number, expense: any) => acc + expense.amount, 0),
      ).toFixed(2)
    },
    expenditureSum30Days: async ({ _id }: any) => {
      const expenses: any = await Expense.find({ accountId: _id })
      const diff = dayjs().subtract(30, 'day')
      const filtered = expenses.filter((exp: any) => dayjs(exp.date).isSameOrAfter(diff))
      return parseFloat(
        filtered.reduce((acc: number, expense: any) => acc + expense.amount, 0),
      ).toFixed(2)
    },
    incomeSumTotal: async ({ _id }: any) => {
      const incomes: any = await Income.find({ account: _id })
      return parseFloat(
        incomes.reduce((acc: number, income: any) => acc + income.amount, 0),
      ).toFixed(2)
    },
    incomeSumMonth: async ({ _id }: any) => {
      const incomes: any = await Income.find({ account: _id })
      const now = dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
      const filtered = incomes.filter((inc: any) => dayjs(inc.date).isSameOrAfter(now))
      return parseFloat(
        filtered.reduce((acc: number, income: any) => acc + income.amount, 0),
      ).toFixed(2)
    },
    incomeSum30Days: async ({ _id }: any) => {
      const incomes: any = await Income.find({ account: _id })
      const diff = dayjs().subtract(30, 'day')
      const filtered = incomes.filter((inc: any) => dayjs(inc.date).isSameOrAfter(diff))
      return parseFloat(
        filtered.reduce((acc: number, income: any) => acc + income.amount, 0),
      ).toFixed(2)
    },
  },
}

export { resolvers as AccountResolvers }
