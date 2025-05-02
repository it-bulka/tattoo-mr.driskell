export type IdMap = Record<string, true>

export interface LikedIdsSchema {
  ids: IdMap
  confirmed: IdMap
  pendingAddIds: string[]
  pendingRemoveIds: string[]

  error: string | null
}