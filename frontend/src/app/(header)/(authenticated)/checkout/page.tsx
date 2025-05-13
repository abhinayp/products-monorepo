import { Checkout, CheckoutProvider } from "@/components/Checkout"

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <Checkout />
    </CheckoutProvider>
  )
}
