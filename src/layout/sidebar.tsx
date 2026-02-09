import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { menuItems } from './models/menu-items'

interface SidebarProps {
  isExpanded: boolean
  onToggle: () => void
}

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out z-50
        ${isExpanded ? 'w-64' : 'w-16'}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isExpanded && (
            <h2 className="text-lg font-semibold text-gray-800">메뉴</h2>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors ml-auto"
            aria-label={isExpanded ? '사이드바 접기' : '사이드바 펼치기'}
          >
            {isExpanded ? (
              <ChevronLeft size={20} className="text-gray-600" />
            ) : (
              <ChevronRight size={20} className="text-gray-600" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg
                      transition-colors duration-200
                      ${isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                      ${!isExpanded && 'justify-center'}
                    `}
                  >
                    <Icon size={20} className="shrink-0" />
                    {isExpanded && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
