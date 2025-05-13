import { Item } from '@/components/Cart'
import { CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatToDollars } from '@/helpers/common.helper'
import { useCheckout } from '../CheckoutContext'

const OrderDetails = () => {
  const { cartData } = useCheckout()

  const subtotal = Number(cartData?.cart_metadata?.gross_total_price) || 0
  const tax = Number(cartData?.cart_metadata?.tax)
  const total = Number(cartData?.cart_metadata?.net_total_price) || 0

  return (
    <CardContent className="space-y-4">
      {cartData?.cart?.map((item) => (
        <Item
          key={item.id}
          item={item}
          className="px-0"
        />
      ))}

      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatToDollars(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatToDollars(tax)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between font-medium text-lg">
        <span>Total</span>
        <span>{formatToDollars(total)}</span>
      </div>
    </CardContent>
  )
}

OrderDetails.Skeleton = () => (
  <CardContent className="space-y-4">
    <div className="space-y-4">
      <Item.Skeleton />
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
      </div>

      <div className="h-px bg-muted" />

      <div className="flex justify-between">
        <div className="h-6 w-20 bg-muted rounded animate-pulse" />
        <div className="h-6 w-20 bg-muted rounded animate-pulse" />
      </div>
    </div>
  </CardContent>
)
export default OrderDetails
