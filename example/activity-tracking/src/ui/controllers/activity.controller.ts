import HttpStatus from 'http-status-codes'
import { inject } from 'inversify'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { Identifier } from '../../di/identifiers'
import { Query } from '../../infrastructure/repository/query/query'
import { Activity } from '../../application/domain/model/activity'
import { IActivityService } from '../../application/port/activity.service.interface'
// import { User } from '../../application/domain/model/user'
import { ILogger } from '../../utils/custom.logger'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { ApiException } from '../exception/api.exception'
import { IUserService } from '../../application/port/user.service.interface'

/**
 * Controller that implements Activity feature operations.
 *
 * @remarks To define paths, we use library inversify-express-utils.
 * @see {@link https://github.com/inversify/inversify-express-utils} for further information.
 */
@controller('/users/:user_id/activities')
export class ActivityController {

    /**
     * Creates an instance of Activity controller.
     *
     * @param {IActivityService} _activityService
     * @param {IUserService} _userService
     * @param {ILogger} _logger
     */
    constructor(
        @inject(Identifier.ACTIVITY_SERVICE) private readonly _activityService: IActivityService,
        @inject(Identifier.USER_SERVICE) private readonly _userService: IUserService,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
    }

    /**
     * Add new activity.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpPost('/')
    public async addActivity(@request() req: Request, @response() res: Response) {
        try {
            const user = await this._userService.getById(req.params.user_id, new Query())
            const activity: Activity = new Activity().fromJSON(req.body)
            activity.user = user
            const result: Activity | undefined = await this._activityService.add(activity)
            return res.status(HttpStatus.CREATED).send(result)
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    /**
     * Get all activities.
     * For the query strings, the query-strings-parser middleware was used.
     * @see {@link https://www.npmjs.com/package/query-strings-parser} for further information.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpGet('/')
    public async getAllActivities(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result = await this._activityService.getAll(new Query().fromJSON(req.query))
            return res.status(HttpStatus.OK).send(result)
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    /**
     * Get activity by id.
     * For the query strings, the query-strings-parser middleware was used.
     * @see {@link https://www.npmjs.com/package/query-strings-parser} for further information.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpGet('/:activity_id')
    public async getActivityById(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: Activity | undefined = await this._activityService.getById(req.params.activity_id,
                new Query().fromJSON(req.query))
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFoundActivity())
            return res.status(HttpStatus.OK).send(result)
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    /**
     * Update activity by id.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpPatch('/:activity_id')
    public async updateActivity(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const activity: Activity = new Activity().fromJSON(req.body)
            activity.id = req.params.activity_id
            const result = await this._activityService.update(activity)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFoundActivity())
            return res.status(HttpStatus.OK).send(result)
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    /**
     * Remove activity by id.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpDelete('/:activity_id')
    public async removeActivity(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: boolean = await this._activityService.remove(req.params.activity_id)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFoundActivity())
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    private getMessageNotFoundActivity(): object {
        return new ApiException(
            HttpStatus.NOT_FOUND,
            'Activity not found!',
            'Activity not found or already removed. A new operation for the same resource is not required!'
        ).toJSON()
    }
}
