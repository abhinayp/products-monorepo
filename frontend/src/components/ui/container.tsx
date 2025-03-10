import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  centerOnPage?: boolean
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  full: "max-w-full",
}

export function Container({
  children,
  className,
  centerOnPage = false,
  maxWidth = "3xl",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4",
        maxWidthClasses[maxWidth],
        centerOnPage && "min-h-screen flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
