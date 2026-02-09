# API 사용 가이드

## 기본 사용법

### 1. 직접 api 사용

```typescript
import { api } from '@/lib'

// GET 요청
const response = await api.get('/users')

// GET 요청 (쿼리 파라미터 포함)
const response = await api.get('/users', {
  params: { page: 1, size: 10 }
})

// POST 요청
const response = await api.post('/users', {
  name: 'John',
  email: 'john@example.com'
})

// PUT 요청
const response = await api.put('/users/1', {
  name: 'Jane'
})

// PATCH 요청
const response = await api.patch('/users/1', {
  email: 'jane@example.com'
})

// DELETE 요청
const response = await api.delete('/users/1')
```

### 2. apiClient 사용 (래핑된 버전)

```typescript
import { apiClient } from '@/lib'

// GET 요청
const data = await apiClient.get<User[]>('/users')

// POST 요청
const data = await apiClient.post<User>('/users', {
  name: 'John',
  email: 'john@example.com'
})
```

### 3. Service 레이어에서 사용

```typescript
// src/services/user.service.ts
import { api } from '@/lib'
import type { ApiResponse } from '@/types/api'

interface User {
  id: number
  name: string
  email: string
}

export const userService = {
  async getUsers() {
    return api.get<ApiResponse<User[]>>('/users')
  },

  async createUser(data: Omit<User, 'id'>) {
    return api.post<ApiResponse<User>>('/users', data)
  },

  async updateUser(id: number, data: Partial<User>) {
    return api.put<ApiResponse<User>>(`/users/${id}`, data)
  },

  async deleteUser(id: number) {
    return api.delete(`/users/${id}`)
  },
}
```

### 4. Hook에서 사용

```typescript
// src/hooks/use-users.ts
import { useState } from 'react'
import { userService } from '@/services/user.service'

export const useUsers = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await userService.getUsers()
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, fetchUsers }
}
```

### 5. 컴포넌트에서 사용

```typescript
import { useEffect, useState } from 'react'
import { useUsers } from '@/hooks/use-users'

export function UserList() {
  const [users, setUsers] = useState([])
  const { loading, error, fetchUsers } = useUsers()

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers()
      setUsers(data)
    }
    loadUsers()
  }, [])

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error}</div>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

## 인터셉터 기능

### Request 인터셉터
- **Authorization 헤더**: localStorage에서 토큰을 자동으로 가져와 `Bearer ${token}` 형식으로 추가
- **Accept-Language 헤더**: localStorage에서 언어 설정을 가져와 자동으로 추가
- **GET 파라미터 정리**: null, undefined, 빈 문자열을 자동으로 제거
- **배열 파라미터**: 배열을 올바르게 직렬화하여 전송

### Response 인터셉터
- **401 에러 처리**: 인증 실패 시 자동으로 로그인 페이지로 리다이렉트
- **스토리지 정리**: 401 에러 시 토큰을 자동으로 삭제

## 스토리지 유틸리티

```typescript
import { 
  getToken, 
  setToken, 
  clearAuthStorage,
  getLanguage,
  setLanguage 
} from '@/lib'

// 토큰 저장
setToken('your_access_token')

// 토큰 가져오기
const token = getToken()

// 인증 정보 삭제
clearAuthStorage()

// 언어 설정
setLanguage('ko')
const language = getLanguage()
```

## 타입 정의

```typescript
// API 응답 타입
interface ApiResponse<T = any> {
  data: T
  message?: string
  code?: string
}

// API 에러 타입
interface ApiError {
  message: string
  code?: string
  status?: number
}

// 페이지네이션 파라미터
interface PaginationParams {
  page?: number
  size?: number
  sort?: string
}

// 페이지네이션 응답
interface PaginationResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
```
