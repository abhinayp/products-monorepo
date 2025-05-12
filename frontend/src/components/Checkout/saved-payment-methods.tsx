"use client"

import { CreditCard, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useCheckout } from "./CheckoutContext"
import { useState } from "react"

export default function SavedPaymentMethods() {
  const { savedPaymentMethods, paymentData, selectPaymentMethod, deletePaymentMethod } = useCheckout()

  const [deleteId, setDeleteId] = useState<string | null>(null)

  const getCardBackground = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "bg-blue-50"
      case "mastercard":
        return "bg-red-50"
      case "amex":
        return "bg-green-50"
      case "discover":
        return "bg-yellow-50"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Saved Payment Methods</h3>

      <div className="space-y-3">
        {savedPaymentMethods.map((method) => (
          <div
            key={method.id}
            className={`relative border rounded-lg p-4 transition-all ${
              paymentData.selectedPaymentMethodId === method.id
                ? "border-primary ring-1 ring-primary"
                : "border-border hover:border-primary/50"
            } ${getCardBackground(method.cardBrand)}`}
            onClick={() => selectPaymentMethod(method.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">
                    {method.cardBrand.charAt(0).toUpperCase() + method.cardBrand.slice(1)} •••• {method.cardNumber.slice(-4)}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires {method.expiryDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {method.isDefault && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Default
                  </span>
                )}

                <AlertDialog open={deleteId === method.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteId(method.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove card</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove this payment method? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.stopPropagation()
                          deletePaymentMethod(method.id)
                        }}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {paymentData.selectedPaymentMethodId === method.id && (
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 h-3 w-3 rounded-full bg-primary" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
