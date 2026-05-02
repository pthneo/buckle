/**
 * Generic object storage config type.
 */
interface ObjectStorageConfig extends ServiceConfig {
  type: "s3" | "r2" | "minio";
}
