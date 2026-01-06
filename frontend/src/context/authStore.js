import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setTokens: ({ access, refresh }) => set({ 
        accessToken: access, 
        refreshToken: refresh,
        isAuthenticated: true 
      }),
      
      login: async (credentials) => {
        set({ isLoading: true })
        try {
          // API call would go here
          const response = await fetch('/api/auth/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })
          
          if (!response.ok) throw new Error('Invalid credentials')
          
          const data = await response.json()
          set({
            accessToken: data.access,
            refreshToken: data.refresh,
            isAuthenticated: true,
            isLoading: false,
          })
          
          // Fetch user profile
          const userResponse = await fetch('/api/users/me/', {
            headers: { 'Authorization': `Bearer ${data.access}` },
          })
          
          if (userResponse.ok) {
            const user = await userResponse.json()
            set({ user })
          }
          
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },
      
      logout: () => set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      }),
      
      refreshAccessToken: async () => {
        const { refreshToken } = get()
        if (!refreshToken) return false
        
        try {
          const response = await fetch('/api/auth/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          })
          
          if (!response.ok) throw new Error('Token refresh failed')
          
          const data = await response.json()
          set({ accessToken: data.access })
          return true
        } catch (error) {
          get().logout()
          return false
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export default useAuthStore
