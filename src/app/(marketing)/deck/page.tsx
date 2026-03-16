"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

// ─── Interactive Family Tree ────────────────────────────────────────────────
const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  tested:    { bg: "#22c55e", text: "#fff", label: "Tested" },
  contacted: { bg: "#F59E0B", text: "#fff", label: "Contacted" },
  pending:   { bg: "#94a3b8", text: "#fff", label: "Pending" },
  referred:  { bg: "#0F4C5C", text: "#fff", label: "Referred" },
}

const TREE_NODES = [
  { id: "P1", label: "P1", role: "Proband", status: "referred",  x: 50,  y: 20  },
  { id: "S1", label: "S1", role: "Sibling",    status: "tested",    x: 20,  y: 55  },
  { id: "S2", label: "S2", role: "Sibling",    status: "contacted", x: 50,  y: 55  },
  { id: "S3", label: "S3", role: "Sibling",    status: "pending",   x: 80,  y: 55  },
  { id: "C1", label: "C1", role: "Child",      status: "tested",    x: 10,  y: 85  },
  { id: "C2", label: "C2", role: "Child",      status: "contacted", x: 35,  y: 85  },
  { id: "C3", label: "C3", role: "Child",      status: "pending",   x: 65,  y: 85  },
]

const TREE_EDGES = [
  ["P1", "S1"], ["P1", "S2"], ["P1", "S3"],
  ["S1", "C1"], ["S1", "C2"], ["S3", "C3"],
]

