"use client"

import { authClient } from "@/api-client/accounts/auth.client"
import { useGlobal } from "@/app/GlobalContext"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Page = () => {
  const router = useRouter()
  const { refetchCurrentUser } = useGlobal()
  const { mutate: logout } = useMutation({
    mutationFn: () => authClient.logout(),
    onSuccess: () => {
      router.push("/")
      refetchCurrentUser()
    },
  })

  useEffect(() => {
    logout()
  }, [])

  return (
    <Container centerOnPage>
      <Card>
        <CardHeader>
          <CardTitle>Logging out...</CardTitle>
        </CardHeader>
      </Card>
    </Container>
  )
}

export default Page
