import { finance, company } from 'faker'

import { Account } from '../models'

const NUMBER_OF_FAKE_ACCOUNTS = 3

export const fakeAccounts = async (userId: string) => {
  const fakeAccountIds = []

  for (let i = 0; i < NUMBER_OF_FAKE_ACCOUNTS; i++) {
    const fakeAccount = new Account({
      name: finance.accountName(),
      description: company.companyName(),
      userId,
    })
    const res = await fakeAccount.save()
    fakeAccountIds.push(res.id)
  }

  console.log(`${NUMBER_OF_FAKE_ACCOUNTS} accounts created.`)
  return fakeAccountIds
}
