/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 * @see Be careful not to put critical data in this file as it is not in .gitignore.
 * Sensitive data such as database, passwords and keys should be stored in secure locations.
 *
 * @abstract
 */
export abstract class Default {
    public static readonly APP_ID: string = 'base-template-ts.app'
    public static readonly APP_TITLE: string = 'Base Template TypeScript'
    public static readonly APP_DESCRIPTION: string = 'Basic model for implementation of microservices in TypeScript following principles of hexagonal and clean architecture proposed by Robert C. Martin'
    public static readonly NODE_ENV: string = 'development' // development, test, production
    public static readonly PORT_HTTP: number = 3000
    public static readonly PORT_HTTPS: number = 3001
    public static readonly SWAGGER_PATH: string = './src/ui/swagger/api_1.0.0.yaml'
    public static readonly LOGO_URI: string = 'https://i.imgur.com/O7PxGWQ.png'

    // MongoDB
    public static readonly MONGODB_URI: string = 'mongodb://127.0.0.1:27017/tamplete-base-ts'
    public static readonly MONGODB_URI_TEST: string = 'mongodb://127.0.0.1:27017/tamplete-base-ts-test'
    public static readonly MONGODB_ENABLE_TLS: boolean = false
    public static readonly MONGODB_CON_RETRY_COUNT: number = 0 // infinite
    public static readonly MONGODB_CON_RETRY_INTERVAL: number = 1000 // 1s

    // RabbitMQ
    public static readonly RABBITMQ_AMQP_URI: string = 'amqp://127.0.0.1:5672'
    public static readonly RABBITMQ_BROKER_NAME: string = 'template-base-ts'
    public static readonly RABBITMQ_QUEUE_NAME: string = 'task_queue'
    public static readonly RABBITMQ_CON_RETRY_COUNT: number = 0 // infinite
    public static readonly RABBITMQ_CON_RETRY_INTERVAL: number = 1000 // 1s

    // Log
    public static readonly LOG_DIR: string = 'logs'

    // JWT
    public static readonly JWT_SECRET: string = 's3cr3tk3y'
    public static readonly ISSUER: string = 'base'

    // ADMIN USER DEFAULT
    public static readonly ADMIN_EMAIL: string = 'admin@base.com'
    public static readonly ADMIN_PASSWORD: string = 'base123'

    // Certificate
    // To generate self-signed certificates, see: https://devcenter.heroku.com/articles/ssl-certificate-self
    public static readonly SSL_KEY_PATH: string = '.certs/server_key.pem'
    public static readonly SSL_CERT_PATH: string = '.certs/server_cert.pem'
    public static readonly RABBITMQ_CA_PATH: string = '.certs/ca.pem'

    // Tasks cron expressions.
    public static readonly EXP_LAST_HR_TASK: string = '*/10 * * * *'

    // Number of LastHeartRateUpdateTask iterations.
    public static readonly LAST_HR_TASK_ITERATIONS: number = 5

    // Dashboard Host
    public static readonly DASHBOARD_HOST: string = 'https://localhost:443'
}
