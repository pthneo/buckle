import { z } from "zod";

/**
 * Used to parse the R2 object storage config
 *
 * Matches the {@link R2Config} type
 */
export const r2ConfigSchema = z.object({
  accessKeyId: z.string(),
  accountId: z.string(),
  bucket: z.string().optional(),
  name: z.string(),
  region: z.string().optional(),
  secretAccessKey: z.string(),
  type: z.literal("r2")
});
