"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  CheckCircle2,
  ArrowRight,
  FileText,
  GitBranch,
  ShieldCheck,
  Users,
  BarChart3,
  Clock,
  AlertTriangle,
  Mail,
  Star,
} from "lucide-react"

// Status colors
const statusColors: Record<string, string> = {
  not_contacted: "#EF4444",
  contacted: "#F59E0B",
  consented: "#8B5CF6",
  scheduled: "#3B82F6",
  tested: "#10B981",
  declined: "#6B7280",
}

// Family tree SVG component
function FamilyTreeSVG() {
  const nodes = [
    { id: "p1", x: 200, y: 60, label: "Proband", status: "tested", gen: 0 },
    { id: "p2", x: 120, y: 140, label: "Sister", status: "scheduled", gen: 1 },
    { id: "p3", x: 280, y: 140, label: "Brother", status: "contacted", gen: 1 },
    { id: "p4", x: 60, y: 220, label: "Niece", status: "not_contacted", gen: 2 },
    { id: "p5", x: 180, y: 220, label: "Nephew", status: "consented", gen: 2 },
    { id: "p6", x: 320, y: 220, label: "Niece", status: "declined", gen: 2 },
  ]

  const connections = [
    { from: "p1", to: "p2" },
    { from: "p1", to: "p3" },
    { from: "p2", to: "p4" },
    { from: "p2", to: "p5" },
    { from: "p3", to: "p6" },
  ]

  return (
    <svg viewBox="0 0 400 290" className="w-full h-full" aria-label="Family tree diagram">
      <defs>
        <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F4C5C" floodOpacity="0.15" />
        </filter>
      </defs>
      {/* Connections */}
      {connections.map(({ from, to }) => {
        const fromNode = nodes.find((n) => n.id === from)!
        const toNode = nodes.find((n) => n.id === to)!
        return (
          <line
            key={`${from}-${to}`}
            x1={fromNode.x}
            y1={fromNode.y + 20}
            x2={toNode.x}
            y2={toNode.y - 20}
            stroke="#CBD5E1"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
        )
      })}
      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id} filter="url(#nodeShadow)">
          <circle
            cx={node.x}
            cy={node.y}
            r={22}
            fill="white"
            stroke={statusColors[node.status]}
            strokeWidth="2.5"
          />
          <circle
            cx={node.x}
            cy={node.y}
            r={8}
            fill={statusColors[node.status]}
          />
          <text
            x={node.x}
            y={node.y + 36}
            textAnchor="middle"
            fill="#1E293B"
            fontSize="10"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="500"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

// Status legend
const statusLegend = [
  { label: "Not Contacted", color: "#EF4444" },
  { label: "Contacted", color: "#F59E0B" },
  { label: "Consented", color: "#8B5CF6" },
  { label: "Tested", color: "#10B981" },
]

const features = [
  {
    title: "Case Management",
    description: "Organize patient cases with variant details, family size, and outreach history in one place.",
    image: "/images/feature-case-management.png",
    span: "md:col-span-2",
  },
  {
    title: "Family Tree Builder",
    description: "Visualize at-risk relatives across generations with live status indicators.",
    image: "/images/feature-family-tree.png",
    span: "md:col-span-1",
  },
  {
    title: "AI Letter Generator",
    description: "Generate personalized outreach letters for each at-risk family member in seconds.",
    image: "/images/feature-letter-gen.png",
    span: "md:col-span-1",
  },
  {
    title: "Status Tracker",
    description: "Track every family member from first contact to test completion with color-coded status.",
    image: "/images/hero-family-tree.png",
    span: "md:col-span-1",
  },
  {
    title: "Compliance Log",
    description: "Automatic audit trail of every letter sent, call made, and consent obtained.",
    image: "/images/feature-compliance.png",
    span: "md:col-span-1",
  },
  {
    title: "Team Collaboration",
    description: "Share cases across your genetic counseling team with role-based access.",
    image: "/images/hero-family-tree.png",
    span: "md:col-span-2",
  },
]

const steps = [
  {
    number: "01",
    title: "Create a case with variant info",
    description:
      "Enter the patient's ID, variant type (BRCA1, BRCA2, Lynch syndrome, etc.), and any relevant clinical notes. LineageAI structures your data for downstream outreach.",
  },
  {
    number: "02",
    title: "Map the family tree",
    description:
      "Add at-risk relatives with their relationship, generation, and contact details. The visual tree updates in real time as you add members — no drawing tools required.",
  },
  {
    number: "03",
    title: "Track outreach, document everything",
    description:
      "Generate customized letters for each family member. Every send, response, and status change is logged automatically in your compliance audit trail.",
  },
]

const faqs = [
  {
    q: "Is LineageAI HIPAA compliant?",
    a: "LineageAI is designed with HIPAA requirements in mind. Our Enterprise plan includes a Business Associate Agreement (BAA). Data is encrypted in transit and at rest. We do not use patient data for model training. For compliance details specific to your institution, contact hello@lineageai.io.",
  },
  {
    q: "Does LineageAI send emails on my behalf?",
    a: "Not automatically. LineageAI generates outreach letters that you can review, edit, and send through your existing channels. This keeps you in control of all patient communications and satisfies most institutional communication policies.",
  },
  {
    q: "Does it integrate with our EHR?",
    a: "Direct EHR integrations are on the roadmap. Currently, LineageAI works alongside your EHR as a dedicated cascade testing coordination layer — you enter patient identifiers (not full PHI) and manage outreach from there.",
  },
  {
    q: "What variant types are supported?",
    a: "LineageAI supports any hereditary variant type. Our AI letter templates are pre-built for BRCA1, BRCA2, Lynch syndrome (MLH1, MSH2, MSH6, PMS2), PALB2, ATM, and others. You can also create fully custom templates for any variant.",
  },
  {
    q: "Who owns my patient data?",
    a: "You do. LineageAI does not claim ownership over any data you enter. You can export all case data at any time in CSV or PDF format. Deleting your account permanently removes all associated data within 30 days.",
  },
  {
    q: "Can multiple counselors share cases?",
    a: "Yes. The Pro plan supports up to 3 counselors on shared cases. The Enterprise plan supports unlimited team members with role-based permissions (view-only, edit, admin).",
  },
  {
    q: "Can I export compliance reports?",
    a: "Yes. Every case has a one-click compliance report export (PDF) that includes the full audit trail — letters generated, dates, recipient status, and counselor notes. Designed to meet the documentation standards most institutions require.",
  },
]

const pricingTiers = [
  {
    name: "Pilot",
    price: { monthly: 0, yearly: 0 },
    description: "Get started with one active case.",
    features: [
      "1 active case",
      "3 outreach letters per month",
      "Basic family tree (up to 10 members)",
      "Manual compliance notes",
      "Email support",
    ],
    cta: "Start Free",
    ctaHref: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: { monthly: 49, yearly: 39 },
    description: "For practicing genetic counselors.",
    features: [
      "Unlimited active cases",
      "Unlimited AI-generated letters",
      "Full family tree builder",
      "Automatic compliance log",
      "PDF export",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    ctaHref: "/signup?plan=pro",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: { monthly: 149, yearly: 119 },
    description: "For clinics and genomic labs.",
    features: [
      "Everything in Pro",
      "Business Associate Agreement (BAA)",
      "Multi-counselor access",
      "API access",
      "Custom letter templates",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    ctaHref: "/contact",
    highlighted: false,
  },
]

export default function LandingPage() {
  return (
    <div className="bg-[#F8F7F4]">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Image src="/images/bg-pattern.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-50/50 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left: 60% */}
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                  Cascade Testing Platform
                </span>
              </div>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1E293B] leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
              >
                7 in 10 at-risk families never get tested.
              </h1>
              <p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-xl">
                LineageAI closes the loop — mapping family risk, generating personalized outreach letters, and maintaining a complete compliance audit trail.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white text-base font-semibold px-8 h-12 shadow-lg shadow-teal-900/20"
                  >
                    Start Free
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/deck">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base font-semibold border-2 h-12 px-8 text-[#0F4C5C] border-[#0F4C5C] hover:bg-teal-50"
                  >
                    See Demo
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6">
                {statusLegend.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-xs text-slate-500">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 40% */}
            <div className="lg:col-span-2">
              <div className="relative bg-white rounded-2xl shadow-xl shadow-teal-900/10 border border-teal-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-auto text-xs text-slate-400 font-mono">PT-2024-001 · BRCA1</span>
                </div>
                <div className="h-64">
                  <FamilyTreeSVG />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <div className="text-lg font-bold text-[#0F4C5C] font-mono">14</div>
                    <div className="text-xs text-slate-500">At-risk</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <div className="text-lg font-bold text-amber-600 font-mono">6</div>
                    <div className="text-xs text-slate-500">Contacted</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <div className="text-lg font-bold text-emerald-600 font-mono">3</div>
                    <div className="text-xs text-slate-500">Tested</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#1E293B] tracking-tight"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              The cascade testing gap is a patient safety problem
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Genetic counselors know what needs to happen. The tools to make it happen have never existed — until now.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="w-6 h-6 text-red-500" />,
                title: "Letters that disappear",
                description:
                  "Outreach letters get mailed, emailed, or handed off — and then vanish. There's no system to track whether a family member received it, read it, or acted on it.",
                color: "bg-red-50 border-red-100",
              },
              {
                icon: <Clock className="w-6 h-6 text-amber-500" />,
                title: "30 min per case",
                description:
                  "The average genetic counselor spends 30 minutes per case just on outreach administration — writing letters, updating spreadsheets, and chasing relatives who've gone silent.",
                color: "bg-amber-50 border-amber-100",
              },
              {
                icon: <AlertTriangle className="w-6 h-6 text-purple-500" />,
                title: "Compliance liability",
                description:
                  "Without a documented audit trail, counselors and institutions face legal exposure if an at-risk family member is diagnosed later without proof of outreach attempts.",
                color: "bg-purple-50 border-purple-100",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border p-8 ${card.color}`}
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-3">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-24 bg-[#0F4C5C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              LineageAI closes the loop
            </h2>
            <p className="mt-4 text-lg text-teal-200 max-w-2xl mx-auto">
              Three tools working together so no at-risk family member falls through the cracks.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: "AI Letter Generator",
                description:
                  "Generate personalized, clinically appropriate outreach letters for any hereditary variant in under 10 seconds. Customizable templates per variant type.",
              },
              {
                icon: <GitBranch className="w-8 h-8" />,
                title: "Visual Family Tracking",
                description:
                  "Map at-risk relatives across generations with color-coded status indicators. See at a glance who's been contacted, who's consented, and who needs follow-up.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Compliance Audit Trail",
                description:
                  "Every action is automatically logged with a timestamp. Export a full compliance report for any case with one click — ready for institutional review.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-colors"
              >
                <div className="text-amber-400 mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-teal-200 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section id="features" className="py-24 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#1E293B] tracking-tight"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              Everything you need, nothing you don&apos;t
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow ${feature.span}`}
              >
                <div className="relative h-48 overflow-hidden bg-slate-50">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1E293B] mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#1E293B] tracking-tight"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              Up and running in minutes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-teal-100 -translate-x-1/2" />
                )}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#0F4C5C] flex items-center justify-center">
                    <span className="text-white font-bold text-lg font-mono">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E293B] mb-3">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { stat: "70%", label: "of at-risk relatives never tested", sub: "The cascade testing gap is enormous" },
              { stat: "8,000+", label: "genetic counselors in the US", sub: "Each managing dozens of complex families" },
              { stat: "~30 min", label: "spent per case on outreach admin", sub: "Time that could be spent counseling" },
            ].map((item) => (
              <div key={item.stat} className="text-center">
                <div
                  className="text-5xl font-bold text-[#0F4C5C] mb-2"
                  style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
                >
                  {item.stat}
                </div>
                <div className="text-base font-semibold text-[#1E293B] mb-1">{item.label}</div>
                <div className="text-sm text-slate-400">{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Before LineageAI, I had a spreadsheet with 40 rows for one BRCA1 family. Now I can see the entire picture in 30 seconds and generate letters while I&apos;m still on the phone with the proband.",
                name: "Dr. Sarah Chen, MS, CGC",
                role: "Senior Genetic Counselor, Stanford Health Care",
              },
              {
                quote:
                  "The compliance log alone is worth it. We had an audit last fall and I printed a full report for every case in under 5 minutes. That would have taken me a week before.",
                name: "Marcus Rivera, MS, CGC",
                role: "Lead Genetic Counselor, Northwestern Medicine",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed mb-6 text-base">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-[#1E293B]">{t.name}</div>
                  <div className="text-sm text-slate-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#1E293B] tracking-tight"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              Pricing genetic counselors can actually afford
            </h2>
            <p className="mt-4 text-lg text-slate-500">No per-letter fees. No per-patient charges. Flat monthly pricing.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 ${
                  tier.highlighted
                    ? "bg-[#0F4C5C] text-white shadow-xl shadow-teal-900/20"
                    : "bg-white border border-slate-100 shadow-sm"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#F59E0B] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3
                    className={`text-xl font-bold mb-1 ${tier.highlighted ? "text-white" : "text-[#1E293B]"}`}
                    style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {tier.name}
                  </h3>
                  <p className={`text-sm ${tier.highlighted ? "text-teal-200" : "text-slate-400"}`}>
                    {tier.description}
                  </p>
                </div>
                <div className="mb-8">
                  <span
                    className={`text-5xl font-bold ${tier.highlighted ? "text-white" : "text-[#1E293B]"}`}
                    style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    ${tier.price.monthly}
                  </span>
                  {tier.price.monthly > 0 && (
                    <span className={`text-sm ml-1 ${tier.highlighted ? "text-teal-200" : "text-slate-400"}`}>
                      /month
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          tier.highlighted ? "text-amber-400" : "text-[#0F4C5C]"
                        }`}
                      />
                      <span className={`text-sm ${tier.highlighted ? "text-teal-100" : "text-slate-600"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.ctaHref}>
                  <Button
                    className={`w-full font-semibold ${
                      tier.highlighted
                        ? "bg-white text-[#0F4C5C] hover:bg-teal-50"
                        : "bg-[#0F4C5C] text-white hover:bg-[#0d3f4d]"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-[#1E293B] tracking-tight"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              Frequently asked questions
            </h2>
          </div>
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-[#1E293B] hover:text-[#0F4C5C] py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0F4C5C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            Your next patient case is waiting.
          </h2>
          <p className="text-xl text-teal-200 mb-10 max-w-2xl mx-auto">
            Join genetic counselors who&apos;ve stopped letting families fall through the cracks.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-[#F59E0B] hover:bg-amber-500 text-white text-lg font-bold px-12 h-14 shadow-xl shadow-amber-900/20"
            >
              Start Free — No Card Required
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
