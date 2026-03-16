import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  // Returns sample cases for now — real implementation uses prisma
  return NextResponse.json({
    cases: [
      { id: "PT-2024-001", variantType: "BRCA1", status: "active" },
      { id: "PT-2024-002", variantType: "Lynch", status: "complete" },
      { id: "PT-2024-003", variantType: "BRCA2", status: "urgent" },
    ],
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log("Create case:", body)
  return NextResponse.json({
    success: true,
    case: { id: `PT-${Date.now()}`, ...body },
  })
}
