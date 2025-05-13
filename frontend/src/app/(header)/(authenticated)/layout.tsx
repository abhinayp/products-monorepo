"use client"
import { useGlobal } from '@/app/GlobalContext'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, currentUserLoading } = useGlobal()
  const router = useRouter()
  const [ctaClicked, setCtaClicked] = useState(false)

  const handleCtaClick = () => {
    setCtaClicked(true)
    router.push('/login')
  }

  if (currentUserLoading) {
    return (
      <Container centerOnPage>
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </Container>
    )
  }

  if (currentUser) {
    return children
  }

  return (
    <Container centerOnPage>
      <Card>
        <CardHeader>
          <CardTitle>You are not logged in, please login to continue</CardTitle>
          <CardDescription className='text-center mt-4'>
            <Button variant="outline" onClick={handleCtaClick} disabled={ctaClicked}>
              {ctaClicked ? 'Redirecting...' : 'Login'}
            </Button>
          </CardDescription>
        </CardHeader>
      </Card>
    </Container>
  )
}

export default Layout
