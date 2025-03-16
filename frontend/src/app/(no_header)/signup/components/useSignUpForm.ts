import { userClient } from "@/api-client/accounts/user.client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const useSignUpForm = () => {
  const router = useRouter()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutateAsync: createUser, isPending, isSuccess, isError, reset, data: createUserData } = useMutation({
    mutationFn: () => userClient.create(
      { user: { firstname, lastname, phone, email, password } }
    )
  })

  const data = {
    firstname,
    lastname,
    phone,
    email,
    password,
  }

  const setData = (key: keyof typeof data, value: string) => {
    reset()

    switch (key) {
      case 'firstname':
        setFirstname(value)
        break;
      case 'lastname':
        setLastname(value)
        break;
      case 'phone':
        setPhone(value)
        break;
      case 'email':
        setEmail(value)
        break;
      case 'password':
        setPassword(value)
        break;
      default:
        break;
    }
  }


  const isUserCreated = createUserData && !("error" in createUserData)
  const disabled = isPending || isUserCreated
  const isLoading = isPending || isUserCreated
  const createError = createUserData && 'error' in createUserData ? createUserData.error : null
  const error = isError ? 'Something went wrong, please try again.' : createError

  useEffect(() => {
    if (createUserData && "error" in createUserData) {
      return
    }

    if (isSuccess) {
      router.push('/')
    }
  }, [router, isSuccess, createUserData])

  const handleSubmit = () => {
    createUser()
  }

  return { data, setData, handleSubmit, disabled, isLoading, error }
}

export default useSignUpForm
