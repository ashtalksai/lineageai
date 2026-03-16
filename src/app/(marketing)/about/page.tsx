import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

export const metadata = {
  title: "About — LineageAI",
  description: "We built what genetic counselors kept asking for.",
}

const differentiators = [
  {
    vs: "Built for outreach workflow, not pedigree drawing",
    description:
      "Progeny and similar tools are pedigree drawing tools with add-ons. LineageAI is an outreach coordination platform from the ground up. The family tree is a tracking interface, not a drawing canvas.",
  },
  {
    vs: "AI-assisted letters with customizable templates",
    description:
      "No other cascade testing tool generates variant-specific outreach letters. LineageAI drafts the letter, you edit and send. Templates are customizable per institution, per counselor.",
  },
  {
    vs: "Pricing genetic counselors can actually afford",
    description:
      "Progeny starts at $800/year and is often purchased at the institutional level. LineageAI is $49/month for individual counselors — no IT department required, no annual contract.",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-[#F8F7F4]">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-6">
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Our Story</span>
              </div>
              <h1
                className="text-5xl sm:text-6xl font-bold text-[#1E293B] leading-tight tracking-tight"
                style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
              >
                We built what genetic counselors kept asking for.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Every genetic counselor we spoke to had the same problem: they knew exactly which family members needed to be tested, but the tools to reach them — and prove they tried — simply didn&apos;t exist.
              </p>
              <Link href="/signup">
                <Button className="mt-8 bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white font-semibold px-8 h-12">
                  Start Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-teal-900/10">
                <Image
                  src="/images/about-visual.png"
                  alt="Genetic counselors at work"
                  width={640}
                  height={480}
                  className="object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold text-[#1E293B] mb-8 tracking-tight"
            style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            The problem we couldn&apos;t stop thinking about
          </h2>
          <div className="space-y-6 text-slate-600 leading-relaxed text-base">
            <p>
              Hereditary cancer syndromes — BRCA1, BRCA2, Lynch syndrome, and dozens more — are among the most actionable diagnoses in medicine. When a proband tests positive, their first-degree relatives have a 50% chance of carrying the same variant. Early detection is transformative. Testing is available. And yet, study after study shows that fewer than 30% of at-risk relatives actually get tested.
            </p>
            <p>
              The breakdown isn&apos;t clinical. The counselors know exactly what to do. The breakdown is administrative. A genetic counselor managing 40 active cases might have 300 at-risk family members to track. She writes letters by hand, logs them in a spreadsheet, and has no way to know if the letter actually reached anyone. When a family member shows up in the ER three years later with a late-stage diagnosis, there&apos;s no documented proof that outreach was attempted.
            </p>
            <p>
              We started LineageAI after conversations with counselors across academic medical centers, community hospitals, and private practices. The problem was identical everywhere. The tools were everywhere: Word documents, Excel, Google Sheets, personal email accounts. Nothing built for this specific, critical workflow.
            </p>
            <p>
              Our mission is simple: automate the compliance paper trail and the outreach administration, not the counseling itself. Genetic counselors are irreplaceable. The grunt work is not.
            </p>
          </div>
        </div>
      </section>

      {/* vs Progeny */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-[#1E293B] tracking-tight"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              Why counselors choose LineageAI over existing tools
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.map((d, i) => (
              <div key={i} className="bg-[#F8F7F4] rounded-2xl p-8 border border-slate-100">
                <CheckCircle2 className="w-8 h-8 text-[#0F4C5C] mb-5" />
                <h3 className="text-lg font-bold text-[#1E293B] mb-3">{d.vs}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[#0F4C5C]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            Our mission
          </h2>
          <p className="text-xl text-teal-200 leading-relaxed mb-10">
            Every at-risk family member deserves a documented, personalized outreach attempt. LineageAI exists to make sure none of them are forgotten — and that counselors have the proof to show they tried.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-[#0F4C5C] hover:bg-teal-50 font-semibold px-8 h-12">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
