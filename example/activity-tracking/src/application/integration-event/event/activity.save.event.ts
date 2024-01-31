import { EventType, IntegrationEvent } from './integration.event'
import { Activity } from '../../domain/model/activity'

export class ActivitySaveEvent extends IntegrationEvent<Activity> {
    public static readonly ROUTING_KEY: string = 'activitys.save'
    public static readonly NAME: string = 'ActivitysSaveEvent'

    constructor(public timestamp?: Date, public activity?: Activity) {
        super(ActivitySaveEvent.NAME, EventType.ACTIVITY, timestamp)
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
