import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'
import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'
import { ChallengeDay } from './pages/ChallengeDay'
import { IntroAnimation } from './components/IntroAnimation'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppRoutes() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return true
    if (sessionStorage.getItem('abtalks:intro-shown')) return true
    // Only show the branded intro when landing on the home page —
    // navigating directly to /dashboard or /day/* skips it.
    if (window.location.pathname !== '/') return true
    sessionStorage.setItem('abtalks:intro-shown', '1')
    return false
  })

  return (
    <>
      {!introDone && <IntroAnimation onDone={() => setIntroDone(true)} />}
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/day/:id"
          element={
            <Layout>
              <ChallengeDay />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}
