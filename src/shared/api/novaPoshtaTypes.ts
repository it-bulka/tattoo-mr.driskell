export interface NPApiRequest {
  apiKey: string
  modelName: string
  calledMethod: string
  methodProperties: Record<string, string>
}

export interface NPCity {
  Ref: string
  MainDescription: string
  Present: string
  Area: string
  Region: string
  SettlementTypeCode: string
  DeliveryCity: string
  Warehouses: number
}

export interface NPWarehouse {
  Ref: string
  Description: string
  Number: string
  TypeOfWarehouse: string
}

export interface NPApiResponse<T> {
  success: boolean
  data: T[]
  errors: string[]
}

export interface NPSettlementAddress {
  Ref: string
  SettlementTypeCode: string
  Description: string
  DescriptionRu: string
  Addresses: NPCity[]
}
