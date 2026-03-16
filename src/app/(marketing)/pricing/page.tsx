"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle2, X } from "lucide-react"

const tiers = [
  {
    name: "Pilot",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Get started with one active case — no card required.",
    cta: "Start Free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    priceMonthly: 49,
    priceYearly: 39,
    description: "For practicing genetic counselors managing active caseloads.",
    cta: "Start 14-Day Trial",
    href: "/signup?plan=pro",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    priceMonthly: 149,
    priceYearly: 119,
    description: "For genomic labs, clinics, and academic medical centers.",
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
]

const featureMatrix = [
  { feature: "Active cases", pilot: "1", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Outreach letters per month", pilot: "3", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Family tree members per case", pilot: "10", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "AI letter generation", pilot: false, pro: true, enterprise: true },
  { feature: "Automatic compliance log", pilot: false, pro: true, enterprise: true },
  { feature: "PDF compliance export", pilot: false, pro: true, enterprise: true },
  { feature: "Custom letter templates", pilot: false, pro: true, enterprise: true },
  { feature: "Team members", pilot: "1", pro: "3", enterprise: "Unlimited" },
  { feature: "Business Associate Agreement (BAA)", pilot: false, pro: false, enterprise: true },
  { feature: "API access", pilot: false, pro: false, enterprise: true },
  { feature: "Dedicated account manager", pilot: false, pro: false, enterprise: true },
  { feature: "SLA guarantee", pilot: false, pro: false, enterprise: true },
]

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. You can upgrade or downgrade at any time. If you upgrade, the new pricing takes effect immediately. If you downgrade, it takes effect at the end of your current billing period. No penalties, no friction.",
  },
  {
    q: "Do you offer a free trial for Pro?",
    a: "Yes — Pro includes a 14-day free trial with no credit card required at signup. You'll only be charged if you choose to continue after the trial.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You can export all your case data at any time. After cancellation, your data is retained for 30 days in read-only mode, then permanently deleted. We never hold your data hostage.",
  },
  {
    q: "Is there a discount for academic institutions?",
    a: "Yes. Academic medical centers and training programs with more than 3 genetic counselors are eligible for 30% off the Enterprise plan. Contact hello@lineageai.io with your institution's email domain.",
  },
  {
    q: "How does the yearly discount work?",
    a: "Choosing annual billing saves you approximately 20% compared to monthly. You're billed once for the full year upfront. Yearly plans are non-refundable after 30 days.",
  },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="bg-[#F8F7F4]">
      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-5xl sm:text-6xl font-bold text-[#1E293B] tracking-tight mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-500 mb-8">
            No per-letter fees. No per-patient charges. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 bg-white border border-slate-200 rounded-full px-2 py-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !yearly ? "bg-[#0F4C5C] text-white shadow" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                yearly ? "bg-[#0F4C5C] text-white shadow" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Yearly
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier) => {
              const price = yearly ? tier.priceYearly : tier.priceMonthly
              return (
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
                  <h3
                    className={`text-xl font-bold mb-1 ${tier.highlighted ? "text-white" : "text-[#1E293B]"}`}
                    style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-6 ${tier.highlighted ? "text-teal-200" : "text-slate-400"}`}>
                    {tier.description}
                  </p>
                  <div className="mb-6">
                    <span
                      className={`text-5xl font-bold ${tier.highlighted ? "text-white" : "text-[#1E293B]"}`}
                      style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      ${price}
                    </span>
                    {price > 0 && (
                      <span className={`text-sm ml-1 ${tier.highlighted ? "text-teal-200" : "text-slate-400"}`}>
                        /mo{yearly ? " · billed annually" : ""}
                      </span>
                    )}
                  </div>
                  <Link href={tier.href}>
                    <Button
                      className={`w-full font-semibold mb-1 ${
                        tier.highlighted
                          ? "bg-white text-[#0F4C5C] hover:bg-teal-50"
                          : "bg-[#0F4C5C] text-white hover:bg-[#0d3f4d]"
                      }`}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="pb-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold text-[#1E293B] mb-8 pt-16 text-center tracking-tight"
            style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            Full feature comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-4 text-sm font-semibold text-slate-400 pr-8">Feature</th>
                  {tiers.map((t) => (
                    <th
                      key={t.name}
                      className={`py-4 text-center text-sm font-bold w-32 ${
                        t.highlighted ? "text-[#0F4C5C]" : "text-[#1E293B]"
                      }`}
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureMatrix.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-4 text-sm text-slate-600 pr-8">{row.feature}</td>
                    {(["pilot", "pro", "enterprise"] as const).map((plan) => {
                      const val = row[plan]
                      return (
                        <td key={plan} className="py-4 text-center">
                          {typeof val === "boolean" ? (
                            val ? (
                              <CheckCircle2 className="w-5 h-5 text-[#0F4C5C] mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-slate-200 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-medium text-[#1E293B]">{val}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-24 bg-[#F8F7F4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold text-[#1E293B] mb-12 text-center tracking-tight"
            style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            Pricing questions
          </h2>
          <Accordion>
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
    </div>
  )
}
