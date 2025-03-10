"use client"
import React from 'react'
import { Header } from '@/components/Layouts/Header/Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
    </div>
  )
}

export default Layout
