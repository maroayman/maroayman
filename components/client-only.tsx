"use client"

import { useEffect, useState } from "react"

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * ClientOnly component to prevent hydration mismatches
 * Renders children only on the client side after hydration
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}