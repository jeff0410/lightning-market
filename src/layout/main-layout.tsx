import { Outlet } from 'react-router-dom'
import { useSidebar } from '../hooks/use-sidebar'
import { Sidebar } from './sidebar'

export function MainLayout() {
  const { isExpanded, toggle } = useSidebar()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isExpanded={isExpanded} onToggle={toggle} />

      <main
        className={`
          flex-1 overflow-auto transition-all duration-300 ease-in-out
          ${isExpanded ? 'ml-64' : 'ml-16'}
        `}
      >
        <Outlet />
      </main>
    </div>
  )
}
