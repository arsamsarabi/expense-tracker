import { commerce, date, company, random } from 'faker'

import { Expense } from '../models'
import { getRandomCatIds } from './categories'
import { descriptionGenerator } from './helpers'

const NUMBER_OF_EXPENSES = 15

export const fakeExpenses = async (userId: string, fakeAccountIds: string[]) => {
  console.log(await fakeOneOffExpenses(userId, fakeAccountIds))
  console.log(await fakeRecurringExpenses(userId, fakeAccountIds))
}

const fakeOneOffExpenses = async (userId: string, fakeAccountIds: string[]) => {
  for (let i = 0; i < NUMBER_OF_EXPENSES; i++) {
    const fakeExpense = new Expense({
      title: commerce.productName(),
      description: descriptionGenerator(),
      amount: commerce.price(0.5, 300, 2),
      date: date.past(1),
      recurring: false,
      categories: getRandomCatIds(),
      payee: company.companyName(),
      accountId: random.arrayElement(fakeAccountIds),
      userId,
    })
    await fakeExpense.save()
  }
  return `${NUMBER_OF_EXPENSES} one off expenses created`
}

const fakeRecurringExpenses = async (userId: string, fakeAccountIds: string[]) => {
  for (let i = 0; i < NUMBER_OF_EXPENSES; i++) {
    const fakeExpense = new Expense({
      title: commerce.productName(),
      description: descriptionGenerator(),
      amount: commerce.price(0.5, 800, 2),
      date: date.past(1),
      recurring: true,
      frequency: random.arrayElement(['Daily', 'Weekly', 'Monthly', 'Yearly']),
      categories: getRandomCatIds(),
      payee: company.companyName(),
      accountId: random.arrayElement(fakeAccountIds),
      userId,
    })
    await fakeExpense.save()
  }
  return `${NUMBER_OF_EXPENSES} recurring expenses created`
}
