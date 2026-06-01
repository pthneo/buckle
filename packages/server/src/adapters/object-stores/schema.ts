import { z } from "zod";
import { minioConfigSchema } from "./minio/schema";
import { r2ConfigSchema } from "./r2/schema";
import { s3ConfigSchema } from "./s3/schema";

/**
 * Used to parse the object storage config
 */
export const objectStorageConfigSchema = z.discriminatedUnion("type", [
  s3ConfigSchema,
  r2ConfigSchema,
  minioConfigSchema,
]);
