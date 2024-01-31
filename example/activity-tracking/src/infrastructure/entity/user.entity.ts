export class UserEntity {
    private _id?: string
    private _name?: string
    private _email?: string


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

    get email(): string | undefined {
        return this._email
    }

    set email(value: string) {
        this._email = value
    }
}
