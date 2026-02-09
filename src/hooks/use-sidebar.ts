import { useState } from 'react'

export const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggle = () => {
    setIsExpanded((prev) => !prev)
  }

  return {
    isExpanded,
    toggle,
  }
}
