import { homeClient } from '@/api-client/orders/home.client'
import { useQuery } from '@tanstack/react-query'

const useOrders = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () => homeClient.index(),
  })

  return {
    orders: data,
    isLoading,
    error,
  }
}

export default useOrders