function FamilyTree({ compact = false }: { compact?: boolean }) {
  const [tooltip, setTooltip] = useState<{ node: typeof TREE_NODES[0]; visible: boolean } | null>(null)
  const size = compact ? 32 : 44

  return (
    <div className="relative w-full h-full select-none">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {TREE_EDGES.map(([from, to]) => {
          const n1 = TREE_NODES.find((n) => n.id === from)!
          const n2 = TREE_NODES.find((n) => n.id === to)!
          return (
            <line
              key={`${from}-${to}`}
              x1={n1.x} y1={n1.y + 2.5}
              x2={n2.x} y2={n2.y - 2.5}
              stroke="#cbd5e1" strokeWidth="0.8"
            />
          )
        })}
        {TREE_NODES.map((node, i) => {
          const color = STATUS_COLORS[node.status]
          return (
            <g key={node.id}
              onMouseEnter={() => setTooltip({ node, visible: true })}
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: "pointer" }}
            >
              <motion.circle
                cx={node.x} cy={node.y} r={compact ? 4.5 : 5.5}
                fill={color.bg}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
              />
              <text x={node.x} y={node.y + 0.8} textAnchor="middle" dominantBaseline="middle"
                fontSize={compact ? 2.4 : 3} fill="#fff" fontWeight="700" style={{ pointerEvents: "none" }}>
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
      {tooltip && (
        <div className="absolute top-0 left-0 z-50 pointer-events-none"
          style={{ transform: `translate(${tooltip.node.x}%,${tooltip.node.y}%)` }}>
          <div className="ml-2 -mt-8 bg-[#1E293B] text-white text-xs px-2 py-1 rounded-lg shadow-lg whitespace-nowrap">
            {tooltip.node.label} — {tooltip.node.role}: {STATUS_COLORS[tooltip.node.status].label}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className={`absolute bottom-0 left-0 flex flex-wrap gap-2 ${compact ? "text-[10px]" : "text-xs"}`}>
        {Object.entries(STATUS_COLORS).map(([key, val]) => (
          <span key={key} className="flex items-center gap-1">
            <span className="inline-block rounded-full w-2.5 h-2.5 flex-shrink-0" style={{ background: val.bg }} />
            <span className="text-slate-500">{val.label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Slide Definitions ───────────────────────────────────────────────────────
const SLIDES = [
  // 1 — COVER
  {
    id: 1,
    dark: true,
    bg: "bg-[#0F4C5C]",
    content: (
      <div className="flex flex-col items-center justify-center text-center h-full px-8 gap-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="w-20 h-20 bg-white/15 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <span className="text-4xl font-bold text-white font-display">L</span>
          </div>
          <h1 className="font-display text-7xl md:text-8xl font-bold text-white tracking-tight leading-none">
            LineageAI
          </h1>
          <p className="text-2xl text-teal-200 mt-3 font-light">Cascade Genetic Testing Coordination</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-2">
          <p className="text-3xl md:text-4xl font-semibold text-[#F59E0B] font-display italic">
            &ldquo;Close the cascade loop.&rdquo;
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="flex gap-8 text-sm text-teal-300 mt-4">
          <span>lineageai.ashketing.com</span>
          <span>·</span>
          <span>hello@lineageai.io</span>
        </motion.div>
      </div>
    ),
  },

  // 2 — THE PROBLEM
  {
    id: 2,
    dark: false,
    bg: "bg-[#F8F7F4]",
    content: (
      <div className="max-w-5xl mx-auto w-full px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 block">The Problem</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-[#1E293B] tracking-tight mb-3 leading-tight">
            7 in 10 at-risk family members<br />never get tested.
          </h2>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl">
            Not because they refuse. Because <span className="text-[#0F4C5C] font-semibold">the outreach never reaches them.</span>
          </p>
        </motion.div>
        <div className="grid grid-cols-3 gap-6">
          {[
            { stat: "30 min", label: "per case drafting letters", sub: "Genetic counselors write cascade letters manually — every time" },
            { stat: "0 tools", label: "track outreach status", sub: "No system confirms whether family members were actually contacted" },
            { stat: "Paper", label: "compliance trail", sub: "Compliance documentation is a spreadsheet or filing cabinet nightmare" },
          ].map((item, i) => (
            <motion.div key={item.stat}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
              <div className="font-display text-5xl font-bold text-[#0F4C5C] mb-2">{item.stat}</div>
              <div className="font-semibold text-[#1E293B] mb-1 text-sm">{item.label}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{item.sub}</div>
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="text-xs text-slate-400 mt-6">Source: NSGC 2023 · r/GeneticCounseling community research</motion.p>
      </div>
    ),
  },

  // 3 — MARKET OPPORTUNITY
  {
    id: 3,
    dark: true,
    bg: "bg-[#0F4C5C]",
    content: (
      <div className="max-w-5xl mx-auto w-full px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 block">Market Opportunity</span>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight mb-2 leading-tight">
            A $100M+ problem.<br />Zero purpose-built solutions.
          </h2>
          <p className="text-teal-200 text-lg mb-8">No tool closes the loop between diagnosis and family outreach.</p>
        </motion.div>
        <div className="grid grid-cols-3 gap-5 mb-8">
          {[
            { num: "8,000+", label: "Certified counselors in the US", sub: "NSGC 2023" },
            { num: "40,000+", label: "Globally", sub: "NSGC/EBGP estimates" },
            { num: "$100M+", label: "TAM — genetics software (US)", sub: "SAM: $15M cascade tools" },
          ].map((item, i) => (
            <motion.div key={item.num}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <div className="font-display text-4xl font-bold text-[#F59E0B] mb-1">{item.num}</div>
              <div className="text-white font-semibold text-sm mb-0.5">{item.label}</div>
              <div className="text-teal-300 text-xs">{item.sub}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-teal-200 text-sm font-semibold mb-3">Competitive landscape</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Progeny", desc: "Draws pedigrees. Doesn't track outreach." },
              { name: "Epic/EHR", desc: "Clinical records. No cascade coordination layer." },
              { name: "Excel/Paper", desc: "The current 'solution' for most clinics." },
            ].map((c) => (
              <div key={c.name}>
                <span className="text-white font-semibold text-sm">{c.name}</span>
                <p className="text-teal-300 text-xs mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    ),
  },

  // 4 — THE SOLUTION (with interactive family tree)
  {
    id: 4,
    dark: false,
    bg: "bg-white",
    content: (
      <div className="max-w-5xl mx-auto w-full px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C5C] mb-3 block">The Solution</span>
          <h2 className="font-display text-5xl font-bold text-[#1E293B] tracking-tight mb-2">
            LineageAI closes the loop.
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-8 mt-6">
          {/* Left: feature list */}
          <div className="space-y-4">
            {[
              { icon: "🗺️", title: "Map", desc: "Build a visual family tree. Color-coded nodes show testing status at a glance. Hover any node to see outreach status." },
              { icon: "📨", title: "Reach", desc: "Generate HIPAA-compliant outreach letters in under 60 seconds. Review, approve, send. Audit trail auto-created." },
              { icon: "📋", title: "Track + Document", desc: "Every contact recorded. Compliance audit trail auto-generated. Export-ready PDF for accreditation." },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-bold text-[#0F4C5C] mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Right: interactive family tree */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Live Status — hover a node</p>
            <div className="flex-1 min-h-0" style={{ height: 200 }}>
              <FamilyTree />
            </div>
          </motion.div>
        </div>
      </div>
    ),
  },

  // 5 — PRODUCT DEMO
  {
    id: 5,
    dark: false,
    bg: "bg-[#F8F7F4]",
    content: (
      <div className="max-w-5xl mx-auto w-full px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C5C] mb-3 block">How It Works</span>
          <h2 className="font-display text-5xl font-bold text-[#1E293B] tracking-tight mb-8">
            3 steps. One workflow.
          </h2>
        </motion.div>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              step: "01", title: "Create a case",
              desc: "Upload patient variant results. Enter referring counselor and clinic details.",
              detail: "Case creation form — variant type, patient ID, clinic, counselor assigned."
            },
            {
              step: "02", title: "Map the family tree",
              desc: "Add family members with their relationship and risk status. Nodes auto-color by testing status.",
              detail: "Family tree builder — drag to add nodes, assign relationship, status auto-tracks."
            },
            {
              step: "03", title: "Reach + track",
              desc: "AI generates the outreach letter. You review, approve, send. Status updates automatically.",
              detail: "Letter generator + status tracker — one-click send, auto-compliance log."
            },
          ].map((s, i) => (
            <motion.div key={s.step}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.15 }}
              className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
              <div className="font-mono text-5xl font-bold text-[#0F4C5C]/20 mb-4 leading-none">{s.step}</div>
              <h3 className="font-display font-bold text-[#1E293B] text-xl mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">{s.desc}</p>
              <p className="text-xs text-slate-400 italic">{s.detail}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="mt-6 text-center">
          <a href="https://lineageai.ashketing.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#0F4C5C] font-semibold hover:underline text-sm">
            See a live demo → lineageai.ashketing.com
          </a>
        </motion.div>
      </div>
    ),
  },

  // 6 — DIFFERENTIATION
  {
    id: 6,
    dark: true,
    bg: "bg-[#1E293B]",
    content: (
      <div className="max-w-4xl mx-auto w-full px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 block">Differentiation</span>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight mb-2">
            The only tool that tracks outreach,<br />not just pedigree history.
          </h2>
          <p className="text-slate-300 text-lg mb-8">Progeny draws trees. <span className="text-[#F59E0B] font-bold">LineageAI closes the loop.</span></p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/10">
                  <th className="text-left px-5 py-3 text-slate-400 font-medium">Feature</th>
                  <th className="px-5 py-3 text-center">
                    <span className="bg-[#F59E0B] text-white text-xs font-bold px-3 py-1 rounded-full">LineageAI</span>
                  </th>
                  <th className="text-center px-5 py-3 text-slate-400 font-medium">Progeny</th>
                  <th className="text-center px-5 py-3 text-slate-400 font-medium">Excel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Family tree builder", true, true, false],
                  ["Outreach letter generation", true, false, false],
                  ["Contact status tracking", true, false, "manual"],
                  ["Compliance audit trail", true, false, false],
                  ["HIPAA BAA available", true, true, null],
                  ["AI letter drafting", true, false, false],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white/5" : "bg-transparent"}>
                    <td className="px-5 py-3 text-slate-300">{row[0]}</td>
                    {[1, 2, 3].map((col) => (
                      <td key={col} className="text-center px-5 py-3">
                        {row[col] === true ? <span className="text-green-400 font-bold">✓</span>
                          : row[col] === false ? <span className="text-red-400/60">✗</span>
                          : row[col] === "manual" ? <span className="text-amber-400 text-xs">Manual</span>
                          : <span className="text-slate-500 text-xs">N/A</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    ),
  },

  // 7 — TRACTION
  {
    id: 7,
    dark: false,
    bg: "bg-white",
    content: (
      <div className="max-w-5xl mx-auto w-full px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C5C] mb-3 block">Early Validation</span>
          <h2 className="font-display text-5xl font-bold text-[#1E293B] tracking-tight mb-2">
            Pre-launch. Strong signals.
          </h2>
          <p className="text-slate-500 text-lg mb-8">The market is ready. We haven&apos;t started pushing yet.</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Community Signals</h3>
            {[
              { icon: "💬", title: "r/GeneticCounseling", stat: "4 subreddits · 2.5M+ members", desc: "Multiple threads confirming this exact pain point" },
              { icon: "👥", title: "Facebook genetics groups", stat: "4 groups · 150K+ members", desc: "Direct confirmation of manual letter drafting pain" },
              { icon: "📊", title: "IdeaBrowser score", stat: "77/100 — PROCEED", desc: "Opportunity 9/10 · Problem 8/10 · Why Now 9/10" },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-[#1E293B] text-sm">{item.title}</div>
                  <div className="text-[#0F4C5C] text-xs font-medium">{item.stat}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Status</h3>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="p-5 bg-teal-50 rounded-xl border border-teal-100">
              <div className="font-bold text-[#0F4C5C] mb-2">Live at lineageai.ashketing.com</div>
              <ul className="text-sm text-teal-700 space-y-1">
                <li>✓ 21 routes built and tested</li>
                <li>✓ Free tier active — no card required</li>
                <li>✓ HIPAA-compliant letter generation</li>
                <li>✓ Full compliance audit trail</li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
              className="p-5 bg-amber-50 rounded-xl border border-amber-100">
              <div className="font-bold text-amber-700 mb-2">Keyword Signal</div>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>📈 &ldquo;Ancestry DNA genealogy&rdquo;: +15,900% search growth</li>
                <li>🔍 &ldquo;Genealogical DNA&rdquo;: 12.1K volume, LOW competition</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    ),
  },

  // 8 — BUSINESS MODEL
  {
    id: 8,
    dark: false,
    bg: "bg-[#F8F7F4]",
    content: (
      <div className="max-w-5xl mx-auto w-full px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C5C] mb-3 block">Business Model</span>
          <h2 className="font-display text-5xl font-bold text-[#1E293B] tracking-tight mb-2">
            Freemium → SaaS.<br />High-intent users, clinical budget.
          </h2>
        </motion.div>
        <div className="grid grid-cols-3 gap-5 mt-8">
          {[
            {
              tier: "Pilot", price: "Free", period: "",
              highlight: false,
              features: ["1 active case", "3 family members", "Basic templates", "No card required"],
              cta: "Try it on your next complex case"
            },
            {
              tier: "Pro", price: "$199", period: "/mo",
              highlight: true,
              features: ["Unlimited cases", "Full letter library", "Compliance export", "Annual: $1,990/yr (save $398)"],
              cta: "Less than 2 hours of billing"
            },
            {
              tier: "Enterprise", price: "$499", period: "/mo",
              highlight: false,
              features: ["BAA included", "SSO + API access", "Custom templates", "Your legal team will be happy"],
              cta: "Direct hospital outreach"
            },
          ].map((tier, i) => (
            <motion.div key={tier.tier}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className={`rounded-2xl p-7 flex flex-col relative ${
                tier.highlight
                  ? "bg-[#0F4C5C] text-white shadow-2xl shadow-teal-900/30 -mt-2"
                  : "bg-white border border-slate-100"
              }`}>
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  MOST POPULAR
                </span>
              )}
              <div className={`text-sm font-bold mb-1 ${tier.highlight ? "text-teal-300" : "text-slate-400"}`}>{tier.tier}</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className={`font-display text-4xl font-bold ${tier.highlight ? "text-white" : "text-[#1E293B]"}`}>{tier.price}</span>
                <span className={`text-sm ${tier.highlight ? "text-teal-300" : "text-slate-400"}`}>{tier.period}</span>
              </div>
              <ul className={`space-y-2 text-sm flex-1 mb-4 ${tier.highlight ? "text-teal-200" : "text-slate-500"}`}>
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className={tier.highlight ? "text-amber-400" : "text-[#0F4C5C]"}>•</span> {f}
                  </li>
                ))}
              </ul>
              <p className={`text-xs italic ${tier.highlight ? "text-teal-300" : "text-slate-400"}`}>{tier.cta}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="flex justify-center gap-12 mt-7">
          {[
            { val: "$1K MRR", label: "Month 1 (5 Pro)" },
            { val: "$5K MRR", label: "Month 3 (25 Pro)" },
            { val: "$100K ARR", label: "Month 12" },
          ].map((m) => (
            <div key={m.val} className="text-center">
              <div className="font-mono font-bold text-[#0F4C5C] text-2xl">{m.val}</div>
              <div className="text-xs text-slate-400">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    ),
  },

  // 9 — GO-TO-MARKET
  {
    id: 9,
    dark: true,
    bg: "bg-[#0F4C5C]",
    content: (
      <div className="max-w-5xl mx-auto w-full px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 block">Go-To-Market</span>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight mb-8">
            Three moves. Proven in B2B healthcare SaaS.
          </h2>
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            {
              num: "01", label: "Community Seed", time: "Week 1-2",
              channels: ["r/GeneticCounseling", "NSGC community", "LinkedIn DMs to counselors"],
              goal: "20 real users, validate workflow", budget: "$0"
            },
            {
              num: "02", label: "PLG Expansion", time: "Month 1-2",
              channels: ["ProductHunt launch", "Content SEO", "Email sequences"],
              goal: "100 signups, 5 paying", budget: "$100-300"
            },
            {
              num: "03", label: "Enterprise Top-Down", time: "Month 3+",
              channels: ["LinkedIn Ads to program directors", "Direct hospital outreach", "NSGC conference"],
              goal: "3-5 enterprise accounts", budget: "$1,500/mo"
            },
          ].map((move, i) => (
            <motion.div key={move.num}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <div className="font-mono text-3xl font-bold text-white/20 mb-1">{move.num}</div>
              <div className="font-bold text-white text-lg mb-0.5">{move.label}</div>
              <div className="text-amber-400 text-xs mb-3">{move.time}</div>
              <ul className="text-teal-200 text-xs space-y-1 mb-3">
                {move.channels.map((c) => <li key={c}>→ {c}</li>)}
              </ul>
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="text-white text-xs font-semibold">Goal: {move.goal}</div>
                <div className="text-teal-300 text-xs">Budget: {move.budget}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // 10 — TEAM
  {
    id: 10,
    dark: false,
    bg: "bg-white",
    content: (
      <div className="max-w-4xl mx-auto w-full px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C5C] mb-3 block">Team</span>
          <h2 className="font-display text-5xl font-bold text-[#1E293B] tracking-tight mb-4">
            Built by builders<br />who&apos;ve shipped before.
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-slate-50 rounded-2xl p-10 border border-slate-100 text-left max-w-2xl mx-auto mb-8">
          <div className="font-bold text-[#0F4C5C] text-xl mb-2">ChimeStream — Product Studio</div>
          <p className="text-slate-600 mb-5">We build tools that solve specific, painful problems for specific professionals. LineageAI is our genetic counseling product.</p>
          <div className="space-y-3">
            {[
              { icon: "🤖", text: "AI/automation expertise — production pipelines across healthcare, B2B SaaS, finance" },
              { icon: "🏗️", text: "B2B SaaS build experience — full-stack, deployed, production-grade" },
              { icon: "🚀", text: "Serial product launches — 15-stage Jarvis pipeline, ships in 24 hours" },
            ].map((item) => (
              <div key={item.icon} className="flex items-start gap-3 text-sm text-slate-600">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    ),
  },

  // 11 — THE ASK
  {
    id: 11,
    dark: true,
    bg: "bg-[#1E293B]",
    content: (
      <div className="max-w-4xl mx-auto w-full px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 block">The Ask</span>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight mb-2">
            $100K ARR in 12 months.
          </h2>
          <p className="text-slate-400 text-lg mb-8">Milestone-based roadmap. Every quarter has a clear target.</p>
        </motion.div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { q: "Q1", label: "100 signups", sub: "5 paying · ProductHunt launch" },
            { q: "Q2", label: "300 signups", sub: "25 paying · first enterprise pilot" },
            { q: "Q3", label: "600 signups", sub: "50 paying · NSGC conference" },
            { q: "Q4", label: "1,200 signups", sub: "100+ paying · $100K ARR" },
          ].map((q, i) => (
            <motion.div key={q.q}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white/10 border border-white/10 rounded-xl p-5">
              <div className="font-mono text-[#F59E0B] font-bold text-sm mb-1">{q.q}</div>
              <div className="text-white font-bold text-lg">{q.label}</div>
              <div className="text-slate-400 text-xs mt-1">{q.sub}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-slate-300 text-sm font-semibold mb-3">What we need (clinic partnership version):</p>
          <p className="text-white text-lg font-medium">
            &ldquo;3-month pilot. 1 counselor. 5 cases.<br />Give us feedback. Pay nothing.&rdquo;
          </p>
        </motion.div>
      </div>
    ),
  },

  // 12 — CLOSE
  {
    id: 12,
    dark: true,
    bg: "bg-[#0F4C5C]",
    content: (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-8 max-w-3xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Every at-risk family deserves a letter that arrives.
          </h2>
          <div className="space-y-2 text-teal-200 text-xl leading-relaxed">
            <p>7 in 10 don&apos;t get tested.</p>
            <p>Not because they refuse.</p>
            <p>Because no one built a tool to close the loop.</p>
            <p className="text-[#F59E0B] font-semibold mt-2">Until now.</p>
          </div>
        </motion.div>
        {/* Mini family tree */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
          className="w-64 h-40 bg-white/10 rounded-2xl border border-white/20 p-4">
          <FamilyTree compact />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="space-y-3">
          <a href="https://lineageai.ashketing.com" target="_blank" rel="noopener noreferrer"
            className="block bg-[#F59E0B] hover:bg-amber-500 text-white font-bold text-lg px-10 py-3 rounded-xl transition-colors">
            Try LineageAI Free →
          </a>
          <p className="text-teal-300 text-sm">hello@lineageai.io</p>
        </motion.div>
      </div>
    ),
  },
]

// ─── Main PitchDeck Component ────────────────────────────────────────────────
export default function DeckPage() {
  const [current, setCurrent] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(SLIDES.length - 1, c + 1)), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next()
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev()
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {})
          setIsFullscreen(true)
        } else {
          document.exitFullscreen().catch(() => {})
          setIsFullscreen(false)
        }
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [next, prev])

  const slide = SLIDES[current]
  const isLight = !slide.dark

  return (
    <div className={`fixed inset-0 flex flex-col ${slide.bg} transition-colors duration-500`}>
      {/* Slide counter — top right */}
      <div className={`absolute top-5 right-6 font-mono text-xs z-20 ${isLight ? "text-slate-400" : "text-white/40"}`}>
        {current + 1} / {SLIDES.length}
      </div>

      {/* Fullscreen button */}
      {!isFullscreen && (
        <button
          onClick={() => { document.documentElement.requestFullscreen().catch(() => {}); setIsFullscreen(true) }}
          className={`absolute top-5 right-20 z-20 transition-opacity opacity-40 hover:opacity-100 ${isLight ? "text-slate-500" : "text-white"}`}
          title="Fullscreen (F)"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {slide.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between px-8 py-4 z-10">
        <Link href="/"
          className={`text-xs font-medium transition-opacity hover:opacity-80 ${isLight ? "text-slate-400" : "text-white/30"}`}>
          LineageAI · Confidential
        </Link>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? `w-6 h-2 ${isLight ? "bg-[#0F4C5C]" : "bg-white"}`
                  : `w-2 h-2 ${isLight ? "bg-slate-300" : "bg-white/30"}`
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button onClick={prev} disabled={current === 0}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-20 ${
              isLight ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-white/10 text-white hover:bg-white/20"
            }`}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} disabled={current === SLIDES.length - 1}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-20 ${
              isLight ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-white/10 text-white hover:bg-white/20"
            }`}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
