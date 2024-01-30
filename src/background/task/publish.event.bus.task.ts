import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IEventBus } from '../../infrastructure/port/event.bus.interface'
import { IBackgroundTask } from '../../application/port/background.task.interface'

@injectable()
export class PublishEventBusTask implements IBackgroundTask {
    constructor(
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus    ) {
    }

    public run(): void {
        this.internalPublishSavedEvents().then()
    }

    public async stop(): Promise<void> {
        try {
            await this._eventBus.dispose()
        } catch (err: any) {
            return Promise.reject(new Error(`Error stopping PublishEventBusTask! ${err.message}`))
        }
    }

    private async internalPublishSavedEvents(): Promise<void> {
        if (!this._eventBus.connectionPub.isOpen) return

    }
}
