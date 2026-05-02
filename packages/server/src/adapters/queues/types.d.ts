/**
 * Generic queue config type.
 */
interface QueueConfig extends ServiceConfig {
  type: "redis" | "sqs" | "rabbitmq" | "kafka";
}
