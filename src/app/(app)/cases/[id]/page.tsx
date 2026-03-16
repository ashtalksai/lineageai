"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { GitBranch, FileText, ShieldCheck, Mail, CheckCircle2, Clock } from "lucide-react"

// Status colors for the family tree
const statusColors: Record<string, string> = {
  not_contacted: "#EF4444",
  contacted: "#F59E0B",
  consented: "#8B5CF6",
  scheduled: "#3B82F6",
  tested: "#10B981",
  declined: "#6B7280",
}

const statusLabels: Record<string, string> = {
  not_contacted: "Not Contacted",
  contacted: "Contacted",
  consented: "Consented",
  scheduled: "Scheduled",
  tested: "Tested",
  declined: "Declined",
}

// Case data by ID
const caseData: Record<string, {
  id: string
  variant: string
  status: string
  statusColor: string
  familyMembers: { id: string; name: string; relation: string; status: string; generation: number; position: number }[]
  complianceLogs: { action: string; details: string; timestamp: string }[]
}> = {
  "PT-2024-001": {
    id: "PT-2024-001",
    variant: "BRCA1 c.5266dupC",
    status: "In Progress",
    statusColor: "bg-amber-100 text-amber-700",
    familyMembers: [
      { id: "m1", name: "Proband (Index)", relation: "Proband", status: "tested", generation: 0, position: 0 },
      { id: "m2", name: "Sarah K.", relation: "Sister", status: "contacted", generation: 1, position: -1 },
      { id: "m3", name: "Robert K.", relation: "Brother", status: "scheduled", generation: 1, position: 1 },
      { id: "m4", name: "Linda M.", relation: "Aunt", status: "not_contacted", generation: 1, position: -2 },
      { id: "m5", name: "Tom K.", relation: "Nephew", status: "consented", generation: 2, position: -1 },
      { id: "m6", name: "Emma K.", relation: "Niece", status: "not_contacted", generation: 2, position: 0 },
    ],
    complianceLogs: [
      { action: "Case created", details: "Case PT-2024-001 created with variant BRCA1 c.5266dupC", timestamp: "Jan 15, 2026 9:00 AM" },
      { action: "Family member added", details: "Sarah K. (Sister) added to case", timestamp: "Jan 15, 2026 9:05 AM" },
      { action: "Letter generated", details: "Outreach letter generated for Sarah K.", timestamp: "Jan 16, 2026 2:30 PM" },
      { action: "Status updated", details: "Sarah K. status changed to Contacted", timestamp: "Jan 17, 2026 10:00 AM" },
      { action: "Letter generated", details: "Outreach letter generated for Robert K.", timestamp: "Jan 18, 2026 11:00 AM" },
      { action: "Status updated", details: "Tom K. status changed to Consented", timestamp: "Feb 2, 2026 3:15 PM" },
    ],
  },
  "PT-2024-002": {
    id: "PT-2024-002",
    variant: "Lynch MLH1",
    status: "Complete",
    statusColor: "bg-emerald-100 text-emerald-700",
    familyMembers: [
      { id: "m1", name: "Proband", relation: "Proband", status: "tested", generation: 0, position: 0 },
      { id: "m2", name: "Michael D.", relation: "Son", status: "tested", generation: 1, position: -1 },
      { id: "m3", name: "Jennifer D.", relation: "Daughter", status: "tested", generation: 1, position: 1 },
      { id: "m4", name: "Peter D.", relation: "Son", status: "tested", generation: 1, position: 0 },
    ],
    complianceLogs: [
      { action: "Case created", details: "Case PT-2024-002 created with Lynch MLH1 variant", timestamp: "Jan 8, 2026 8:00 AM" },
      { action: "All members contacted", details: "All 8 family members contacted and tested", timestamp: "Feb 20, 2026 4:00 PM" },
      { action: "Case completed", details: "Cascade testing complete for all family members", timestamp: "Feb 28, 2026 9:00 AM" },
    ],
  },
  "PT-2024-003": {
    id: "PT-2024-003",
    variant: "BRCA2 c.6174delT",
    status: "Urgent",
    statusColor: "bg-red-100 text-red-700",
    familyMembers: [
      { id: "m1", name: "Proband", relation: "Proband", status: "tested", generation: 0, position: 0 },
      { id: "m2", name: "Anna R.", relation: "Mother", status: "contacted", generation: -1, position: 0 },
      { id: "m3", name: "James R.", relation: "Brother", status: "not_contacted", generation: 0, position: 1 },
      { id: "m4", name: "Claire R.", relation: "Sister", status: "not_contacted", generation: 0, position: -1 },
      { id: "m5", name: "David R.", relation: "Father", status: "declined", generation: -1, position: -1 },
    ],
    complianceLogs: [
      { action: "Case created", details: "Case PT-2024-003 created with BRCA2 c.6174delT variant", timestamp: "Mar 16, 2026 8:00 AM" },
      { action: "Letter generated", details: "Outreach letter generated for Anna R.", timestamp: "Mar 16, 2026 8:30 AM" },
      { action: "Status updated", details: "Anna R. status changed to Contacted", timestamp: "Mar 16, 2026 9:00 AM" },
      { action: "Status updated", details: "David R. status changed to Declined", timestamp: "Mar 16, 2026 2:00 PM" },
    ],
  },
}

