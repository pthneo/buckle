import { z } from "zod";

/**
 * Used to parse the Kafka queue config
 *
 * Matches the {@link KafkaConfig} type
 */
export const kafkaConfigSchema = z.object({
  brokers: z.array(z.string()),
  name: z.string(),
  type: z.literal("kafka"),
});
