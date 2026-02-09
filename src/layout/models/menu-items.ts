import type { LucideIcon } from 'lucide-react'
import { Home, TestTube, User } from 'lucide-react'

export interface MenuItem {
  id: string
  label: string
  path: string
  icon: LucideIcon
}

export const menuItems: MenuItem[] = [
  {
    id: 'main',
    label: '메인페이지',
    path: '/',
    icon: Home,
  },
  {
    id: 'jeff',
    label: 'Jeff',
    path: '/test',
    icon: User,
  },
  {
    id: 'test',
    label: '테스트',
    path: '/test2',
    icon: TestTube,
  },
]
