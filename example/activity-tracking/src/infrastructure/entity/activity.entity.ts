import { User } from '../../application/domain/model/user'

export class ActivityEntity {
     public name?: string
     public start_time?: Date
     public end_time?: Date
     public duration?: number
     public max_intensity?: string
     public max_intensity_duration?: number
     public calories?: number
     public steps?: number
     public user?: User
}
