import HttpStatus from 'http-status-codes'
import { inject } from 'inversify'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { Identifier } from '../../di/identifiers'
import { User } from '../../application/domain/model/user'
import { IUserService } from '../../application/port/user.service.interface'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { ApiException } from '../exception/api.exception'

/**
 * Controller that implements User feature operations.
 *
 * @remarks To define paths, we use library inversify-express-utils.
 * @see {@link https://github.com/inversify/inversify-express-utils} for further information.
 */
@controller('/users')
export class UserController {

    /**
     * Creates an instance of UserController.
     *
     * @param {IUserService} _userService
     */
    constructor(
        @inject(Identifier.USER_SERVICE) private readonly _userService: IUserService,
    ) {
    }

    /**
     * Add new user.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpPost('/')
    public async addUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const newUser: User = new User().fromJSON(req.body)
            const result: User | undefined = await this._userService.add(newUser)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    /**
     * Get all users.
     * For the query strings, the query-strings-parser middleware was used.
     * @see {@link https://www.npmjs.com/package/query-strings-parser} for further information.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpGet('/')
    public async getAllUsers(@request() req: Request, @response() res: Response) {
        try {
            const result: Array<User> = await this._userService.getAll(new Query().fromJSON(req.query))
            return res.status(HttpStatus.OK).send(result)
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    /**
     * Get user by id.
     * For the query strings, the query-strings-parser middleware was used.
     * @see {@link https://www.npmjs.com/package/query-strings-parser} for further information.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpGet('/:user_id')
    public async getUserById(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: User | undefined = await this._userService.getById(req.params.user_id, new Query().fromJSON(req.query))
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFoundUser())
            return res.status(HttpStatus.OK).send(result)
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    /**
     * Update user by id.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpPatch('/:user_id')
    public async updateUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const user: User = new User().fromJSON({ name: req.body.name, email: req.body.email })
            const result = await this._userService.update(user)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFoundUser())
            return res.status(HttpStatus.OK).send(result)
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    /**
     * Remove user by id.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpDelete('/:user_id')
    public async removeUser(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: boolean = await this._userService.remove(req.params.user_id)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFoundUser())
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err: any) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJSON())
        }
    }

    /**
     * Method that parses entities from the model layer to JSON objects.
     * @param {User | Array<User> | undefined} entity
     * @private
     */
    private toJSONView(
        entity: User | Array<User> | undefined
    ): object {
        if (entity instanceof Array) return entity.map(item => this.toJSONView(item))
        return entity?.toJSON()
    }

    private getMessageNotFoundUser(): object {
        return new ApiException(
            HttpStatus.NOT_FOUND,
            'User not found!',
            'User not found or already removed. A new operation for the same resource is not required!'
        ).toJSON()
    }
}
