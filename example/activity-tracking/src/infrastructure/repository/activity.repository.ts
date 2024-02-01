import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { Activity } from '../../application/domain/model/activity'
import { BaseRepository } from './base/base.repository'
import { Query } from './query/query'
import { ILogger } from '../../utils/custom.logger'
import { IActivityRepository } from '../../application/port/activity.repository.interface'
import { ActivityEntity } from '../entity/activity.entity'
import { ActivityEntityMapper } from '../entity/mapper/activity.entity.mapper'
import { IQuery } from '../../application/port/query.interface'

/**
 * Implementation of the activity repository.
 *
 * @implements {IActivityRepository}
 */
@injectable()
export class ActivityRepository extends BaseRepository<Activity, ActivityEntity> implements IActivityRepository {
    constructor(
        @inject(Identifier.ACTIVITY_REPO_MODEL) readonly activityModel: any,
        @inject(Identifier.ACTIVITY_ENTITY_MAPPER) readonly activityMapper: ActivityEntityMapper,
        @inject(Identifier.LOGGER) readonly logger: ILogger
    ) {
        super(activityModel, activityMapper, logger)
    }

    /**
     * @override
     */
    public find(query: IQuery): Promise<Array<Activity>> {
        const q: any = query.toJSON()
        return new Promise<Array<Activity>>((resolve, reject) => {
            this.Model.find(q.filters)
                .select(q.fields)
                .populate('user')
                .sort(q.ordination)
                .skip(Number((q.pagination.limit * q.pagination.page) - q.pagination.limit))
                .limit(Number(q.pagination.limit))
                .exec() // execute query
                .then((result: Array<ActivityEntity>) => {
                    resolve(result.map(item => this.activityMapper.transform(item)))
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * @override
     */
    public findOne(query: IQuery): Promise<Activity> {
        const q: any = query.toJSON()
        return new Promise<Activity>((resolve, reject) => {
            this.Model.findOne(q.filters)
                .select(q.fields)
                .populate('user')
                .exec()
                .then((result: ActivityEntity) => {
                    if (!result) return resolve(new Activity())
                    return resolve(this.activityMapper.transform(result))
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * @override
     */
    public update(item: Activity): Promise<Activity> {
        const activity: ActivityEntity = this.activityMapper.transform(item)
        return new Promise<Activity>((resolve, reject) => {
            this.Model.findOneAndUpdate({ _id: item.id }, activity, { new: true })
                .exec()
                .then(result => {
                    if (!result) return resolve(new Activity())
                    result.populate('user')
                        .execPopulate()
                        .then((res) => resolve(this.activityMapper.transform(res)))
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * Checks if an activity already has a registration.
     * What differs from one activity to another is the start date and associated user.
     *
     * @param activity
     * @return {Promise<boolean>} True if it exists or False, otherwise
     * @throws {ValidationException | RepositoryException}
     */
    public async checkExist(activity: Activity): Promise<boolean> {
        const query: Query = new Query()
        return new Promise<boolean>((resolve, reject) => {
            if (activity.start_time && activity.user) {
                query.filters = { start_time: activity.start_time, user: activity.user }
            }
            super.findOne(query)
                .then((result: Activity | undefined) => {
                    if (result) return resolve(true)
                    return resolve(false)
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }
}
