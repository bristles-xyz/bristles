export type SetterWithHistory<T> = (action: T[] | ((prev: T[]) => T[]), overwrite: boolean) => ObjectWithHistory<T>

export interface ObjectWithHistory<T> {
  history: T[][]
  index: number
}
