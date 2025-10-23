import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { ThankYouPage } from "@/components/thank-you-page"
import { THANK_YOU_ACCESS_COOKIE } from "@/lib/cookies"

export default function Page() {
  const accessCookie = cookies().get(THANK_YOU_ACCESS_COOKIE)

  if (!accessCookie) {
    redirect("/formulario")
  }

  return <ThankYouPage />
}
