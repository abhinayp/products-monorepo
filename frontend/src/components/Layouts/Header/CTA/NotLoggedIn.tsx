import { Button } from '@/components/ui/button'
import React from 'react'

const NotLoggedIn = () => {
  return (
    <>
      <Button variant="ghost" size="sm" asChild>
        <a href="/login">
          Sign in
        </a>
      </Button>
      <Button size="sm" asChild>
        <a href="/signup">
          Sign up
        </a>
      </Button>
    </>
  )
}

export default NotLoggedIn
