import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotLoggedIn = () => {
  return (
    <>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/login">
          Sign in
        </Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/signup">
          Sign up
        </Link>
      </Button>
    </>
  )
}

export default NotLoggedIn
