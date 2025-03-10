import React from 'react'
import { useGlobal } from '@/app/GlobalContext'
import LoggedIn from './LoggedIn'
import NotLoggedIn from './NotLoggedIn'

const CTA = () => {
  const { currentUser, currentUserLoading } = useGlobal()

  if (currentUserLoading) return null

  if (currentUser) {
    return <LoggedIn />
  }

  return <NotLoggedIn />
}

export default CTA
