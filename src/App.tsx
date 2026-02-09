import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout/main-layout'
import { NotFoundPage } from './pages/error/not-found-page'
import { TestPage } from './pages/jeff/test-page'
import { MainPage } from './pages/main/main-page'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path='*' element={<Navigate to={'/not-found'} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
