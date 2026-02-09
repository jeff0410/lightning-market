import { api, apiClient } from '../lib'
import type { ApiResponse } from '../types/api'

interface User {
  id: number
  name: string
  email: string
}

interface Product {
  id: number
  name: string
  price: number
}

export const exampleService = {
  async getUsers() {
    return api.get<ApiResponse<User[]>>('/users')
  },

  async createUser(data: Omit<User, 'id'>) {
    return api.post<ApiResponse<User>>('/users', data)
  },

  async updateUser(id: number, data: Partial<User>) {
    return api.put<ApiResponse<User>>(`/users/${id}`, data)
  },

  async patchUser(id: number, data: Partial<User>) {
    return api.patch<ApiResponse<User>>(`/users/${id}`, data)
  },

  async deleteUser(id: number) {
    return api.delete<ApiResponse<void>>(`/users/${id}`)
  },

  async getProducts() {
    return apiClient.get<Product[]>('/products')
  },

  async createProduct(data: Omit<Product, 'id'>) {
    return apiClient.post<Product>('/products', data)
  },

  async searchProducts(params: { keyword?: string; page?: number; size?: number }) {
    return api.get<ApiResponse<Product[]>>('/products/search', { params })
  },
}
