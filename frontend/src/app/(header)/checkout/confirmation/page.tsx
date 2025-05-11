import Link from "next/link"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
          <CardDescription>Your order #38492 has been successfully placed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm">
              A confirmation email has been sent to <span className="font-medium">john.doe@example.com</span>
            </p>
          </div>

          <div className="space-y-2 text-left">
            <h3 className="font-medium">Order Summary</h3>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$189.98</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$4.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$15.20</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>$210.17</span>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <h3 className="font-medium">Shipping Information</h3>
            <p className="text-sm">
              John Doe
              <br />
              123 Main St
              <br />
              San Francisco, CA 94103
              <br />
              United States
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>Estimated delivery: June 15-18, 2025</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/orders">
              <Package className="mr-2 h-4 w-4" />
              Track Your Order
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
