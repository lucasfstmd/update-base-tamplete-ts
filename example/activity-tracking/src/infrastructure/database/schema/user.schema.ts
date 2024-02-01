import Mongoose from 'mongoose'

interface IUserModel extends Mongoose.Document {
}

const schema: any = {
    name: String,
    email: String
}

const options: any = {
    timestamp: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJson: {
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            return ret
        }
    }
}

export const UserRepoModel = Mongoose.model<IUserModel> (
    'users',
    new Mongoose.Schema(schema, options),
    'users'
)
