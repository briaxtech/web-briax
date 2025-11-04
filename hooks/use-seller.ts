"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"

import { RESERVED_ROOT_SEGMENTS, resolveSeller } from "@/lib/sellers"

const normalizeSegment = (segment?: string | null) => segment?.trim().toLowerCase() || null

export const buildSellerFormPath = (slugParam: string | null) =>
  slugParam ? `/${slugParam}/formulario` : "/formulario"

export const buildSellerThankYouPath = (slugParam: string | null) =>
  slugParam ? `/${slugParam}/agradecimiento` : "/agradecimiento"

export const buildSellerLandingPath = (slugParam: string | null) => (slugParam ? `/${slugParam}` : "/")

export function useSeller() {
  const pathname = usePathname()

  return useMemo(() => {
    const segments = pathname.split("/").filter(Boolean)
    const firstSegment = normalizeSegment(segments[0])
    const slugParam = firstSegment && !RESERVED_ROOT_SEGMENTS.has(firstSegment) ? firstSegment : null

    const { seller, matched } = resolveSeller(slugParam)

    return {
      seller,
      slugParam,
      matched,
      formPath: buildSellerFormPath(slugParam),
      thankYouPath: buildSellerThankYouPath(slugParam),
      landingPath: buildSellerLandingPath(slugParam),
    }
  }, [pathname])
}

