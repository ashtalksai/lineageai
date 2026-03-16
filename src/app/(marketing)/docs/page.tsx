"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronRight, Menu, X, ExternalLink } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type SectionId = "research" | "gtm" | "marketing" | "brand" | "pitch"

// ─── Content ──────────────────────────────────────────────────────────────────
const NAV_SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: "research",  label: "Research",   icon: "📊" },
  { id: "gtm",       label: "GTM Plan",   icon: "🎯" },
  { id: "marketing", label: "Marketing",  icon: "📣" },
  { id: "brand",     label: "Brand",      icon: "🎨" },
  { id: "pitch",     label: "Pitch Deck", icon: "🎤" },
]

// ─── Reusable Components ──────────────────────────────────────────────────────
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C5C] block mb-2">{label}</span>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1E293B] tracking-tight leading-tight mb-3">
        {title}
      </h1>
      {subtitle && <p className="text-slate-500 text-lg leading-relaxed">{subtitle}</p>}
      <div className="w-14 h-1 bg-[#0F4C5C] rounded-full mt-4" />
    </div>
  )
}

function BentoCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}

function StatCard({ value, label, sub, accent = false }: { value: string; label: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ${accent ? "bg-[#0F4C5C] text-white" : "bg-white border border-slate-100"}`}>
      <div className={`font-display text-4xl font-bold mb-1 ${accent ? "text-[#F59E0B]" : "text-[#0F4C5C]"}`}>{value}</div>
      <div className={`font-semibold text-sm mb-0.5 ${accent ? "text-white" : "text-[#1E293B]"}`}>{label}</div>
      {sub && <div className={`text-xs ${accent ? "text-teal-200" : "text-slate-400"}`}>{sub}</div>}
    </div>
  )
}

// ─── Research Section ─────────────────────────────────────────────────────────
function ResearchSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Research"
        title="Market Validation & Opportunity"
        subtitle="LineageAI addresses a real patient safety gap. 7 in 10 at-risk family members never receive genetic testing — not because they refuse, but because clinic outreach never reaches them."
      />

      {/* Executive Summary */}
      <BentoCard className="bg-teal-50 border-teal-100">
        <h2 className="font-bold text-[#0F4C5C] text-lg mb-3">Executive Summary</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          LineageAI closes the cascade testing gap. Genetic counselors have no purpose-built tool for coordinating family outreach after a variant is identified. The current workflow is manual letters, Excel tracking, and paper compliance logs.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Idea Score", value: "77/100", sub: "PROCEED" },
            { label: "Opportunity", value: "9/10", sub: "Exceptional" },
            { label: "Why Now", value: "9/10", sub: "Market timing" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-display text-3xl font-bold text-[#0F4C5C]">{item.value}</div>
              <div className="text-sm text-slate-600">{item.label}</div>
              <div className="text-xs text-slate-400">{item.sub}</div>
            </div>
          ))}
        </div>
      </BentoCard>

      {/* Market Size */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Market Opportunity</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard value="$100M+" label="TAM — US genetics software" sub="All genetics software tools combined" accent />
          <StatCard value="$15M" label="SAM — cascade coordination" sub="Purpose-built cascade tools" />
          <StatCard value="$100K" label="SOM — 12-month realistic" sub="500 paying users at $200/mo avg" />
        </div>
      </div>

      {/* Counselor base */}
      <div className="grid grid-cols-2 gap-4">
        <BentoCard>
          <h3 className="font-bold text-[#0F4C5C] mb-3">Counselor Base</h3>
          <div className="space-y-3">
            {[
              { label: "NSGC-certified counselors (US)", value: "8,000+" },
              { label: "Global genetic counselors", value: "40,000+" },
              { label: "Manual outreach time per case", value: "30+ min" },
              { label: "Families who never get tested", value: "70%" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="font-bold text-[#0F4C5C] font-mono text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </BentoCard>
        <BentoCard>
          <h3 className="font-bold text-[#0F4C5C] mb-3">Revenue Potential</h3>
          <div className="space-y-3">
            {[
              { label: "1% US counselors at Pro tier", value: "$19K ARR" },
              { label: "10% penetration", value: "$1.9M ARR" },
              { label: "Top 100 hospital systems (Enterprise)", value: "$599K ARR" },
              { label: "Combined realistic (12mo)", value: "$100K ARR" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="font-bold text-[#F59E0B] font-mono text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Competitive Landscape */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Competitive Landscape</h2>
        <BentoCard>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 pr-4 text-slate-400 font-medium text-xs uppercase tracking-wide">Feature</th>
                  <th className="text-center py-2 px-4">
                    <span className="bg-[#0F4C5C] text-white text-xs font-bold px-3 py-1 rounded-full">LineageAI</span>
                  </th>
                  <th className="text-center py-2 px-4 text-slate-400 font-medium">Progeny</th>
                  <th className="text-center py-2 px-4 text-slate-400 font-medium">Epic/EHR</th>
                  <th className="text-center py-2 px-4 text-slate-400 font-medium">Excel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Family tree builder", true, true, false, false],
                  ["Outreach letter generation", true, false, false, false],
                  ["Contact status tracking", true, false, false, "manual"],
                  ["Compliance audit trail", true, false, false, false],
                  ["HIPAA BAA available", true, true, true, null],
                  ["AI letter drafting", true, false, false, false],
                  ["Cascade coordination workflow", true, false, false, false],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-slate-50/50" : ""}>
                    <td className="py-2.5 pr-4 text-slate-700">{row[0]}</td>
                    {[1, 2, 3, 4].map((col) => (
                      <td key={col} className="text-center py-2.5 px-4">
                        {row[col] === true ? <span className="text-green-500 font-bold">✓</span>
                          : row[col] === false ? <span className="text-red-400/60 text-xs">✗</span>
                          : row[col] === "manual" ? <span className="text-amber-500 text-xs">Manual</span>
                          : <span className="text-slate-300 text-xs">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-sm text-amber-800 font-medium">
              💡 Our edge: Progeny draws pedigrees. LineageAI tracks who you actually reached. Different tools, complementary workflow.
            </p>
          </div>
        </BentoCard>
      </div>

      {/* Validation */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Validation Signals</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "💬", title: "r/GeneticCounseling", detail: "4 subreddits · 2.5M+ members — multiple threads confirming the exact pain point" },
            { icon: "👥", title: "Facebook Groups", detail: "4 genetics groups · 150K+ members — manual letter drafting pain confirmed repeatedly" },
            { icon: "📈", title: "Keyword Signal", detail: '"Ancestry DNA genealogy" +15,900% search growth · "Genealogical DNA" 12.1K volume, LOW competition' },
            { icon: "🔬", title: "IdeaBrowser Research", detail: "Opportunity 9/10 · Problem 8/10 · Why Now 9/10 · Feasibility 6/10 · Score 77/100" },
          ].map((item) => (
            <BentoCard key={item.title}>
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-[#1E293B] mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div className="grid grid-cols-2 gap-4">
        <BentoCard className="border-red-100 bg-red-50">
          <h3 className="font-bold text-red-700 mb-3">⚠️ Risks</h3>
          <ul className="space-y-2 text-sm text-red-600">
            {[
              "HIPAA tool adoption requires IT approval in enterprise",
              "Reddit community protective of promotional content",
              "Low direct search volume for 'cascade testing' keywords",
              "Long sales cycle for hospital enterprise accounts (3-6mo)",
            ].map((r) => <li key={r} className="flex gap-2"><span>•</span><span>{r}</span></li>)}
          </ul>
        </BentoCard>
        <BentoCard className="border-green-100 bg-green-50">
          <h3 className="font-bold text-green-700 mb-3">✅ Opportunities</h3>
          <ul className="space-y-2 text-sm text-green-600">
            {[
              "Free tier bypasses IT approval (no PHI, initials only)",
              "Individual counselor PLG → IT team follows clinical adoption",
              "Adjacent SEO terms have high volume and low competition",
              "NSGC conference presence = warm enterprise pipeline",
            ].map((o) => <li key={o} className="flex gap-2"><span>•</span><span>{o}</span></li>)}
          </ul>
        </BentoCard>
      </div>

      <p className="text-xs text-slate-400">Source: IdeaBrowser · NSGC 2023 · r/GeneticCounseling community research</p>
    </div>
  )
}

// ─── GTM Section ──────────────────────────────────────────────────────────────
function GTMSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Go-To-Market"
        title="Launch Strategy"
        subtitle="Three-phase launch targeting 8,000 genetic counselors in the US. Community seed → PLG expansion → enterprise top-down."
      />

      {/* Executive */}
      <div className="grid grid-cols-2 gap-4">
        <BentoCard className="bg-teal-50 border-teal-100 col-span-2">
          <h2 className="font-bold text-[#0F4C5C] mb-2">Core Positioning</h2>
          <p className="text-slate-600 font-medium text-lg mb-2">&ldquo;Close the cascade loop.&rdquo;</p>
          <p className="text-slate-500 text-sm">LineageAI coordinates cascade genetic testing — family trees, outreach letters, compliance logging, all in one tool. The ONLY tool that closes the cascade testing loop — not just draws pedigrees.</p>
        </BentoCard>
      </div>

      {/* Target Market */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Target Market</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              tier: "Primary", icon: "🩺", audience: "Genetic Counselors",
              detail: "8,000+ NSGC-certified in US. Hospital genetics, cancer centers, reproductive genetics. Budget authority: $200-2,000/mo software.",
              channel: "Reddit, LinkedIn, NSGC community"
            },
            {
              tier: "Secondary", icon: "🏥", audience: "Genetics Clinic Admins",
              detail: "Clinical genetics program managers. Pain: HIPAA compliance documentation, staff coordination.",
              channel: "LinkedIn, ACMG Annual Meeting, NSGC Conference"
            },
            {
              tier: "Tertiary", icon: "🎗️", audience: "Oncology Programs",
              detail: "BRCA testing cascade — most common use case. Cancer genetics coordinators in large oncology centers.",
              channel: "ASCO Annual Meeting, oncology LinkedIn communities"
            },
          ].map((seg) => (
            <BentoCard key={seg.tier}>
              <div className="text-2xl mb-2">{seg.icon}</div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block ${
                seg.tier === "Primary" ? "bg-[#0F4C5C] text-white" : "bg-slate-100 text-slate-600"
              }`}>{seg.tier}</span>
              <h3 className="font-bold text-[#1E293B] mt-2 mb-1">{seg.audience}</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">{seg.detail}</p>
              <p className="text-xs text-[#0F4C5C] font-medium">📡 {seg.channel}</p>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* 3 Phases */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">90-Day Launch Phases</h2>
        <div className="space-y-4">
          {[
            {
              phase: "Phase 1", label: "Seed Users", time: "Weeks 1-2", budget: "$0",
              goal: "10-20 real users, validate core workflow, collect testimonials",
              channels: [
                "r/GeneticCounseling organic post: 'Built this because I heard you complain about X'",
                "NSGC community forums",
                "Direct DM to 50 genetic counselors on LinkedIn (personalized)",
                "Post in 'Genetic Counseling' and 'BRCA' Facebook groups",
              ],
              cta: "Free forever for 1 case. No card. I built this because of the 70% gap problem."
            },
            {
              phase: "Phase 2", label: "Community Traction", time: "Weeks 3-6", budget: "$100-300",
              goal: "50-100 active users, first 5 paying conversions",
              channels: [
                "Reddit content strategy (educational, not promotional)",
                "LinkedIn thought leadership (1 post/week — the 70% stat is the hook)",
                "NSGC Annual Education Conference (virtual booth or networking)",
                "ProductHunt launch (prep 2 weeks in advance)",
              ],
              cta: "Conversion trigger: Email sequence when free user creates their 2nd case."
            },
            {
              phase: "Phase 3", label: "Paid Growth", time: "Months 2-3", budget: "$500-1,000/mo",
              goal: "$5K MRR",
              channels: [
                "Google Ads: 'cascade testing software', 'genetic counselor software'",
                "LinkedIn Ads: genetic counselor job title targeting, $50/day",
                "Content SEO: 'cascade testing workflow', 'BRCA family notification letter template'",
              ],
              cta: "Analyze what channels drove signups, double down."
            },
          ].map((phase, i) => (
            <BentoCard key={phase.phase} className={i === 0 ? "border-[#0F4C5C]/20 bg-teal-50/50" : ""}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-slate-400 font-bold">{phase.phase}</span>
                    <span className="font-bold text-[#1E293B] text-lg">{phase.label}</span>
                  </div>
                  <p className="text-sm text-slate-500">{phase.goal}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xs font-mono text-[#0F4C5C] font-bold">{phase.time}</div>
                  <div className="text-xs text-slate-400">Budget: {phase.budget}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Channels</h4>
                  <ul className="space-y-1">
                    {phase.channels.map((c) => (
                      <li key={c} className="text-xs text-slate-600 flex gap-2"><span className="text-[#0F4C5C] flex-shrink-0">→</span><span>{c}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <h4 className="text-xs font-bold text-amber-700 mb-1">Key Message</h4>
                  <p className="text-xs text-amber-700 italic">&ldquo;{phase.cta}&rdquo;</p>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Success Metrics</h2>
        <BentoCard>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 text-slate-400 font-medium text-xs uppercase tracking-wide">Milestone</th>
                  <th className="text-right py-2 px-4 text-slate-400 font-medium text-xs uppercase tracking-wide">Signups</th>
                  <th className="text-right py-2 px-4 text-slate-400 font-medium text-xs uppercase tracking-wide">Paying</th>
                  <th className="text-right py-2 text-slate-400 font-medium text-xs uppercase tracking-wide">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Week 1", "20", "—", "—"],
                  ["Week 2", "50", "5 trials", "—"],
                  ["Month 1", "100", "5", "$1K MRR"],
                  ["Month 3", "500", "25", "$5K MRR"],
                  ["Month 6", "2,000", "100", "$20K MRR"],
                  ["Month 12", "—", "500", "$100K ARR"],
                ].map((row, i) => (
                  <tr key={i} className={i === 5 ? "bg-teal-50 font-bold" : i % 2 === 0 ? "bg-slate-50/50" : ""}>
                    <td className="py-2.5 text-slate-700">{row[0]}</td>
                    <td className="py-2.5 px-4 text-right font-mono text-xs text-[#0F4C5C]">{row[1]}</td>
                    <td className="py-2.5 px-4 text-right font-mono text-xs text-slate-600">{row[2]}</td>
                    <td className="py-2.5 text-right font-mono text-xs text-[#F59E0B] font-bold">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Activation rate", value: ">60%", sub: "Creates at least 1 case" },
              { label: "Free → Pro conversion", value: "8-12%", sub: "Target in 30 days" },
              { label: "Monthly churn target", value: "<5%", sub: "Once stabilized" },
            ].map((kpi) => (
              <div key={kpi.label} className="text-center p-3 bg-slate-50 rounded-xl">
                <div className="font-mono font-bold text-[#0F4C5C] text-lg">{kpi.value}</div>
                <div className="text-xs font-semibold text-[#1E293B]">{kpi.label}</div>
                <div className="text-xs text-slate-400">{kpi.sub}</div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Budget */}
      <BentoCard className="bg-slate-50">
        <h2 className="font-bold text-[#1E293B] mb-4">Month 1 Budget</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { item: "Organic/Community", amount: "$0", note: "Reddit, LinkedIn, Facebook — all free" },
            { item: "LinkedIn Sales Navigator", amount: "$99", note: "1 month — counselor prospecting" },
            { item: "Google Ads test", amount: "$200", note: "Only if organic stalls" },
          ].map((item) => (
            <div key={item.item} className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="font-bold text-[#0F4C5C] text-xl font-mono">{item.amount}</div>
              <div className="text-sm font-semibold text-[#1E293B] mt-1">{item.item}</div>
              <div className="text-xs text-slate-400 mt-0.5">{item.note}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-teal-50 rounded-xl border border-teal-100">
          <p className="text-sm text-teal-700 font-medium">Total Month 1: ~$300 optional. Lead with organic. Paid only if organic stalls.</p>
        </div>
      </BentoCard>
    </div>
  )
}

// ─── Marketing Section ────────────────────────────────────────────────────────
function MarketingSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Marketing"
        title="Brand Voice & Content Strategy"
        subtitle="Serious but not sterile. Notion meets clinical SaaS. We lead with data, land with empathy, close with practicality."
      />

      {/* Brand Voice */}
      <div className="grid grid-cols-2 gap-4">
        <BentoCard className="bg-green-50 border-green-100">
          <h3 className="font-bold text-green-700 mb-3">✓ DO</h3>
          <ul className="space-y-2 text-sm text-green-700">
            {[
              "Lead with data: '7 in 10 at-risk families never get tested'",
              "Write for the genetic counselor who is tired of paper letters",
              "Be specific: name the workflows we replace",
              "Use 'close the loop' as the recurring metaphor",
              "Acknowledge HIPAA reality — show we take it seriously",
            ].map((item) => <li key={item} className="flex gap-2"><span>•</span><span>{item}</span></li>)}
          </ul>
        </BentoCard>
        <BentoCard className="bg-red-50 border-red-100">
          <h3 className="font-bold text-red-700 mb-3">✗ DON&apos;T</h3>
          <ul className="space-y-2 text-sm text-red-600">
            {[
              "Use DNA helix imagery or doctor stock photos",
              "Use 'revolutionary' or 'disrupting' or 'AI-powered'",
              "Write generic healthcare marketing copy",
              "Promise features we don't have",
              "Use fear-based copy (patient safety is already implied)",
            ].map((item) => <li key={item} className="flex gap-2"><span>•</span><span>{item}</span></li>)}
          </ul>
        </BentoCard>
      </div>

      {/* Tone examples */}
      <BentoCard>
        <h3 className="font-bold text-[#0F4C5C] mb-4">Tone Examples</h3>
        <div className="space-y-3">
          {[
            { good: "Cascade testing coordination, without the paper trail.", bad: "Our revolutionary AI transforms genetic counseling workflows." },
            { good: "Your next family case is waiting. Start free.", bad: "Empowering genetic counselors to deliver better patient outcomes." },
          ].map((ex, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                <span className="text-xs font-bold text-green-600 block mb-1">✓ Good</span>
                <p className="text-sm text-green-700">&ldquo;{ex.good}&rdquo;</p>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                <span className="text-xs font-bold text-red-500 block mb-1">✗ Avoid</span>
                <p className="text-sm text-red-600">&ldquo;{ex.bad}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>

      {/* Messaging pillars */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Messaging Pillars</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "🔄", title: "Close the Loop", msg: "Progeny draws trees. LineageAI tracks who you actually reached.", sub: "The core differentiator — say it in every channel." },
            { icon: "🛡️", title: "HIPAA-Safe Letters", msg: "AI generates, you review, one-click send. Audit trail auto-created.", sub: "Addresses the #1 adoption objection — compliance." },
            { icon: "📋", title: "Compliance Without Paperwork", msg: "Every contact logged. Exportable for accreditation.", sub: "ROI message for clinic administrators and department heads." },
          ].map((p, i) => (
            <BentoCard key={p.title} className={i === 0 ? "bg-[#0F4C5C] text-white border-[#0F4C5C]" : ""}>
              <span className="text-3xl block mb-3">{p.icon}</span>
              <h3 className={`font-bold text-lg mb-2 ${i === 0 ? "text-white" : "text-[#1E293B]"}`}>{p.title}</h3>
              <p className={`text-sm mb-2 font-medium ${i === 0 ? "text-teal-200" : "text-[#0F4C5C]"}`}>&ldquo;{p.msg}&rdquo;</p>
              <p className={`text-xs ${i === 0 ? "text-teal-300" : "text-slate-400"}`}>{p.sub}</p>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* 30-day content calendar */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Month 1 Content Calendar</h2>
        <BentoCard>
          <div className="space-y-4">
            {[
              {
                week: "Week 1 — Seed Launch",
                items: [
                  { day: "Day 1", channel: "LinkedIn", desc: "Long-form article: 'Why 7 in 10 at-risk family members never get genetic testing'" },
                  { day: "Day 2", channel: "Reddit", desc: "r/GeneticCounseling: 'Built a tool for cascade testing coordination — free to try'" },
                  { day: "Day 3", channel: "LinkedIn", desc: "Short post: 'The 30-minute problem. Per case. Manually. We automated that.'" },
                  { day: "Day 5", channel: "Email", desc: "30 LinkedIn outreaches: 'Quick question about your cascade testing workflow'" },
                ],
              },
              {
                week: "Week 2 — Demo + Social Proof",
                items: [
                  { day: "Day 8", channel: "LinkedIn", desc: "Demo video: creating a cascade case in 3 minutes (Loom)" },
                  { day: "Day 9", channel: "Reddit", desc: "Demo post in r/GeneticCounseling — respond to every comment personally" },
                  { day: "Day 12", channel: "Facebook", desc: "Intro in Genetic Counseling and BRCA community groups" },
                ],
              },
              {
                week: "Week 3 — Directories + Testimonials",
                items: [
                  { day: "Day 15", channel: "BetaList", desc: "Submit to BetaList" },
                  { day: "Day 16", channel: "SaaSHub", desc: "Submit to SaaSHub" },
                  { day: "Day 17", channel: "Capterra", desc: "Submit to Capterra Healthcare IT category" },
                ],
              },
              {
                week: "Week 4 — ProductHunt Prep + Paid Test",
                items: [
                  { day: "Day 22", channel: "LinkedIn", desc: "Pre-launch post: 'We're launching on ProductHunt next week...'" },
                  { day: "Day 23", channel: "Google Ads", desc: "Start $100 budget test: keyword 'cascade testing software'" },
                  { day: "Day 25", channel: "LinkedIn", desc: "Anonymized user story post" },
                ],
              },
            ].map((week) => (
              <div key={week.week}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#0F4C5C] mb-2">{week.week}</h4>
                <div className="space-y-1">
                  {week.items.map((item) => (
                    <div key={item.day} className="flex gap-3 py-2 border-b border-slate-50">
                      <span className="font-mono text-xs text-slate-400 flex-shrink-0 w-12">{item.day}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 self-start ${
                        item.channel === "LinkedIn" ? "bg-blue-100 text-blue-700"
                          : item.channel === "Reddit" ? "bg-orange-100 text-orange-700"
                          : item.channel === "Email" ? "bg-teal-100 text-teal-700"
                          : item.channel === "Facebook" ? "bg-indigo-100 text-indigo-700"
                          : item.channel === "Google Ads" ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>{item.channel}</span>
                      <span className="text-sm text-slate-600">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* 30/60/90 milestones */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">30/60/90 Day Milestones</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              period: "30 Days", icon: "🌱",
              goals: ["100 signups", "50 active cases created", "5 paying customers ($1K MRR)", "ProductHunt launch completed", "50+ LinkedIn connections in target segment"],
            },
            {
              period: "60 Days", icon: "📈",
              goals: ["300 signups", "15 paying customers ($3K MRR)", "3 SEO blog posts published", "First conference outreach initiated", "1 user case study published"],
            },
            {
              period: "90 Days", icon: "🚀",
              goals: ["600 signups", "30 paying customers ($6K MRR)", "LinkedIn Ads running, optimized", "Enterprise pipeline: 10 hospital systems in outreach", "Google Ads ROI positive"],
            },
          ].map((period, i) => (
            <BentoCard key={period.period} className={i === 2 ? "bg-teal-50 border-teal-100" : ""}>
              <span className="text-2xl block mb-2">{period.icon}</span>
              <h3 className="font-bold text-[#0F4C5C] text-lg mb-3">{period.period}</h3>
              <ul className="space-y-1.5">
                {period.goals.map((g) => (
                  <li key={g} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-[#0F4C5C] flex-shrink-0">•</span><span>{g}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Brand Section ────────────────────────────────────────────────────────────
function BrandSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Brand"
        title="Visual Identity & Design System"
        subtitle="Deep teal meets warm amber. Clinical trust with human warmth. Not another navy-and-white EHR."
      />

      {/* Brand essence */}
      <BentoCard className="bg-[#0F4C5C]">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-3xl font-bold text-white">L</span>
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-2">LineageAI</h2>
          <p className="text-teal-200 text-lg">Cascade Genetic Testing Coordination</p>
          <p className="text-teal-300 text-sm mt-2 max-w-md mx-auto">
            The unforgettable brand element: the color-coded family tree pedigree — each node is a real outreach status. The product&apos;s entire value prop visible at first scroll.
          </p>
        </div>
      </BentoCard>

      {/* Color Palette */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Primary Colors</h3>
            <div className="space-y-3">
              {[
                { name: "Deep Teal", hex: "#0F4C5C", usage: "Primary — clinical trust, not navy EHR" },
                { name: "Warm Amber", hex: "#F59E0B", usage: "Accent — human warmth, CTA buttons" },
                { name: "Warm Off-White", hex: "#F8F7F4", usage: "Background — not clinical white" },
                { name: "Rich Slate", hex: "#1E293B", usage: "Text — not pure black" },
              ].map((color) => (
                <div key={color.hex} className="flex items-center gap-4 bg-white rounded-xl border border-slate-100 p-3">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 shadow-sm" style={{ background: color.hex }} />
                  <div>
                    <div className="font-semibold text-[#1E293B] text-sm">{color.name}</div>
                    <div className="font-mono text-xs text-slate-400">{color.hex}</div>
                    <div className="text-xs text-slate-400">{color.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Status Colors (Pedigree)</h3>
            <div className="space-y-3">
              {[
                { name: "Referred", hex: "#0F4C5C", usage: "Proband / index patient" },
                { name: "Tested", hex: "#22c55e", usage: "Completed genetic testing" },
                { name: "Contacted", hex: "#F59E0B", usage: "Outreach sent, awaiting response" },
                { name: "Pending", hex: "#94a3b8", usage: "Not yet contacted" },
              ].map((color) => (
                <div key={color.hex} className="flex items-center gap-4 bg-white rounded-xl border border-slate-100 p-3">
                  <div className="w-12 h-12 rounded-full flex-shrink-0 shadow-sm" style={{ background: color.hex }} />
                  <div>
                    <div className="font-semibold text-[#1E293B] text-sm">{color.name}</div>
                    <div className="font-mono text-xs text-slate-400">{color.hex}</div>
                    <div className="text-xs text-slate-400">{color.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Typography</h2>
        <div className="grid grid-cols-3 gap-4">
          <BentoCard>
            <h3 className="font-bold text-[#0F4C5C] text-sm mb-3">Display — Cabinet Grotesk</h3>
            <div className="font-display text-4xl font-bold text-[#1E293B] leading-tight">Aa</div>
            <div className="font-display text-xl font-bold text-[#0F4C5C] mt-2">Headlines</div>
            <p className="text-xs text-slate-400 mt-2">Used for: H1-H2, slide titles, stat numbers, logo mark</p>
          </BentoCard>
          <BentoCard>
            <h3 className="font-bold text-[#0F4C5C] text-sm mb-3">Body — Plus Jakarta Sans</h3>
            <div className="text-3xl font-semibold text-[#1E293B] leading-tight">Aa</div>
            <div className="text-xl text-slate-600 mt-2">Body text</div>
            <p className="text-xs text-slate-400 mt-2">Used for: body copy, UI labels, navigation, descriptions</p>
          </BentoCard>
          <BentoCard>
            <h3 className="font-bold text-[#0F4C5C] text-sm mb-3">Mono — DM Mono</h3>
            <div className="font-mono text-3xl font-medium text-[#1E293B] leading-tight">0123</div>
            <div className="font-mono text-xl text-[#0F4C5C] mt-2">Data</div>
            <p className="text-xs text-slate-400 mt-2">Used for: stats, metrics, case IDs, member initials, code</p>
          </BentoCard>
        </div>
      </div>

      {/* Do/Don't */}
      <div className="grid grid-cols-2 gap-4">
        <BentoCard className="bg-green-50 border-green-100">
          <h3 className="font-bold text-green-700 mb-3">✓ Brand Do&apos;s</h3>
          <ul className="space-y-2 text-sm text-green-700">
            {[
              "Use the pedigree tree as the signature visual element",
              "Amber for CTAs and single accent highlights only",
              "Deep teal as the dominant brand color",
              "Warm off-white background (never clinical white)",
              "Generous whitespace — clinical precision, not cramped",
              "Monospace for all data, stats, and case IDs",
            ].map((item) => <li key={item} className="flex gap-2"><span className="flex-shrink-0">✓</span><span>{item}</span></li>)}
          </ul>
        </BentoCard>
        <BentoCard className="bg-red-50 border-red-100">
          <h3 className="font-bold text-red-700 mb-3">✗ Brand Don&apos;ts</h3>
          <ul className="space-y-2 text-sm text-red-600">
            {[
              "DNA helix imagery — too generic, says 'generic biotech'",
              "Doctor/nurse stock photography",
              "Pure white backgrounds — too sterile",
              "Pure black text — use rich slate (#1E293B)",
              "Red for anything other than critical errors",
              "More than 2-3 colors per screen at once",
            ].map((item) => <li key={item} className="flex gap-2"><span className="flex-shrink-0">✗</span><span>{item}</span></li>)}
          </ul>
        </BentoCard>
      </div>

      {/* Taglines */}
      <BentoCard>
        <h2 className="font-bold text-[#0F4C5C] mb-4">Brand Copy</h2>
        <div className="space-y-3">
          {[
            { label: "Tagline", text: "Close the cascade loop." },
            { label: "Subtitle", text: "LineageAI coordinates cascade genetic testing — family trees, outreach letters, compliance logging, all in one tool." },
            { label: "Hero headline", text: "Stop losing families between test results and outreach." },
            { label: "Hero subhead", text: "7 in 10 at-risk family members never get tested. LineageAI changes that — map, reach, track, and document every family cascade." },
            { label: "CTA primary", text: "Start Free — No Card Required" },
            { label: "Footer tagline", text: "Coordinating family health, one cascade at a time." },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 py-2 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide w-32 flex-shrink-0 pt-0.5">{item.label}</span>
              <span className="text-sm text-[#1E293B]">{item.text}</span>
            </div>
          ))}
        </div>
      </BentoCard>
    </div>
  )
}

// ─── Pitch Section ────────────────────────────────────────────────────────────
function PitchSection() {
  const slides = [
    { num: 1, title: "Cover", summary: "LineageAI · Cascade Genetic Testing Coordination · 'Close the cascade loop.'" },
    { num: 2, title: "The Problem", summary: "7 in 10 at-risk family members never get tested. Not because they refuse. Because the outreach never reaches them." },
    { num: 3, title: "Market Opportunity", summary: "$100M+ problem. 8,000+ counselors in the US. 40,000+ globally. Zero purpose-built solutions." },
    { num: 4, title: "The Solution", summary: "Map → Reach → Track + Document. Interactive family tree with color-coded outreach status nodes." },
    { num: 5, title: "Product Demo", summary: "3 steps: Create a case → Map the family tree → Reach + track. Live at lineageai.ashketing.com." },
    { num: 6, title: "Differentiation", summary: "Progeny draws trees. LineageAI closes the loop. Feature comparison: outreach tracking, compliance trail, AI letters — all exclusive to LineageAI." },
    { num: 7, title: "Traction", summary: "Pre-launch. Community signals strong. Reddit/Facebook validation. IdeaBrowser 77/100. Live product, 21 routes." },
    { num: 8, title: "Business Model", summary: "Freemium → SaaS. Pilot (Free) → Pro ($199/mo) → Enterprise ($499/mo). Target $100K ARR in 12 months." },
    { num: 9, title: "Go-To-Market", summary: "3 moves: Community seed (Week 1-2, $0) → PLG expansion (Month 1-2, $300) → Enterprise top-down (Month 3+, $1.5K/mo)." },
    { num: 10, title: "Team", summary: "ChimeStream Product Studio. AI/automation expertise. Serial product launches. Full-stack B2B SaaS." },
    { num: 11, title: "The Ask", summary: "Q1: 100 signups, 5 paying. Q2: 300 signups, 25 paying. Q3: 600 signups, 50 paying. Q4: $100K ARR." },
    { num: 12, title: "Close", summary: "Every at-risk family deserves a letter that arrives. Try LineageAI Free → lineageai.ashketing.com." },
  ]

  return (
    <div className="space-y-8">
      <SectionHeader
        label="Pitch Deck"
        title="12-Slide Investor Deck"
        subtitle="Tone: clinical precision meets startup urgency. Visual direction: deep teal + warm amber on warm off-white."
      />

      <Link href="/deck" target="_blank"
        className="flex items-center justify-between bg-[#0F4C5C] text-white rounded-2xl px-6 py-4 hover:bg-teal-700 transition-colors">
        <div>
          <div className="font-bold text-lg">View Full Interactive Pitch Deck</div>
          <div className="text-teal-200 text-sm">Arrow keys to navigate · F for fullscreen · 12 slides</div>
        </div>
        <ExternalLink className="w-5 h-5 flex-shrink-0" />
      </Link>

      <div>
        <h2 className="font-bold text-[#1E293B] text-lg mb-4">Slide-by-Slide Overview</h2>
        <div className="space-y-2">
          {slides.map((slide) => (
            <div key={slide.num} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-teal-200 transition-colors">
              <div className="font-mono text-2xl font-bold text-[#0F4C5C]/20 w-10 flex-shrink-0 leading-none pt-0.5">
                {String(slide.num).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-bold text-[#1E293B] text-sm mb-0.5">{slide.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{slide.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design notes */}
      <BentoCard className="bg-amber-50 border-amber-100">
        <h3 className="font-bold text-amber-700 mb-3">🎨 Design Notes</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-amber-700">
          {[
            { label: "Colors", text: "Deep teal (#0F4C5C) + warm amber (#F59E0B) on warm off-white (#F8F7F4)" },
            { label: "Fonts", text: "Cabinet Grotesk (display) + Plus Jakarta Sans (body) + DM Mono (data)" },
            { label: "Transitions", text: "Framer Motion: slide left (forward) / slide right (back), 0.3s ease-in-out" },
            { label: "Entry animations", text: "Fade up, 0.4s delay per element — family tree nodes animate in sequentially" },
            { label: "Navigation", text: "Arrow keys + click. Progress dots at bottom. Slide counter top-right. F = fullscreen." },
            { label: "Special component", text: "Slide 4: interactive family tree — hover node → tooltip shows status. The product demo in one component." },
          ].map((note) => (
            <div key={note.label}>
              <span className="font-bold">{note.label}:</span> {note.text}
            </div>
          ))}
        </div>
      </BentoCard>
    </div>
  )
}

// ─── Main Docs Page ───────────────────────────────────────────────────────────
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("research")
  const [mobileOpen, setMobileOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Close mobile menu on section change
  useEffect(() => {
    setMobileOpen(false)
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeSection])

  // Parse hash on load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as SectionId
    if (["research", "gtm", "marketing", "brand", "pitch"].includes(hash)) {
      setActiveSection(hash)
    }
  }, [])

  const SECTION_CONTENT: Record<SectionId, React.ReactNode> = {
    research: <ResearchSection />,
    gtm: <GTMSection />,
    marketing: <MarketingSection />,
    brand: <BrandSection />,
    pitch: <PitchSection />,
  }

  const current = NAV_SECTIONS.find((s) => s.id === activeSection)!

  return (
    <div className="bg-[#F8F7F4] min-h-screen font-sans">
      {/* Top nav bar */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-[#0F4C5C] transition-colors">LineageAI</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Docs</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0F4C5C] font-semibold">{current.label}</span>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="https://lineageai.ashketing.com" target="_blank"
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#0F4C5C] transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </Link>
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto flex min-h-screen relative">
        {/* Sidebar — desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0 border-r border-slate-200 bg-white sticky top-[53px] self-start h-[calc(100vh-53px)] overflow-y-auto">
          <div className="p-5 space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-300 px-3 mb-4">Documentation</p>
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => { setActiveSection(section.id); window.history.replaceState(null, "", `#${section.id}`) }}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  activeSection === section.id
                    ? "bg-teal-50 text-[#0F4C5C] font-semibold border border-teal-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="text-base">{section.icon}</span>
                {section.label}
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
              <a href="https://lineageai.ashketing.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-[#0F4C5C] rounded-xl hover:bg-slate-50 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Live Site
              </a>
              <Link href="/deck"
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-[#0F4C5C] rounded-xl hover:bg-slate-50 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Pitch Deck
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setMobileOpen(false)}>
            <aside className="w-64 h-full bg-white p-5 space-y-1 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-300 px-3 mb-4">Documentation</p>
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => { setActiveSection(section.id); window.history.replaceState(null, "", `#${section.id}`) }}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    activeSection === section.id
                      ? "bg-teal-50 text-[#0F4C5C] font-semibold border border-teal-100"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="text-base">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </aside>
          </div>
        )}

        {/* Main content */}
        <main ref={contentRef} className="flex-1 px-6 md:px-12 py-10 max-w-3xl">
          {SECTION_CONTENT[activeSection]}
        </main>
      </div>
    </div>
  )
}
