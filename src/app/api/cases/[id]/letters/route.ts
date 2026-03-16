import { NextRequest, NextResponse } from "next/server"

const letterTemplates: Record<string, (name: string, relation: string) => string> = {
  BRCA1: (name, relation) => `Dear ${name},\n\nYour ${relation} has recently tested positive for a BRCA1 pathogenic variant. As a first-degree relative, you may have a 50% chance of carrying the same variant. We encourage you to speak with a genetic counselor about your options for genetic testing and preventive care.\n\nPlease contact our clinic to schedule a consultation.`,
  BRCA2: (name, relation) => `Dear ${name},\n\nYour ${relation} has recently tested positive for a BRCA2 pathogenic variant. BRCA2 variants are associated with elevated risk for breast, ovarian, and other cancers. As a first-degree relative, genetic testing is strongly recommended.\n\nPlease contact our clinic to schedule a genetic counseling appointment.`,
  Lynch: (name, relation) => `Dear ${name},\n\nYour ${relation} has been diagnosed with Lynch syndrome (a hereditary mismatch repair deficiency). Lynch syndrome significantly increases risk for colorectal, endometrial, and other cancers. As a first-degree relative, genetic testing can determine if you carry the same variant.\n\nPlease contact our clinic to learn about your options.`,
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const { memberName = "Family Member", relation = "relative", variantType = "BRCA1" } = body

  const template = letterTemplates[variantType] || letterTemplates["BRCA1"]
  const content = template(memberName, relation)

  return NextResponse.json({
    success: true,
    letter: {
      id: `letter-${Date.now()}`,
      caseId: id,
      content,
      status: "draft",
    },
  })
}
