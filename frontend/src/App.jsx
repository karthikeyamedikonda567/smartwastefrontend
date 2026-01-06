import { Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './context/authStore'

// Layouts
import { DashboardLayout } from './components/layouts'

// Pages
import { 
  Dashboard, 
  Bins, 
  Scheduling, 
  Analytics,
  Collections,
  Waste,
  Inventory,
  Billing,
  Notifications,
  Requests,
  Reports,
  Recycling,
  Settings,
  Login,
  Register
} from './pages'

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Public Route Wrapper (redirects authenticated users)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={
        <PublicRoute><Login /></PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute><Register /></PublicRoute>
      } />
      
      {/* Dashboard Routes */}
      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bins" element={<Bins />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/waste" element={<Waste />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/recycling" element={<Recycling />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      
      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
