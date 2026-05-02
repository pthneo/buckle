/**
 * RabbitMQ queue config type.
 */
interface RabbitMQConfig extends QueueConfig {
  type: "rabbitmq";
  url: string;
}
