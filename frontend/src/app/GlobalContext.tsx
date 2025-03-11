'use client'

import { userClient } from '@/api-client/accounts/user.client'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useState, ReactNode, useMemo } from 'react'

type User = {
  id: number
  email: string
  firstname: string
  lastname: string
  phone: string
}

interface GlobalContextType {
  currentUser: User | null | undefined
  currentUserLoading: boolean
  isAuthenticated: boolean
  refetchCurrentUser: () => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export function useGlobal() {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider')
  }
  return context
}

interface GlobalProviderProps {
  children: ReactNode
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const { data: user, isLoading, isSuccess, refetch: refetchCurrentUser } = useQuery({
    queryKey: ['user'],
    queryFn: () => userClient.me(),
  })

  const currentUser = useMemo(() => {
    if (user && 'error' in user) {
      return null
    }
    return user
  }, [user])

  const value = {
    currentUser,
    currentUserLoading: isLoading,
    isAuthenticated: !!currentUser,
    refetchCurrentUser,
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}
