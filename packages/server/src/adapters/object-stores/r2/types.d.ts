/**
 * R2 object storage config type.
 */
interface R2Config extends ObjectStorageConfig {
  accessKeyId: string;
  accountId: string;
  bucket?: string;
  region?: string;
  secretAccessKey: string;
  type: "r2";
}
