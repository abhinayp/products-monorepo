"use client"

import { useState } from "react"
import { Filter, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrdersFilter() {
  const [statusFilters, setStatusFilters] = useState({
    delivered: false,
    shipped: false,
    processing: false,
    cancelled: false,
  })

  const [sortBy, setSortBy] = useState("newest")

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
            {Object.values(statusFilters).some(Boolean) && <span className="ml-1 rounded-full bg-primary w-2 h-2" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={statusFilters.delivered}
            onCheckedChange={(checked) => setStatusFilters({ ...statusFilters, delivered: checked })}
          >
            <Check className={`mr-2 h-4 w-4 ${statusFilters.delivered ? "opacity-100" : "opacity-0"}`} />
            Delivered
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilters.shipped}
            onCheckedChange={(checked) => setStatusFilters({ ...statusFilters, shipped: checked })}
          >
            <Check className={`mr-2 h-4 w-4 ${statusFilters.shipped ? "opacity-100" : "opacity-0"}`} />
            Shipped
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilters.processing}
            onCheckedChange={(checked) => setStatusFilters({ ...statusFilters, processing: checked })}
          >
            <Check className={`mr-2 h-4 w-4 ${statusFilters.processing ? "opacity-100" : "opacity-0"}`} />
            Processing
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilters.cancelled}
            onCheckedChange={(checked) => setStatusFilters({ ...statusFilters, cancelled: checked })}
          >
            <Check className={`mr-2 h-4 w-4 ${statusFilters.cancelled ? "opacity-100" : "opacity-0"}`} />
            Cancelled
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="highest">Highest Amount</SelectItem>
          <SelectItem value="lowest">Lowest Amount</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
