import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CompliancePage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
            Compliance
          </h1>
          <p className="text-slate-400 text-sm mt-1">Audit trail across all cases</p>
        </div>
        <Button variant="outline" className="border-slate-200 text-sm">
          Export All Reports
        </Button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
        <ShieldCheck className="w-12 h-12 text-slate-200 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-300 mb-2">Compliance logging active</h3>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">All case actions are automatically logged. View individual case logs from the case detail page.</p>
      </div>
    </div>
  )
}
