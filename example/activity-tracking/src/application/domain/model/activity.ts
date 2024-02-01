import { Entity } from './entity'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { User } from './user'
import { JsonUtils } from '../utils/json.utils'

/**
 * Implementation of activity entity
 *
 * @extends {Entity}
 * @implements {IJSONSerializable, IJSONDeserializable<Activity>}
 */
export class Activity extends Entity implements IJSONSerializable, IJSONDeserializable<Activity> {
    private _name?: string | undefined
    private _start_time?: Date | undefined
    private _end_time?: Date | undefined
    private _duration?: number | undefined
    private _max_intensity?: string | undefined
    private _max_intensity_duration?: number | undefined
    private _calories?: number | undefined
    private _steps?: number | undefined
    private _user!: User | undefined

    constructor(id?: string, created_at?: string, updated_at?: string) {
        super(id, created_at, updated_at)
    }

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }

    get start_time(): Date | undefined {
        return this._start_time
    }

    set start_time(value: Date | undefined) {
        this._start_time = value
    }

    get end_time(): Date | undefined {
        return this._end_time
    }

    set end_time(value: Date | undefined) {
        this._end_time = value
    }

    get duration(): number | undefined {
        return this._duration
    }

    set duration(value: number | undefined) {
        this._duration = value
    }

    get max_intensity(): string | undefined {
        return this._max_intensity
    }

    set max_intensity(value: string | undefined) {
        this._max_intensity = value
    }

    get max_intensity_duration(): number | undefined {
        return this._max_intensity_duration
    }

    set max_intensity_duration(value: number | undefined) {
        this._max_intensity_duration = value
    }

    get calories(): number | undefined {
        return this._calories
    }

    set calories(value: number | undefined) {
        this._calories = value
    }

    get steps(): number | undefined {
        return this._steps
    }

    set steps(value: number | undefined) {
        this._steps = value
    }

    get user(): User | undefined {
        return this._user
    }

    set user(value: User | undefined) {
        this._user = value
    }

    public fromJSON(json: any): Activity {
        if (!json) {
            return this
        }

        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.id !== undefined) this.id = json.id
        if (json.name !== undefined) this.name = json.name
        if (json.start_time !== undefined) this.start_time = json.start_time
        if (json.end_time !== undefined) this.end_time = json.end_time
        if (json.duration !== undefined) this.duration = json.duration
        if (json.max_intensity !== undefined) this.max_intensity = json.max_intensity
        if (json.max_intensity_duration !== undefined) this.max_intensity_duration = json.max_intensity_duration
        if (json.calories !== undefined) this.calories = json.calories
        if (json.steps !== undefined) this.steps = json.steps
        if (json.user !== undefined) this.user = json.user

        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            created_at: super.created_at,
            updated_at: super.updated_at,
            name: this.name || undefined,
            start_time: this.start_time || undefined,
            end_time: this.end_time || undefined,
            duration: this.duration || undefined,
            max_intensity: this.max_intensity || undefined,
            max_intensity_duration: this.max_intensity_duration || undefined,
            calories: this.calories || undefined,
            steps: this.steps || undefined,
            user: this.user || undefined,
        }
    }
}