// Family tree SVG
function CaseFamilyTree({ members }: { members: typeof caseData["PT-2024-001"]["familyMembers"] }) {
  const genGroups: Record<number, typeof members> = {}
  members.forEach((m) => {
    if (!genGroups[m.generation]) genGroups[m.generation] = []
    genGroups[m.generation].push(m)
  })

  const centerX = 300
  const genSpacing = 100
  const nodeRadius = 24

  const nodePositions: Record<string, { x: number; y: number }> = {}
  const gens = Object.keys(genGroups).map(Number).sort()
  const minGen = Math.min(...gens)

  members.forEach((m) => {
    const y = 60 + (m.generation - minGen) * genSpacing
    const x = centerX + m.position * 120
    nodePositions[m.id] = { x, y }
  })

  const proband = members.find((m) => m.generation === 0 && m.position === 0)

  return (
    <svg viewBox="0 50 600 350" className="w-full" style={{ minHeight: 280 }}>
      <defs>
        <filter id="caseNodeShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F4C5C" floodOpacity="0.12" />
        </filter>
      </defs>
      {/* Lines from proband to others */}
      {proband && members
        .filter((m) => m.id !== proband.id)
        .map((m) => {
          const fromPos = nodePositions[proband.id]
          const toPos = nodePositions[m.id]
          if (!fromPos || !toPos) return null
          return (
            <line
              key={m.id}
              x1={fromPos.x}
              y1={fromPos.y + nodeRadius}
              x2={toPos.x}
              y2={toPos.y - nodeRadius}
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
          )
        })}

      {/* Nodes */}
      {members.map((m) => {
        const pos = nodePositions[m.id]
        if (!pos) return null
        return (
          <g key={m.id} filter="url(#caseNodeShadow)">
            <circle cx={pos.x} cy={pos.y} r={nodeRadius} fill="white" stroke={statusColors[m.status]} strokeWidth="2.5" />
            <circle cx={pos.x} cy={pos.y} r={10} fill={statusColors[m.status]} />
            <text x={pos.x} y={pos.y + nodeRadius + 14} textAnchor="middle" fill="#1E293B" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
              {m.name.split(" ")[0]}
            </text>
            <text x={pos.x} y={pos.y + nodeRadius + 27} textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif">
              {m.relation}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// Letter generator
function generateLetter(memberName: string, relation: string, variant: string, caseId: string): string {
  return `Dear ${memberName},

I am writing to you today because your ${relation.toLowerCase()}, who is under my care as a genetic counselor, has recently received a positive genetic test result for a hereditary variant: ${variant}.

This type of variant can be inherited within families. Based on your family relationship to our patient, you may have a 50% chance of carrying the same variant. Early knowledge of this information gives you the opportunity to consider genetic testing and, if appropriate, to explore preventive options with your own healthcare team.

I am enclosing information about the testing process and what a positive result might mean for your health and preventive care options. I want to emphasize that this letter is purely informational — there is no obligation to be tested, and this decision is entirely yours to make in consultation with your own physician.

If you have questions or would like to schedule a genetic counseling appointment, please contact our clinic at hello@lineageai.io or call us directly.

This information is shared with the authorization of your family member and is intended solely for your consideration.

Sincerely,
Dr. Sarah Chen, MS, CGC
Senior Genetic Counselor
LineageAI Case Reference: ${caseId}

---
This is a sample letter generated by LineageAI. Please review and customize before sending.`
}

export default function CaseDetailPage() {
  const params = useParams()
  const id = params.id as string
  const caseInfo = caseData[id] || caseData["PT-2024-001"]

  const [letterModal, setLetterModal] = useState<{ open: boolean; content: string; name: string }>({
    open: false,
    content: "",
    name: "",
  })

  const openLetter = (member: { name: string; relation: string }) => {
    setLetterModal({
      open: true,
      name: member.name,
      content: generateLetter(member.name, member.relation, caseInfo.variant, id),
    })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1
              className="text-3xl font-bold text-[#1E293B] tracking-tight font-mono"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {caseInfo.id}
            </h1>
            <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-semibold ${caseInfo.statusColor}`}>
              {caseInfo.status}
            </span>
          </div>
          <p className="text-slate-500 text-sm">{caseInfo.variant}</p>
        </div>
        <Button className="bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold">
          <Mail className="w-4 h-4 mr-2" />
          Generate All Letters
        </Button>
      </div>

      {/* Status legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(statusColors).map(([key, color]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-slate-500">{statusLabels[key]}</span>
          </div>
        ))}
      </div>

      <Tabs defaultValue="tree">
        <TabsList className="bg-slate-100 mb-6">
          <TabsTrigger value="tree" className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" /> Family Tree
          </TabsTrigger>
          <TabsTrigger value="letters" className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Letters
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Compliance Log
          </TabsTrigger>
        </TabsList>

        {/* Family Tree */}
        <TabsContent value="tree">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-[#1E293B] mb-6">Family Tree — {caseInfo.familyMembers.length} members</h2>
            <CaseFamilyTree members={caseInfo.familyMembers} />
          </div>
        </TabsContent>

        {/* Letters */}
        <TabsContent value="letters">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-lg font-bold text-[#1E293B]">Outreach Letters</h2>
              <p className="text-sm text-slate-400 mt-1">Generate personalized letters for each at-risk family member</p>
            </div>
            <div className="divide-y divide-slate-50">
              {caseInfo.familyMembers.filter((m) => m.relation !== "Proband").map((member) => (
                <div key={member.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-white text-sm font-bold"
                      style={{ borderColor: statusColors[member.status], backgroundColor: statusColors[member.status] + "20", color: statusColors[member.status] }}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1E293B] text-sm">{member.name}</div>
                      <div className="text-xs text-slate-400">{member.relation}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: statusColors[member.status] + "20", color: statusColors[member.status] }}
                    >
                      {statusLabels[member.status]}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-[#0F4C5C] text-[#0F4C5C] hover:bg-teal-50"
                      onClick={() => openLetter(member)}
                    >
                      Generate Letter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Compliance Log */}
        <TabsContent value="compliance">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1E293B]">Compliance Log</h2>
                <p className="text-sm text-slate-400 mt-1">Automatic audit trail for {caseInfo.id}</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs border-slate-200">
                Export PDF
              </Button>
            </div>
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
                <div className="space-y-6">
                  {caseInfo.complianceLogs.map((log, i) => (
                    <div key={i} className="flex gap-5 pl-10 relative">
                      <div className="absolute left-3 top-1 w-3 h-3 rounded-full border-2 border-[#0F4C5C] bg-white" />
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-semibold text-[#1E293B]">{log.action}</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {log.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{log.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Letter Modal */}
      <Dialog open={letterModal.open} onOpenChange={(o) => setLetterModal({ ...letterModal, open: o })}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Outreach Letter — {letterModal.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <textarea
              className="w-full h-96 text-sm font-mono border border-slate-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] leading-relaxed"
              value={letterModal.content}
              onChange={(e) => setLetterModal({ ...letterModal, content: e.target.value })}
            />
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(letterModal.content)
                }}
              >
                Copy to Clipboard
              </Button>
              <Button className="flex-1 bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Sent
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
