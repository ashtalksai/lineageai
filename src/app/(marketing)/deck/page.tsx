"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    type: "title",
    bg: "bg-[#0F4C5C]",
    content: (
      <div className="text-center text-white">
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>L</span>
          </div>
          <h1 className="text-7xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>LineageAI</h1>
          <p className="text-2xl text-teal-200 font-light mb-2">Cascade testing, tracked.</p>
          <p className="text-teal-300 text-lg">Seed Round · March 2026</p>
        </div>
        <div className="flex justify-center gap-8 mt-12 text-sm text-teal-300">
          <span>hello@lineageai.io</span>
          <span>ChimeStream B.V.</span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    type: "problem",
    bg: "bg-white",
    content: (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 block">The Problem</span>
          <h2 className="text-6xl font-bold text-[#1E293B] tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
            70% of at-risk families never get tested.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-8">
          {[
            { stat: "8,000+", label: "Genetic counselors in the US", sub: "managing 40+ active cases each" },
            { stat: "~30 min", label: "Spent per case on admin", sub: "writing letters, updating spreadsheets" },
            { stat: "$0", label: "Purpose-built tools available", sub: "everything runs on Word + Excel" },
          ].map((item) => (
            <div key={item.stat} className="bg-slate-50 rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-[#0F4C5C] mb-2" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>{item.stat}</div>
              <div className="font-semibold text-[#1E293B] mb-1 text-sm">{item.label}</div>
              <div className="text-xs text-slate-400">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    type: "solution",
    bg: "bg-[#0F4C5C]",
    content: (
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 block">The Solution</span>
        <h2 className="text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
          LineageAI closes the loop.
        </h2>
        <p className="text-xl text-teal-200 mb-12 max-w-2xl mx-auto">
          The first platform built specifically for cascade testing outreach — from variant to tested relative.
        </p>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: "📝", title: "AI Letter Generator", desc: "Variant-specific letters in under 10 seconds" },
            { icon: "🌳", title: "Visual Family Tree", desc: "Live status tracking across generations" },
            { icon: "🛡️", title: "Compliance Audit Trail", desc: "Automatic log. One-click PDF export." },
          ].map((f) => (
            <div key={f.title} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="text-white font-bold mb-2">{f.title}</div>
              <div className="text-teal-200 text-sm">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    type: "product",
    bg: "bg-slate-50",
    content: (
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C5C] mb-3 block">The Product</span>
          <h2 className="text-5xl font-bold text-[#1E293B] tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
            Built for how counselors actually work.
          </h2>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-200">
          <Image
            src="/mockups/dashboard-mockup.png"
            alt="LineageAI dashboard"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    id: 5,
    type: "ask",
    bg: "bg-[#1E293B]",
    content: (
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 block">The Ask</span>
        <h2 className="text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
          We&apos;re raising a $500K pre-seed.
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          To build the compliance infrastructure, EHR integrations, and customer success function that enterprise genetics labs need before they can sign a contract.
        </p>
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { amount: "$200K", use: "Engineering — EHR integrations + BAA compliance infrastructure" },
            { amount: "$150K", use: "GTM — 3 pilot institutions + customer success" },
            { amount: "$150K", use: "Operations — 18 months runway" },
          ].map((item) => (
            <div key={item.amount} className="bg-white/10 rounded-2xl p-5 text-left">
              <div className="text-2xl font-bold text-amber-400 mb-2" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>{item.amount}</div>
              <div className="text-slate-300 text-xs leading-relaxed">{item.use}</div>
            </div>
          ))}
        </div>
        <Link href="/contact">
          <Button className="bg-[#F59E0B] hover:bg-amber-500 text-white font-bold px-10 h-12 text-base">
            hello@lineageai.io
          </Button>
        </Link>
      </div>
    ),
  },
]

export default function DeckPage() {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next()
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [next, prev])

  const slide = slides[current]

  return (
    <div className={`fixed inset-0 flex flex-col ${slide.bg} transition-colors duration-500`}>
      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-12 py-16">
        {slide.content}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-8 py-5">
        <Link href="/" className={`text-xs font-medium ${slide.bg === "bg-white" || slide.bg === "bg-slate-50" ? "text-slate-400" : "text-white/40"} hover:opacity-80`}>
          LineageAI · Confidential
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              slide.bg === "bg-white" || slide.bg === "bg-slate-50"
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-30"
                : "bg-white/10 text-white hover:bg-white/20 disabled:opacity-30"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className={`text-sm font-mono ${slide.bg === "bg-white" || slide.bg === "bg-slate-50" ? "text-slate-400" : "text-white/60"}`}>
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              slide.bg === "bg-white" || slide.bg === "bg-slate-50"
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-30"
                : "bg-white/10 text-white hover:bg-white/20 disabled:opacity-30"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current
                  ? slide.bg === "bg-white" || slide.bg === "bg-slate-50" ? "bg-[#0F4C5C] w-6" : "bg-white w-6"
                  : slide.bg === "bg-white" || slide.bg === "bg-slate-50" ? "bg-slate-300" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
