import Mongoose from 'mongoose'

interface IActivityModel extends Mongoose.Document {
}

const schema: any = {
    name: String,
    start_time: Date,
    end_time: Date,
    duration: Number,
    max_intensity: String,
    max_intensity_duration: Number,
    calories: Number,
    steps: Number,
    user: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'users',
        required: 'User required!'
    }
}

const options: any = {
    timestamp: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJson: {
        transform: (doc, ret) => {
            ret._id = ret.id
            delete ret.id
            return ret
        }
    }
}

export const ActivityRepoModel = Mongoose.model<IActivityModel> (
    'activitys',
    new Mongoose.Schema(schema, options),
    'activitys'
)
