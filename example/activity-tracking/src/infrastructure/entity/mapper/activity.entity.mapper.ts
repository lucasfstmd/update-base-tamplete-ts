import { injectable } from 'inversify'
import { ActivityEntity } from '../activity.entity'
import { Activity } from '../../../application/domain/model/activity'
import { UserEntityMapper } from './user.entity.mapper'
import { IEntityMapper } from './entity.mapper.interface'

@injectable()
export class ActivityEntityMapper implements IEntityMapper<Activity, ActivityEntity> {

    public transform(item: any): any {
        if (item instanceof Activity) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }

    /**
     * Convert {Activity} for {ActivityEntity}.
     *
     * @see Before setting the value, it is important to verify that the type is valid.
     * Therefore, you do not run the risk that in an UPDATE / PATCH action type,
     * attributes that should not be updated are saved with null values.
     * @see Creation Date should not be mapped to the type the repository understands.
     * Because this attribute is created automatically by the database.
     * Therefore, if a null value is passed at update time, an exception is thrown.
     * @param item
     */
    public modelToModelEntity(item: Activity): ActivityEntity {
        const result: ActivityEntity = new ActivityEntity()

        if (item.name !== undefined) result.name = item.name
        if (item.start_time !== undefined) result.start_time = item.start_time
        if (item.end_time !== undefined) result.end_time = item.end_time
        if (item.duration !== undefined) result.duration = item.duration
        if (item.max_intensity !== undefined) result.max_intensity = item.max_intensity
        if (item.max_intensity_duration !== undefined) result.max_intensity_duration = item.max_intensity_duration
        if (item.calories !== undefined) result.calories = item.calories
        if (item.steps !== undefined) result.steps = item.steps
        if (item.user !== undefined) result.user = item.user

        return result
    }

    /**
     * Convert {ActivityEntity} for {Activity}.
     *
     * @see Each attribute must be mapped only if it contains an assigned value,
     * because at some point the attribute accessed may not exist.
     * @param item
     */
    public modelEntityToModel(item: ActivityEntity): Activity {
        const result: Activity = new Activity()

        result.name = item.name
        result.start_time = item.start_time
        result.end_time = item.end_time
        result.duration = item.duration
        result.max_intensity = item.max_intensity
        result.max_intensity_duration = item.max_intensity_duration
        result.calories = item.calories
        result.steps = item.steps
        result.user = new UserEntityMapper().transform(item.user)

        return result
    }

    /**
     * Convert JSON for Activity.
     *
     * @see Each attribute must be mapped only if it contains an assigned value,
     * because at some point the attribute accessed may not exist.
     * @param json
     */
    public jsonToModel(json: any): Activity {
        const result: Activity = new Activity()

        if (!json) return result
        if (json.id !== undefined) result.id = json.id
        if (json.name !== undefined) result.name = json.name
        if (json.start_time !== undefined) result.start_time = new Date(json.start_time)
        if (json.end_time !== undefined) result.end_time = new Date(json.end_time)
        if (json.duration !== undefined) result.duration = Number(json.duration)
        if (json.max_intensity !== undefined) result.max_intensity = json.max_intensity
        if (json.max_intensity_duration !== undefined) result.calories = Number(json.max_intensity_duration)
        if (json.calories !== undefined) result.calories = Number(json.calories)
        if (json.steps !== undefined) result.steps = Number(json.steps)
        if (json.user !== undefined) result.user = new UserEntityMapper().transform(json.user)

        return result
    }
}
