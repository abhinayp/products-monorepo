import { StatusHistoryDTO } from '@/api-client/orders/dto/home.dto'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { AlertCircle, CheckCircle } from 'lucide-react'
import React from 'react'

const OrderTimeline = ({ timeline, isLoading }: { timeline: StatusHistoryDTO['response'], isLoading: boolean}) => {

  const descriptionMapper: Record<string, string> = {
    pending: 'Your order has been received',
    payment_failed: 'Your payment has failed',
    completed: 'Payment has been processed successfully',
    cancelled: 'Your order has been cancelled',
    shipped: 'Your order has been shipped via UPS',
    delivered: 'Your package has been delivered',
  }

  if (isLoading) {
    return <OrderTimeline.Skeleton />
  }

  return (
    <Card>
    <CardHeader>
      <CardTitle>Order Timeline</CardTitle>
    </CardHeader>
    <CardContent>
      <ol className="relative border-l border-muted">
        {timeline.map((event, index) => (
          <li key={index} className="mb-6 ml-6 last:mb-0">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -left-3 ring-8 ring-background">
              <OrderTimelineEventIcon status={event.status} isLast={index === timeline.length - 1} />
            </span>
            <h3 className="font-medium capitalize">{event.status?.replace('_', ' ')}</h3>
            <time className="block text-xs text-muted-foreground mb-1">
              {format(new Date(event.created_at), 'MMM d, yyyy h:mm a')}
            </time>
            <p className="text-sm text-muted-foreground">{descriptionMapper[event.status]}</p>
          </li>
        ))}
      </ol>
    </CardContent>
  </Card>
  )
}

OrderTimeline.Skeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-muted">
          {[...Array(3)].map((_, index) => (
            <li key={index} className="mb-6 ml-6 last:mb-0">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -left-3 ring-8 ring-background">
                <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse"></div>
              </span>
              <div className="h-4 w-24 bg-muted/50 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-32 bg-muted/50 rounded animate-pulse mb-1"></div>
              <div className="h-3 w-48 bg-muted/50 rounded animate-pulse"></div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

const OrderTimelineEventIcon = ({ status, isLast }: { status: string, isLast: boolean }) => {
  if (['cancelled', 'payment_failed'].includes(status) && isLast) {
    return (
      <AlertCircle className="w-3 h-3 text-red-500" />
    )
  }
  else if (isLast) {
    return (
      <CheckCircle className="w-3 h-3 text-green-500" />
    )
  }
  return (
    <div className="w-2 h-2 bg-primary rounded-full"></div>
  )
}

export default OrderTimeline
