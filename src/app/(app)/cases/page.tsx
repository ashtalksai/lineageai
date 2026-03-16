"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Eye, Edit3 } from "lucide-react"

const sampleCases = [
  {
    id: "PT-2024-001",
    variant: "BRCA1 c.5266dupC",
    variantType: "BRCA1",
    familySize: 14,
    status: "In Progress",
    statusColor: "bg-amber-100 text-amber-700",
    created: "Jan 15, 2026",
  },
  {
    id: "PT-2024-002",
    variant: "Lynch MLH1",
    variantType: "Lynch",
    familySize: 8,
    status: "Complete",
    statusColor: "bg-emerald-100 text-emerald-700",
    created: "Jan 8, 2026",
  },
  {
    id: "PT-2024-003",
    variant: "BRCA2 c.6174delT",
    variantType: "BRCA2",
    familySize: 22,
    status: "Urgent",
    statusColor: "bg-red-100 text-red-700",
    created: "Mar 16, 2026",
  },
]

export default function CasesPage() {
  const [search, setSearch] = useState("")
  const [newCase, setNewCase] = useState({ patientId: "", variantType: "", variantDetail: "", notes: "" })
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = sampleCases.filter(
    (c) =>
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.variant.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New case:", newCase)
    setDialogOpen(false)
    setNewCase({ patientId: "", variantType: "", variantDetail: "", notes: "" })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold text-[#1E293B] tracking-tight"
            style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            Cases
          </h1>
          <p className="text-slate-400 text-sm mt-1">{sampleCases.length} active cases</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button className="bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              New Case
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Case</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  placeholder="PT-2024-004"
                  value={newCase.patientId}
                  onChange={(e) => setNewCase({ ...newCase, patientId: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Variant Type</Label>
                <Select onValueChange={(v: string | null) => setNewCase({ ...newCase, variantType: v ?? "" })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select variant type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BRCA1">BRCA1</SelectItem>
                    <SelectItem value="BRCA2">BRCA2</SelectItem>
                    <SelectItem value="Lynch-MLH1">Lynch — MLH1</SelectItem>
                    <SelectItem value="Lynch-MSH2">Lynch — MSH2</SelectItem>
                    <SelectItem value="Lynch-MSH6">Lynch — MSH6</SelectItem>
                    <SelectItem value="Lynch-PMS2">Lynch — PMS2</SelectItem>
                    <SelectItem value="PALB2">PALB2</SelectItem>
                    <SelectItem value="ATM">ATM</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="variantDetail">Variant Detail (optional)</Label>
                <Input
                  id="variantDetail"
                  placeholder="e.g., c.5266dupC"
                  value={newCase.variantDetail}
                  onChange={(e) => setNewCase({ ...newCase, variantDetail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any relevant clinical context..."
                  rows={3}
                  value={newCase.notes}
                  onChange={(e) => setNewCase({ ...newCase, notes: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold">
                  Create Case
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search by patient ID or variant..."
          className="pl-9 bg-white border-slate-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 gap-3 px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-50">
          <div className="col-span-2">Patient / Variant</div>
          <div>Variant Type</div>
          <div className="text-center">Family Size</div>
          <div>Status</div>
          <div>Created</div>
          <div className="text-right">Actions</div>
        </div>
        {filtered.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-7 gap-3 px-5 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors items-center"
          >
            <div className="col-span-2">
              <div className="font-semibold text-[#1E293B] font-mono text-sm">{c.id}</div>
              <div className="text-xs text-slate-400 mt-0.5">{c.variant}</div>
            </div>
            <div className="text-sm text-slate-600">{c.variantType}</div>
            <div className="text-center font-mono text-sm font-semibold text-slate-600">{c.familySize}</div>
            <div>
              <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${c.statusColor}`}>
                {c.status}
              </span>
            </div>
            <div className="text-sm text-slate-400">{c.created}</div>
            <div className="flex justify-end gap-2">
              <Link href={`/cases/${c.id}`}>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Eye className="w-4 h-4 text-slate-500" />
                </Button>
              </Link>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Edit3 className="w-4 h-4 text-slate-500" />
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <FolderOpenIcon className="w-10 h-10 mx-auto mb-3 text-slate-200" />
            <p className="text-sm">No cases found matching &quot;{search}&quot;</p>
          </div>
        )}
      </div>
    </div>
  )
}

function FolderOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
    </svg>
  )
}
