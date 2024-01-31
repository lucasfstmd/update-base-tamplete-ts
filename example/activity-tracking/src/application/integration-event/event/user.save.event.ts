import { EventType, IntegrationEvent } from './integration.event'
import { User } from '../../domain/model/user'

export class UserSaveEvent extends IntegrationEvent<User> {
    public static readonly ROUTING_KEY: string = 'users.save'
    public static readonly NAME: string = 'UsersSaveEvent'

    constructor(public timestamp?: Date, public user?: User) {
        super(UserSaveEvent.NAME, EventType.USER, timestamp)
    }

    public toJSON(): any {
        if (!this.user) return {}
        return {
            ...super.toJSON(),
            ...{
                user: this.user.toJSON()
            }
        }
    }

}
