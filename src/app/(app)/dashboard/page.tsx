import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FolderOpen,
  Bell,
  CheckSquare,
  TrendingUp,
  Plus,
  FileText,
  Download,
  ArrowRight,
} from "lucide-react"

const sampleCases = [
  {
    id: "PT-2024-001",
    variant: "BRCA1 c.5266dupC",
    familySize: 14,
    contacted: 6,
    status: "In Progress",
    statusColor: "bg-amber-100 text-amber-700",
    lastUpdated: "2 days ago",
  },
  {
    id: "PT-2024-002",
    variant: "Lynch MLH1",
    familySize: 8,
    contacted: 8,
    status: "Complete",
    statusColor: "bg-emerald-100 text-emerald-700",
    lastUpdated: "1 week ago",
  },
  {
    id: "PT-2024-003",
    variant: "BRCA2 c.6174delT",
    familySize: 22,
    contacted: 3,
    status: "Urgent",
    statusColor: "bg-red-100 text-red-700",
    lastUpdated: "Today",
  },
]

const recentActivity = [
  { text: "Letter sent to Sarah K. for case PT-2024-003", time: "2h ago", type: "letter" },
  { text: "Status updated to Consented for James M. (PT-2024-001)", time: "5h ago", type: "status" },
  { text: "New family member added to PT-2024-003", time: "Yesterday", type: "member" },
  { text: "Compliance log exported for PT-2024-002", time: "3 days ago", type: "export" },
  { text: "Case PT-2024-002 marked as Complete", time: "1 week ago", type: "complete" },
]

const stats = [
  { label: "Open Cases", value: "12", icon: FolderOpen, color: "text-[#0F4C5C]", bg: "bg-teal-50" },
  { label: "Pending Outreach", value: "8", icon: Bell, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Completed This Month", value: "5", icon: CheckSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Cascade Completion %", value: "34%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
]

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold text-[#1E293B] tracking-tight"
            style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">Monday, March 16, 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/cases">
            <Button className="bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              New Case
            </Button>
          </Link>
        </div>
      </div>

      {/* Free tier upgrade banner */}
      <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <span className="text-sm font-semibold text-amber-800">You&apos;re on the Pilot plan</span>
            <span className="text-xs text-amber-600 block">Upgrade to Pro for unlimited cases and AI letter generation.</span>
          </div>
        </div>
        <Link href="/pricing">
          <Button size="sm" className="bg-[#F59E0B] hover:bg-amber-500 text-white font-semibold text-xs">
            Upgrade to Pro
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-slate-100 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                  <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <div
                  className={`text-3xl font-bold ${stat.color}`}
                  style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cases table */}
        <div className="lg:col-span-2">
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-bold text-[#1E293B]">Active Cases</CardTitle>
              <Link href="/cases" className="text-xs text-[#0F4C5C] hover:underline flex items-center gap-1 font-medium">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {/* Table header */}
                <div className="grid grid-cols-6 gap-2 px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-50">
                  <div className="col-span-2">Patient / Variant</div>
                  <div className="text-center">Family</div>
                  <div className="text-center">Contacted</div>
                  <div>Status</div>
                  <div className="text-right">Updated</div>
                </div>
                {sampleCases.map((c) => (
                  <div
                    key={c.id}
                    className="grid grid-cols-6 gap-2 px-3 py-3.5 text-sm border-b border-slate-50 hover:bg-slate-50 transition-colors items-center"
                  >
                    <div className="col-span-2">
                      <div className="font-semibold text-[#1E293B] font-mono text-xs">{c.id}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{c.variant}</div>
                    </div>
                    <div className="text-center font-mono text-sm font-semibold text-slate-600">{c.familySize}</div>
                    <div className="text-center font-mono text-sm font-semibold text-slate-600">{c.contacted}</div>
                    <div>
                      <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-semibold ${c.statusColor}`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <div>{c.lastUpdated}</div>
                      <Link href={`/cases/${c.id}`} className="text-[#0F4C5C] hover:underline font-medium mt-0.5 inline-block">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity + Quick actions */}
        <div className="space-y-4">
          {/* Quick actions */}
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-[#1E293B]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/cases">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm h-9 border-slate-200">
                  <Plus className="w-4 h-4 text-[#0F4C5C]" />
                  New Case
                </Button>
              </Link>
              <Link href="/letters">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm h-9 border-slate-200">
                  <FileText className="w-4 h-4 text-[#0F4C5C]" />
                  Generate Letters
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start gap-2 text-sm h-9 border-slate-200">
                <Download className="w-4 h-4 text-[#0F4C5C]" />
                Export Report
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-[#1E293B]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F4C5C] mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
                      <span className="text-xs text-slate-400">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
