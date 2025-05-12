import { useQuery } from '@tanstack/react-query'
import { homeClient } from '@/api-client/orders/home.client'

const useOrder = (id: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => homeClient.show({ id: parseInt(id || "") }),
    enabled: !!id,
  })

  const { data: statusHistory, isLoading: statusHistoryLoading, error: statusHistoryError } = useQuery({
    queryKey: ['status-history', id],
    queryFn: () => homeClient.statusHistory({ id: parseInt(id || "") }),
    enabled: !!id,
  })

  const order = data?.order
  const orderItems = data?.order_items
  const orderShipping = data?.order_shipping
  const orderContact = data?.order_contact
  const orderPayment = data?.order_payment

  return { order, orderItems, orderShipping, orderContact, orderPayment, statusHistory, isLoading, error, statusHistoryLoading, statusHistoryError }
}

export default useOrder
