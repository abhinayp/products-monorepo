"use client"

import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { Item } from './Item'
import { formatToDollars } from '@/helpers/common.helper'
import useCart from './useCart'

function Cart() {
  const { showCart, cartData, isLoading, cartTotal, setShowCart, checkoutClicked, handleCheckoutClick } = useCart()

  return (
    <Sheet open={showCart} onOpenChange={setShowCart}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="h-4 w-4" />
          {cartData && cartData.cart && cartData.cart.length > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading cart...</p>
          </div>
        ) : !cartData?.cart?.length ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto pb-6">
              <div className="space-y-4">
                {cartData.cart.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-muted-foreground">{formatToDollars(cartData?.cart_metadata?.net_total_price || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-muted-foreground">{formatToDollars(cartData?.cart_metadata?.tax || 0)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Total</span>
                <span className="font-medium">{formatToDollars(cartTotal)}</span>
              </div>
              <div className="pt-2">
                <Button className="w-full" onClick={handleCheckoutClick} disabled={checkoutClicked}>
                  {checkoutClicked ? 'Redirecting...' : 'Checkout'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart
