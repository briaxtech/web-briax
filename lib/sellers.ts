export interface SellerConfig {
  slug: string
  name: string
  notificationEmail: string
  calendlyUrl: string
}

// TODO: Actualiza esta lista con los vendedores reales
export const SELLERS: SellerConfig[] = [
  {
    slug: "argentina",
    name: "Equipo Argentina",
    notificationEmail: "ventas-argentina@lp.briax.tech",
    calendlyUrl: "https://calendly.com/brian-niwoyda/30min",
  },
  {
    slug: "ar",
    name: "Equipo Comercial Argentina",
    notificationEmail: "briaxcomercial@gmail.com",
    calendlyUrl: "https://calendly.com/briaxcomercial/30min",
  },
  {
    slug: "mexico",
    name: "Equipo Mexico",
    notificationEmail: "ventas-mexico@lp.briax.tech",
    calendlyUrl: "https://calendly.com/brian-niwoyda/30min",
  },
]

export const DEFAULT_SELLER: SellerConfig = {
  slug: "general",
  name: "Equipo Briax",
  notificationEmail: "briaxtech@gmail.com",
  calendlyUrl: "https://calendly.com/brian-niwoyda/30min",
}

const SELLER_MAP = new Map(SELLERS.map((seller) => [seller.slug.toLowerCase(), seller]))

export const RESERVED_ROOT_SEGMENTS = new Set(["formulario", "agradecimiento", "api"])

export const resolveSeller = (slug?: string | null) => {
  if (!slug) {
    return { seller: DEFAULT_SELLER, matched: false }
  }

  const normalizedSlug = slug.toLowerCase()
  const seller = SELLER_MAP.get(normalizedSlug)

  if (!seller) {
    return { seller: DEFAULT_SELLER, matched: false }
  }

  return { seller, matched: true }
}

export const getSellerBySlug = (slug?: string | null) => {
  if (!slug) {
    return null
  }

  return SELLER_MAP.get(slug.toLowerCase()) ?? null
}
