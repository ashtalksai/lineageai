export const metadata = {
  title: "Privacy Policy — LineageAI",
}

export default function PrivacyPage() {
  return (
    <div className="bg-[#F8F7F4]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-10">
          <p className="text-sm text-slate-400 mb-2">Last updated: March 1, 2026</p>
          <h1
            className="text-5xl font-bold text-[#1E293B] tracking-tight"
            style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-500 leading-relaxed">
            This Privacy Policy describes how ChimeStream B.V. (&quot;LineageAI,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and shares information when you use the LineageAI platform at lineageai.io.
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
              1. Data We Collect
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p><strong>Account information:</strong> When you create an account, we collect your name, email address, password (hashed), and optionally your clinic or organization name.</p>
              <p><strong>Case data:</strong> You may enter patient identifiers (such as an internal patient ID), variant type, clinical notes, and information about family members (names, relationships, contact information). This data is stored in your account and not accessible to other users.</p>
              <p><strong>Usage data:</strong> We collect logs of how you use the platform — which pages you visit, what actions you take, and when. This is used to improve the product and diagnose issues.</p>
              <p><strong>Payment information:</strong> Payment processing is handled by Stripe. We do not store full credit card numbers. We receive a payment token and basic billing information from Stripe.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
              2. How We Use Your Data
            </h2>
            <ul className="space-y-2 text-slate-600 leading-relaxed list-disc pl-5">
              <li>To provide, maintain, and improve the LineageAI service.</li>
              <li>To generate outreach letters based on variant data you provide.</li>
              <li>To maintain your compliance audit trail.</li>
              <li>To communicate with you about your account, billing, and product updates.</li>
              <li>To ensure security and prevent abuse of the platform.</li>
              <li>We do <strong>not</strong> use your patient data to train AI models.</li>
              <li>We do <strong>not</strong> sell your data to third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
              3. HIPAA Considerations
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>LineageAI is designed to support HIPAA-adjacent workflows. We are not currently a covered entity under HIPAA, but we understand our platform may be used in the context of protected health information (PHI).</p>
              <p>Enterprise plan subscribers may enter into a Business Associate Agreement (BAA) with ChimeStream B.V. This agreement governs our handling of any PHI that may be present in your case data.</p>
              <p>We recommend that users on the Pilot and Pro plans use de-identified patient identifiers (e.g., internal IDs rather than names and dates of birth) when entering case data, unless your institution has assessed the risk and the BAA is in place.</p>
              <p>All data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
              4. Data Retention
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Your account data is retained for as long as your account is active. If you close your account, your data is retained in a deactivated state for 30 days, then permanently deleted.</p>
              <p>You can export all case data at any time from your account settings in CSV or PDF format.</p>
              <p>Compliance logs are retained for 7 years by default to support clinical documentation requirements, unless you request earlier deletion.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
              5. Third-Party Services
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Stripe:</strong> Payment processing. Subject to Stripe&apos;s privacy policy.</li>
                <li><strong>Vercel / cloud hosting:</strong> Infrastructure and deployment. Data is hosted in the EU or US depending on your account region.</li>
                <li><strong>OpenAI API:</strong> For generating outreach letter drafts. Data sent to OpenAI is subject to their API data usage policy. We do not send identifiable patient data to OpenAI.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
              6. Your Rights
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or export your personal data. To exercise any of these rights, contact us at hello@lineageai.io.</p>
              <p>Residents of the European Union and EEA have additional rights under the GDPR, including the right to data portability and the right to restrict processing.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4" style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}>
              7. Contact
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Questions about this privacy policy? Contact us at{" "}
              <a href="mailto:hello@lineageai.io" className="text-[#0F4C5C] hover:underline">
                hello@lineageai.io
              </a>
              . Our data protection officer can be reached at the same address with the subject &quot;DPO Request.&quot;
            </p>
            <p className="text-slate-600 mt-3">ChimeStream B.V., registered in the Netherlands.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
