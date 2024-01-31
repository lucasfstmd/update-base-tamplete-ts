import { EventType, IntegrationEvent } from './integration.event'
import { Activity } from '../../domain/model/activity'

export class ActivityDeleteEvent extends IntegrationEvent<any> {
    public static readonly ROUTING_KEY: string = 'activitys.delete'
    public static readonly NAME: string = 'ActivitysDeleteEvent'

    constructor(public timestamp?: Date, public activity?: Activity) {
        super(ActivityDeleteEvent.NAME, EventType.ACTIVITY, timestamp)
    }

    public toJSON(): any {
        if (!this.activity) return {}
        return {
            ...super.toJSON(),
            ...{
                activity: this.activity.toJSON()
            }
        }
    }
}
