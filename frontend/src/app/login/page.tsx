"use client"
import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/app/login/components/LoginForm"
import Image from "next/image"
import LoginPoster from "../../../public/login_poster.jpg"
import { userClient } from "@/api-client/accounts/user.client"
import { useQuery } from "@tanstack/react-query"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
  const router = useRouter()
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => userClient.me(),
    retry: false,
  })

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  if (isLoading || user) {
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

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Shoppers Avenue
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={LoginPoster}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
