import { z } from "zod";

/**
 * Used to parse the RabbitMQ queue config
 *
 * Matches the {@link RabbitMQConfig} type
 */
export const rabbitmqConfigSchema = z.object({
  name: z.string(),
  type: z.literal("rabbitmq"),
  url: z.string()
});
