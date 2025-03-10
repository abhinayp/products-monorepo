import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGlobal } from "@/app/GlobalContext"

const LoggedIn = () => {
  const { currentUser } = useGlobal()
  if (!currentUser) return null

  const initials = currentUser?.firstname.charAt(0) + currentUser?.lastname.charAt(0)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{currentUser.firstname} {currentUser.lastname}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem> */}
        <DropdownMenuItem onClick={() => { location.href = '/logout' }}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LoggedIn
