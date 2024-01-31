import { User } from '../../application/domain/model/user'

export class ActivityEntity {
    private _id?: string
    private _name?: string
    private _start_time?: Date
    private _end_time?: Date
    private _duration?: number
    private _max_intensity?: string
    private _max_intensity_duration?: number
    private _calories?: number
    private _steps?: number
    private _user?: User

    get id(): string | undefined {
        return this._id
    }

    set id(value: string) {
        this._id = value
    }

    get name(): string | undefined {
        return this._name
    }

    set name(value: string) {
        this._name = value
    }

    get start_time(): Date | undefined {
        return this._start_time
    }

    set start_time(value: Date) {
        this._start_time = value
    }

    get end_time(): Date | undefined {
        return this._end_time
    }

    set end_time(value: Date) {
        this._end_time = value
    }

    get duration(): number | undefined {
        return this._duration
    }

    set duration(value: number) {
        this._duration = value
    }

    get max_intensity(): string | undefined {
        return this._max_intensity
    }

    set max_intensity(value: string) {
        this._max_intensity = value
    }

    get max_intensity_duration(): number | undefined {
        return this._max_intensity_duration
    }

    set max_intensity_duration(value: number) {
        this._max_intensity_duration = value
    }

    get calories(): number | undefined {
        return this._calories
    }

    set calories(value: number) {
        this._calories = value
    }

    get steps(): number | undefined {
        return this._steps
    }

    set steps(value: number) {
        this._steps = value
    }

    get user(): User | undefined {
        return this._user
    }

    set user(value: User) {
        this._user = value
    }
}
