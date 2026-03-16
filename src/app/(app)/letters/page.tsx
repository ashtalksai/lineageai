import { FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LettersPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
            Letters
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage outreach letters across all cases</p>
        </div>
        <Button className="bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold">
          <Plus className="w-4 h-4 mr-2" />
          Generate Letter
        </Button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
        <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-300 mb-2">No letters yet</h3>
        <p className="text-slate-400 text-sm">Go to a case to generate outreach letters for family members.</p>
      </div>
    </div>
  )
}
