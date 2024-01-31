import { inject, injectable } from 'inversify'
import { IBackgroundTask } from '../../application/port/background.task.interface'
import { Identifier } from '../../di/identifiers'
import { IConnectionDB } from '../../infrastructure/port/connection.db.interface'


@injectable()
export class RegisterTask implements IBackgroundTask {

    constructor(
        @inject(Identifier.MONGODB_CONNECTION) private readonly _mongodb: IConnectionDB    ) {
    }

    public async run(): Promise<void> {
        this._mongodb.eventConnection.on('connected', async () => {
            await this.register()
        })
    }

    private async register(): Promise<void> {
        // Implementation of the task to be registered
    }
    public stop(): Promise<void> {
        return Promise.resolve()
    }
}
