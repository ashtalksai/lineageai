import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  console.log(`Update case ${id} status:`, body)
  return NextResponse.json({ success: true, id, status: body.status })
}
