"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { homeClient } from "@/api-client/orders/home.client"
import { CreateOrderDTO } from "@/api-client/orders/dto/home.dto"
import { itemsClient } from "@/api-client/cart/items.client"
import { GetCartDTO } from "@/api-client/cart/dto/cart.dto"
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
  cardNumber: string
  cvc: string
  nameOnCard: string
  expiryDate: string
  cardholderName: string
  isDefault: boolean
}

interface CheckoutContextType {
  isLoading: boolean
  checkoutNotAvailable: boolean

  // Cart data
  cartData: GetCartDTO['response'] | undefined

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

  // Form validity
  isShippingFormValid: boolean
  isPaymentFormValid: boolean
  isFormValid: boolean
}

// Validation functions
function validateShippingForm(data: ShippingFormData): boolean {
  // Required shipping fields
  const requiredFields: (keyof ShippingFormData)[] = [
    "firstName",
    "lastName",
    "email",
    "address",
    "city",
    "state",
    "zipCode",
    "country",
    "phone",
  ]

  return requiredFields.every((field) => !!data[field])
}

function validatePaymentForm(data: PaymentFormData, savedMethods: SavedPaymentMethod[]): boolean {
  // If using a saved payment method
  if (
    data.paymentType === "card" &&
    data.selectedPaymentMethodId &&
    savedMethods.some((pm) => pm.id === data.selectedPaymentMethodId)
  ) {
    return true
  }

  // If using PayPal or Apple Pay, no additional validation needed
  if (data.paymentType === "paypal" || data.paymentType === "apple") {
    return true
  }

  // If using a new card, validate card details
  if (data.paymentType === "card") {
    return !!(data.cardNumber && data.expiryDate && data.cvc && data.nameOnCard)
  }

  return false
}

// Create the context with a default undefined value
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

// Mock saved payment methods
const defaultSavedPaymentMethods = [
  {
    id: "pm_1",
    cardBrand: "visa",
    cardNumber: "4242424242424242",
    cvc: "123",
    nameOnCard: "John Doe",
    expiryDate: "12/2026",
    cardholderName: "John Doe",
    isDefault: true,
  },
  {
    id: "pm_2",
    cardBrand: "mastercard",
    cardNumber: "5555555555554444",
    cvc: "123",
    nameOnCard: "John Doe",
    expiryDate: "08/2025",
    cardholderName: "John Doe",
    isDefault: false,
  },
]

// Provider component
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { mutateAsync: createOrder, data: orderData, isSuccess } = useMutation({
    mutationFn: (body: CreateOrderDTO['request']) => homeClient.create(body),
  })

  const { data: cartData, isLoading, isFetched } = useQuery({
    queryKey: ['cart'],
    queryFn: () => itemsClient.getCart(),
  })

  useEffect(() => {
    if (isSuccess) {
      router.push(`/checkout/confirmation?orderId=${orderData?.order?.id}`)
    }
  }, [isSuccess, router, orderData])

  const checkoutNotAvailable = cartData?.cart?.length === 0 && isFetched

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Shipping form state
  const [shippingData, setShippingData] = useState<ShippingFormData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "123 Main St",
    addressLine2: "",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "us",
    phone: "1234567890",
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

  // Form validity state
  const [isShippingFormValid, setIsShippingFormValid] = useState(false)
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  // Validate shipping form whenever shipping data changes
  useEffect(() => {
    setIsShippingFormValid(validateShippingForm(shippingData))
  }, [shippingData])

  // Validate payment form whenever payment data changes
  useEffect(() => {
    setIsPaymentFormValid(validatePaymentForm(paymentData, savedPaymentMethods))
  }, [paymentData, savedPaymentMethods])

  // Update overall form validity
  useEffect(() => {
    setIsFormValid(isShippingFormValid && isPaymentFormValid)
  }, [isShippingFormValid, isPaymentFormValid])

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
    setIsSubmitting(true)
    e.preventDefault()

    // Log the complete order data
    // console.log("Order submitted with data:", {
    //   shipping: shippingData,
    //   payment: paymentData,
    //   selectedPaymentMethod: paymentData.selectedPaymentMethodId
    //     ? savedPaymentMethods.find((pm) => pm.id === paymentData.selectedPaymentMethodId)
    //     : null,
    // })

    const selectedPaymentMethod = paymentData.selectedPaymentMethodId
    ? savedPaymentMethods.find((pm) => pm.id === paymentData.selectedPaymentMethodId)
    : null

    let cardDetails = {
      card_number: paymentData.cardNumber,
      card_cvv: paymentData.cvc,
      card_expiration_date: paymentData.expiryDate,
      card_holder_name: paymentData.nameOnCard,
    }

    if (selectedPaymentMethod) {
      cardDetails = {
        card_number: selectedPaymentMethod.cardNumber,
        card_cvv: selectedPaymentMethod.cvc,
        card_expiration_date: selectedPaymentMethod.expiryDate,
        card_holder_name: selectedPaymentMethod.nameOnCard,
      }
    }

    createOrder({
      order: {
        order_payment: {
          ...cardDetails,
          street: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          zip: shippingData.zipCode,
          country: shippingData.country,
        },
        order_shipping: {
          street: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          zip: shippingData.zipCode,
          country: shippingData.country,
        },
        order_contact: {
          first_name: shippingData.firstName,
          last_name: shippingData.lastName,
          email: shippingData.email,
          phone: shippingData.phone,
        },
      },
    })
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
    isShippingFormValid,
    isPaymentFormValid,
    isFormValid,
    isLoading,
    cartData,
    checkoutNotAvailable,
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
