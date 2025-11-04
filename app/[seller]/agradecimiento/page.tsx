import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { ThankYouPage } from "@/components/thank-you-page"
import { THANK_YOU_ACCESS_COOKIE } from "@/lib/cookies"

interface SellerThankYouPageProps {
  params: { seller: string }
}

export default function SellerThankYouPage({ params }: SellerThankYouPageProps) {
  const accessCookie = cookies().get(THANK_YOU_ACCESS_COOKIE)

  if (!accessCookie) {
    const normalizedSlug = params.seller?.toLowerCase() ?? ""
    redirect(`/${normalizedSlug}/formulario`)
  }

  return <ThankYouPage />
}
