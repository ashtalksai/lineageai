"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submission:", form)
    setSubmitted(true)
  }

  return (
    <div className="bg-[#F8F7F4]">
      <section className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left */}
            <div>
              <h1
                className="text-5xl font-bold text-[#1E293B] tracking-tight mb-6"
                style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
              >
                Get in touch
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-10">
                Have questions about LineageAI? Interested in an Enterprise plan? Want to share feedback or report an issue? We read every message.
              </p>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0F4C5C] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1E293B]">Email us directly</div>
                  <a
                    href="mailto:hello@lineageai.io"
                    className="text-sm text-[#0F4C5C] hover:underline"
                  >
                    hello@lineageai.io
                  </a>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 mt-8">
                <h3 className="font-semibold text-[#0F4C5C] mb-2">Enterprise inquiries</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For institutional deployments, BAA agreements, custom integrations, or volume pricing — use the form and select &quot;Enterprise Inquiry&quot; as your subject. We typically respond within one business day.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {submitted ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-[#0F4C5C] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#1E293B] mb-3">Message sent</h3>
                  <p className="text-slate-500">
                    Thanks for reaching out. We&apos;ll get back to you at{" "}
                    <span className="font-medium text-[#1E293B]">{form.email}</span> within 1 business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Dr. Jane Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@clinic.org"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      placeholder="Your clinic or institution"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select onValueChange={(val: string | null) => setForm({ ...form, role: val ?? "" })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gc">Genetic Counselor</SelectItem>
                        <SelectItem value="lab-director">Lab Director</SelectItem>
                        <SelectItem value="clinic-admin">Clinic Administrator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select onValueChange={(val: string | null) => setForm({ ...form, subject: val ?? "" })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="enterprise">Enterprise Inquiry</SelectItem>
                        <SelectItem value="demo">Request a Demo</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="feedback">Product Feedback</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold h-11"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
