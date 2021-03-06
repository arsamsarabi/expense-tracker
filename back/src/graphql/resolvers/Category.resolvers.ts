import { Category, Expense } from '../../db'
import { getExpenditureSum } from '../../utils/helpers'

const queries = {
  getMyCategories: async (_: any, { userId }: { userId: string }) => {
    const tempCats = await Category.find({ $or: [{ userId }, { userId: 'generic' }] })
    const expenses = await Expense.find({ userId: userId })
    const result = getExpenditureSum(expenses, tempCats)
    return result
  },
}

const mutations = {
  addCategory: async (_: unknown, { newCategory }: any) => {
    const category = new Category(newCategory)
    return await category.save()
  },
  updateCategory: async (_: unknown, { categoryToUpdate }: any) => {
    return await Category.findOneAndUpdate(
      { _id: categoryToUpdate.id, userId: categoryToUpdate.userId },
      categoryToUpdate,
      {
        new: true,
      },
    )
  },
  deleteCategory: async (_: unknown, { categoryToDelete }: any) => {
    return await Category.findOneAndDelete({
      _id: categoryToDelete.id,
      userId: categoryToDelete.userId,
    })
  },
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
}

export { resolvers as CategoryResolvers }
