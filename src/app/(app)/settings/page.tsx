import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E293B] tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
          Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account and preferences</p>
      </div>
      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h2 className="text-lg font-bold text-[#1E293B] mb-6">Profile</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="Dr. Sarah Chen" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="sarah.chen@stanfordhealth.org" type="email" />
            </div>
            <div className="space-y-2">
              <Label>Clinic / Institution</Label>
              <Input defaultValue="Stanford Health Care" />
            </div>
            <Button className="bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold">
              Save Changes
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h2 className="text-lg font-bold text-[#1E293B] mb-2">Plan</h2>
          <p className="text-sm text-slate-400 mb-6">You are currently on the <strong className="text-[#0F4C5C]">Pro Plan</strong>.</p>
          <Button variant="outline" className="border-slate-200 text-sm">Manage Subscription</Button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h2 className="text-lg font-bold text-[#1E293B] mb-2">Danger Zone</h2>
          <p className="text-sm text-slate-400 mb-6">Permanently delete your account and all associated data. This action cannot be undone.</p>
          <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50 text-sm">Delete Account</Button>
        </div>
      </div>
    </div>
  )
}
