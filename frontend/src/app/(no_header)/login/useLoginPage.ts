import { useGlobal } from '@/app/GlobalContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useLoginPage = () => {
  const router = useRouter()
  const { currentUser, currentUserLoading } = useGlobal()

  useEffect(() => {
    if (currentUser) {
      router.push('/')
    }
  }, [currentUser])

  return {
    currentUser,
    currentUserLoading,
  }
}

export default useLoginPage
