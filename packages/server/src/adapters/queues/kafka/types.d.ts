/**
 * Kafka queue config type.
 */
interface KafkaConfig extends QueueConfig {
  brokers: string[];
  type: "kafka";
}
