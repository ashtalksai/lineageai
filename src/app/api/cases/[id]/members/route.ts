import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  console.log(`Add member to case ${id}:`, body)
  return NextResponse.json({
    success: true,
    member: { id: `m-${Date.now()}`, caseId: id, ...body },
  })
}
