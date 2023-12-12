import { applyV1toV2Migration } from './v1-to-v2'

export const applyMigration = (data: any, fromVersion: number): any => {
  if (fromVersion <= 1) {
    return applyV1toV2Migration(data)
  }
  // if (fromVersion <= 1) {
  //  return applyV1toV2Migration(data)
  //}
  throw new Error(`No migration path from ${fromVersion} for Rectangle.`)
}
