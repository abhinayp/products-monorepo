"use client"

import { useCheckout } from "./CheckoutContext"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function FormValidationStatus() {
  const { isShippingFormValid, isPaymentFormValid, isFormValid } = useCheckout()

  if (isFormValid) {
    return (
      <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertDescription>All required information has been provided.</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {!isShippingFormValid && !isPaymentFormValid
          ? "Please complete both shipping and payment information."
          : !isShippingFormValid
            ? "Please complete all required shipping information."
            : "Please complete all required payment information."}
      </AlertDescription>
    </Alert>
  )
}
