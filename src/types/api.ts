export interface ApiResponse<T = any> {
  data: T
  message?: string
  code?: string
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}

export interface PaginationParams {
  page?: number
  size?: number
  sort?: string
}

export interface PaginationResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
