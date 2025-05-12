import { useQuery } from '@tanstack/react-query'
import { homeClient } from '@/api-client/orders/home.client'
import useWebsockets from '@/hooks/useWebsockets'
import { useEffect } from 'react'

const useOrder = (id: string | undefined) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['order', id],
    queryFn: () => homeClient.show({ id: parseInt(id || "") }),
    enabled: !!id,
  })

  // Websocket to update real-time product metrics
  const orderWebsocket = useWebsockets({
    path: "/orders",
    managerOptions: {
      query: {
        rooms: [id]
      }
    }
  })


  useEffect(() => {
    orderWebsocket.socket?.current?.on("update", ({ order_id }: {
      order_id: number
    }) => {
      console.log(`updating order... ${order_id}`);
      refetch()
    })

    return () => {
      orderWebsocket.socket?.current?.off("update")
    }
  }, [orderWebsocket])

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
