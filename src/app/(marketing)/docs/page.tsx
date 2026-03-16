"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const sections = [
  {
    id: "research",
    label: "Research",
    items: [
      { id: "market-sizing", label: "Market Sizing" },
      { id: "competitive-landscape", label: "Competitive Landscape" },
      { id: "user-research", label: "User Research Insights" },
    ],
  },
  {
    id: "gtm",
    label: "GTM",
    items: [
      { id: "go-to-market", label: "Go-To-Market Strategy" },
      { id: "pilot-institutions", label: "Pilot Institutions" },
      { id: "sales-playbook", label: "Sales Playbook" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    items: [
      { id: "messaging", label: "Messaging Framework" },
      { id: "content-strategy", label: "Content Strategy" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    items: [
      { id: "brand-guidelines", label: "Brand Guidelines" },
      { id: "design-system", label: "Design System" },
      { id: "voice-tone", label: "Voice & Tone" },
    ],
  },
  {
    id: "pitch",
    label: "Pitch",
    items: [
      { id: "investor-memo", label: "Investor Memo" },
      { id: "financial-model", label: "Financial Model" },
    ],
  },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [activeItem, setActiveItem] = useState(sections[0].items[0].id)

  const currentSection = sections.find((s) => s.id === activeSection)
  const currentItem = currentSection?.items.find((i) => i.id === activeItem)

  return (
    <div className="bg-[#F8F7F4] min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 pt-20 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-[#0F4C5C]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Docs</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1E293B] font-medium">{currentSection?.label}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white px-4 py-8">
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => {
                    setActiveSection(section.id)
                    setActiveItem(section.items[0].id)
                  }}
                  className={`w-full text-left text-xs font-bold uppercase tracking-widest mb-2 px-2 ${
                    activeSection === section.id ? "text-[#0F4C5C]" : "text-slate-400"
                  }`}
                >
                  {section.label}
                </button>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(section.id)
                        setActiveItem(item.id)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        activeItem === item.id && activeSection === section.id
                          ? "bg-teal-50 text-[#0F4C5C] font-semibold"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-12 py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs text-slate-400 mb-4">
              <span className="font-semibold text-[#0F4C5C]">{currentSection?.label}</span>
              <ChevronRight className="w-3 h-3" />
              <span>{currentItem?.label}</span>
            </div>
            <h1
              className="text-4xl font-bold text-[#1E293B] tracking-tight mb-4"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              {currentItem?.label}
            </h1>
            <div className="w-16 h-1 bg-[#0F4C5C] rounded-full mb-8" />

            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">Content coming soon</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                This section is being prepared. Check back soon or email us at hello@lineageai.io for early access.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
