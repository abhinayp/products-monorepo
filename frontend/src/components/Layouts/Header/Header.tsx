import React from 'react'
import { GalleryVerticalEnd, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import CTA from './CTA'
import { Cart } from '@/components/Cart'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2 font-medium md:hidden">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span>Shoppers Avenue</span>
        </div>

        {/* Desktop Logo */}
        <Link href="/" className="mr-8 hidden items-center gap-2 font-medium md:flex">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span>Shoppers Avenue</span>
        </Link>

        {/* Search */}
        <div className="flex-1">
          <form className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
              />
            </div>
            <Button type="submit" variant="secondary" className="hidden sm:flex">
              Search
            </Button>
          </form>
        </div>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          <Cart />
          <CTA />
        </div>
      </div>
    </div>
  )
}
