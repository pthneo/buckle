import { z } from "zod";
import { kafkaConfigSchema } from "./kafka/schema";
import { rabbitmqConfigSchema } from "./rabbitmq/schema";
import { redisQueueConfigSchema } from "./redis/schema";
import { sqsConfigSchema } from "./sqs/schema";

/**
 * Used to parse the queue config
 */
export const queueConfigSchema = z.discriminatedUnion("type", [
  redisQueueConfigSchema,
  sqsConfigSchema,
  rabbitmqConfigSchema,
  kafkaConfigSchema,
]);
