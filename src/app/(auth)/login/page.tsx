"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log("Login:", form)
    // Simulate login
    await new Promise((r) => setTimeout(r, 800))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left */}
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
          <p className="mt-10 text-teal-200 text-sm leading-relaxed">
            Welcome back. Every family member you track today could be a life saved tomorrow.
          </p>
        </div>
      </div>

      {/* Right */}
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

          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-[#1E293B] tracking-tight mb-2"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm">Sign in to your account to continue.</p>
          </div>

          <Button
            variant="outline"
            className="w-full h-11 mb-6 font-medium border-2 flex items-center gap-3"
            onClick={() => console.log("Google login")}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-[#0F4C5C] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold h-11 mt-2 disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#0F4C5C] font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
