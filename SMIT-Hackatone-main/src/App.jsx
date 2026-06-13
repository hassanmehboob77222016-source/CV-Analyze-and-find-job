import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const [appState, setAppState] = useState({
    fileName: '',
    cvText: '',
    cvPreview: '',
    cvProfile: null,
    jobs: [],
    searchQueries: [],
    totalFound: 0,
  })

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage appState={appState} setAppState={setAppState} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
