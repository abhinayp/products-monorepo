"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define types for our form data
export interface ShippingFormData {
  firstName: string
  lastName: string
  email: string
  address: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  sameAsBilling: boolean
  shippingMethod: "standard" | "express"
}

export interface PaymentFormData {
  paymentType: "card" | "paypal" | "apple"
  selectedPaymentMethodId: string | null
  cardNumber: string
  expiryDate: string
  cvc: string
  nameOnCard: string
  saveCard: boolean
}

export interface SavedPaymentMethod {
  id: string
  cardBrand: string
  last4: string
  expiryMonth: string
  expiryYear: string
  cardholderName: string
  isDefault: boolean
}

interface CheckoutContextType {
  // Form data
  shippingData: ShippingFormData
  paymentData: PaymentFormData

  // Saved payment methods
  savedPaymentMethods: SavedPaymentMethod[]

  // UI state
  showNewCardForm: boolean
  isSubmitting: boolean

  // Form handlers
  updateShippingData: (data: Partial<ShippingFormData>) => void
  updatePaymentData: (data: Partial<PaymentFormData>) => void
  setShowNewCardForm: (show: boolean) => void

  // Payment method handlers
  selectPaymentMethod: (id: string) => void
  deletePaymentMethod: (id: string) => void

  // Form submission
  handleSubmitOrder: (e: React.FormEvent) => void
}

// Create the context with a default undefined value
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

// Mock saved payment methods
const defaultSavedPaymentMethods = [
  {
    id: "pm_1",
    cardBrand: "visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2026",
    cardholderName: "John Doe",
    isDefault: true,
  },
  {
    id: "pm_2",
    cardBrand: "mastercard",
    last4: "5555",
    expiryMonth: "08",
    expiryYear: "2025",
    cardholderName: "John Doe",
    isDefault: false,
  },
]

// Provider component
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  // Shipping form state
  const [shippingData, setShippingData] = useState<ShippingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "us",
    phone: "",
    sameAsBilling: true,
    shippingMethod: "standard",
  })

  // Payment form state
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    paymentType: "card",
    selectedPaymentMethodId: defaultSavedPaymentMethods.find((pm) => pm.isDefault)?.id || null,
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
    saveCard: true,
  })

  // Saved payment methods state
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<SavedPaymentMethod[]>(defaultSavedPaymentMethods)

  // UI state
  const [showNewCardForm, setShowNewCardForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update shipping data
  const updateShippingData = (data: Partial<ShippingFormData>) => {
    setShippingData((prev) => ({ ...prev, ...data }))
  }

  // Update payment data
  const updatePaymentData = (data: Partial<PaymentFormData>) => {
    setPaymentData((prev) => ({ ...prev, ...data }))
  }

  // Select payment method
  const selectPaymentMethod = (id: string) => {
    updatePaymentData({ selectedPaymentMethodId: id })
  }

  // Delete payment method
  const deletePaymentMethod = (id: string) => {
    setSavedPaymentMethods((prev) => prev.filter((pm) => pm.id !== id))

    // If the deleted method was selected, select another one
    if (paymentData.selectedPaymentMethodId === id) {
      const nextDefault = savedPaymentMethods.find((pm) => pm.id !== id)
      if (nextDefault) {
        selectPaymentMethod(nextDefault.id)
      } else {
        updatePaymentData({ selectedPaymentMethodId: null })
        setShowNewCardForm(true)
      }
    }
  }

  // Handle form submission
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Log the complete order data
    console.log("Order submitted with data:", {
      shipping: shippingData,
      payment: paymentData,
      selectedPaymentMethod: paymentData.selectedPaymentMethodId
        ? savedPaymentMethods.find((pm) => pm.id === paymentData.selectedPaymentMethodId)
        : null,
    })

    // Simulate payment processing
    setTimeout(() => {
      router.push("/checkout/confirmation")
    }, 2000)
  }

  // Context value
  const value = {
    shippingData,
    paymentData,
    savedPaymentMethods,
    showNewCardForm,
    isSubmitting,
    updateShippingData,
    updatePaymentData,
    setShowNewCardForm,
    selectPaymentMethod,
    deletePaymentMethod,
    handleSubmitOrder,
  }

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}

// Custom hook to use the checkout context
export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}
