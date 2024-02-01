export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')
    public static readonly USER_CONTROLLER: any = Symbol.for('UserController')
    public static readonly ACTIVITY_CONTROLLER: any = Symbol.for('ActivityController')

    // Services
    public static readonly USER_SERVICE: any = Symbol.for('UserService')
    public static readonly ACTIVITY_SERVICE: any = Symbol.for('ActivityService')

    // Repositories
    public static readonly INTEGRATION_EVENT_REPOSITORY: any = Symbol.for('IntegrationEventRepository')
    public static readonly USER_REPOSITORY: any = Symbol.for('UserRepository')
    public static readonly ACTIVITY_REPOSITORY: any = Symbol.for('ActivityRepository')

    // Models
    public static readonly INTEGRATION_EVENT_REPO_MODEL: any = Symbol.for('IntegrationEventRepoModel')
    public static readonly USER_REPO_MODEL: any = Symbol.for('UserRepoModel')
    public static readonly ACTIVITY_REPO_MODEL: any = Symbol.for('ActivityRepoModel')
    public static readonly USER_ENTITY: any = Symbol.for('UserEntity')
    public static readonly ACTIVITY_ENTITY: any = Symbol.for('ActivityEntity')

    // Mappers
    public static readonly USER_ENTITY_MAPPER: any = Symbol.for('UserEntityMapper')
    public static readonly ACTIVITY_ENTITY_MAPPER: any = Symbol.for('ActivityEntityMapper')

    // Background Services
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('ConnectionFactoryMongodb')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('ConnectionMongodb')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')
    public static readonly RABBITMQ_EVENT_BUS: any = Symbol.for('EventBusRabbitMQ')
    public static readonly RABBITMQ_CONNECTION_FACTORY: any = Symbol.for('RabbitMQConnectionFactory')
    public static readonly RABBITMQ_CONNECTION: any = Symbol.for('RabbitMQConnection')

    // Tasks
    public static readonly REGISTER_SETTINGS_TASK: any = Symbol.for('RegisterSettingsTask')
    public static readonly PUBLISH_EVENT_BUS_TASK: any = Symbol.for('PublishEventBusTask')
    public static readonly SUBSCRIBE_EVENT_BUS_TASK: any = Symbol.for('SubscribeEventBusTask')
    public static readonly RPC_SERVER_EVENT_BUS_TASK: any = Symbol.for('RpcServerEventBusTask')

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
