"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

// Inline SVG family tree for auth pages
function AuthFamilyTree() {
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-xs opacity-30" aria-hidden>
      <line x1="150" y1="40" x2="80" y2="100" stroke="white" strokeWidth="1.5" />
      <line x1="150" y1="40" x2="220" y2="100" stroke="white" strokeWidth="1.5" />
      <line x1="80" y1="100" x2="40" y2="160" stroke="white" strokeWidth="1.5" />
      <line x1="80" y1="100" x2="120" y2="160" stroke="white" strokeWidth="1.5" />
      <line x1="220" y1="100" x2="180" y2="160" stroke="white" strokeWidth="1.5" />
      <line x1="220" y1="100" x2="260" y2="160" stroke="white" strokeWidth="1.5" />
      <circle cx="150" cy="40" r="16" fill="white" fillOpacity="0.9" />
      <circle cx="80" cy="100" r="14" fill="white" fillOpacity="0.7" />
      <circle cx="220" cy="100" r="14" fill="white" fillOpacity="0.7" />
      <circle cx="40" cy="160" r="12" fill="white" fillOpacity="0.5" />
      <circle cx="120" cy="160" r="12" fill="white" fillOpacity="0.5" />
      <circle cx="180" cy="160" r="12" fill="white" fillOpacity="0.5" />
      <circle cx="260" cy="160" r="12" fill="white" fillOpacity="0.5" />
    </svg>
  )
}

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    clinicName: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup:", form)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Teal gradient */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#0F4C5C] to-[#0a3040] px-12 py-16">
        <div className="max-w-sm w-full">
          <Link href="/">
            <span
              className="text-white font-bold text-3xl tracking-tight block mb-2"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              LineageAI
            </span>
          </Link>
          <p className="text-teal-200 text-sm mb-12">Cascade testing, tracked.</p>

          <AuthFamilyTree />

          <div className="mt-10 space-y-5">
            {[
              "Map at-risk relatives across generations",
              "Generate personalized outreach letters in seconds",
              "Maintain a complete compliance audit trail",
            ].map((v) => (
              <div key={v} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-teal-100 text-sm leading-relaxed">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-16 bg-[#F8F7F4]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/">
              <span
                className="text-[#0F4C5C] font-bold text-2xl tracking-tight"
                style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
              >
                LineageAI
              </span>
            </Link>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-[#0F4C5C] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Account created!</h2>
              <p className="text-slate-500 mb-6">Redirecting you to your dashboard...</p>
              <Link href="/dashboard">
                <Button className="bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#1E293B] tracking-tight mb-2"
                  style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
                  Create your account
                </h1>
                <p className="text-slate-500 text-sm">Free to start — no credit card required.</p>
              </div>

              <Button
                variant="outline"
                className="w-full h-11 mb-6 font-medium border-2 flex items-center gap-3"
                onClick={() => console.log("Google signup")}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
                </svg>
                Continue with Google
              </Button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs text-slate-400 bg-[#F8F7F4] px-3">
                  or continue with email
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={8}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Clinic / Institution</Label>
                  <Input
                    id="clinicName"
                    placeholder="Northwestern Medicine"
                    value={form.clinicName}
                    onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold h-11 mt-2"
                >
                  Create Account
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="text-[#0F4C5C] font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
              <p className="mt-3 text-center text-xs text-slate-400">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="hover:underline">Terms</Link> and{" "}
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
