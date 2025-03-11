import { authClient } from "@/api-client/accounts/auth.client"
import { useMutation } from "@tanstack/react-query"
import { KeyboardEvent, KeyboardEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const useLoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { mutate: login, isPending, isSuccess, isError, reset } = useMutation({
    mutationFn: ({ email, password }: { email: string, password: string }) => authClient.authorize({ email, password }),
    onSuccess: () => {
      router.push("/")
    },
  })
  const disabled = isPending || isSuccess

  useEffect(() => {
    if (isError) {
      reset()
    }
  }, [email, password])


  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    await login({ email, password })
  }

  return {
    email,
    password,
    handleSubmit,
    isPending,
    isSuccess,
    isError,
    setEmail,
    setPassword,
    disabled,
    onKeyDown,
  }
}
export default useLoginForm
