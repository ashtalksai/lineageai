import Link from "next/link"

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  Company: [
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  Resources: [
    { label: "Docs", href: "/docs" },
    { label: "Pitch Deck", href: "/deck" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0F4C5C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span
              className="text-white font-bold text-2xl tracking-tight"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              LineageAI
            </span>
            <p className="mt-2 text-teal-200 text-sm font-medium">
              Cascade testing, tracked.
            </p>
            <p className="mt-4 text-teal-300/80 text-sm leading-relaxed max-w-xs">
              Built for genetic counselors who believe every at-risk family member deserves a chance at early detection.
            </p>
            <a
              href="mailto:hello@lineageai.io"
              className="mt-4 inline-block text-sm text-teal-200 hover:text-white transition-colors"
            >
              hello@lineageai.io
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-teal-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-teal-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-teal-400">
            &copy; 2026 ChimeStream B.V. All rights reserved.
          </p>
          <p className="text-xs text-teal-400">
            LineageAI is an administrative coordination tool, not a medical device.
          </p>
        </div>
      </div>
    </footer>
  )
}
