import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { plan = "pro" } = body

  const prices: Record<string, string> = {
    pro: "price_pro_monthly",
    enterprise: "price_enterprise_monthly",
  }

  // Placeholder — real implementation uses Stripe SDK
  console.log("Create checkout session for plan:", plan)

  return NextResponse.json({
    success: true,
    url: `/signup?plan=${plan}&checkout=pending`,
    sessionId: `cs_${Date.now()}`,
    priceId: prices[plan] || prices.pro,
  })
}
