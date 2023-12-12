export const applyV1toV2Migration = (data: any): any => {
  // Migration logic from version 1 to version 2
  // Add default values for new properties introduced in version 2
  const migratedData = {
    ...data,
    version: 2,
    created_at: 'some_date'
  }

  return migratedData
}
