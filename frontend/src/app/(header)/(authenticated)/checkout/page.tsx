import { OrderSummary, PaymentForm, CheckoutProvider } from "@/components/Checkout"

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PaymentForm />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  )
}
