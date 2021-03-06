import { Schema, model } from 'mongoose'

const AccountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const AccountModel = model('Account', AccountSchema)

export { AccountModel as Account }
