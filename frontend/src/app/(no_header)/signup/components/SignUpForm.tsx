"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useSignUpForm from "./useSignUpForm"
import { Loader2 } from "lucide-react"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { data, setData, handleSubmit, disabled, isLoading, error } = useSignUpForm()
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className={`text-sm text-balance ${error ? 'text-destructive' : 'text-muted-foreground'}`}>
          {error || "Enter the details to start shopping"}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="firstname">First Name</Label>
          <Input id="firstname" type="text" placeholder="John" required value={data.firstname} onChange={(e) => setData('firstname', e.target.value)} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="lastname">Last Name</Label>
          <Input id="lastname" type="text" placeholder="Doe" required value={data.lastname} onChange={(e) => setData('lastname', e.target.value)} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="9999999999" required value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required value={data.email} onChange={(e) => setData('email', e.target.value)} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input id="password" type="password" required value={data.password} onChange={(e) => setData('password', e.target.value)} />
        </div>
        <Button type="button" className="w-full" onClick={handleSubmit} disabled={disabled}>
          {isLoading ? (<><Loader2 className="size-4 animate-spin" /> Signing up...</>) : 'Sign Up'}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  )
}
