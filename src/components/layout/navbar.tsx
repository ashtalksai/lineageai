"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#0F4C5C] flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="LineageAI Logo"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span
              className="text-[#0F4C5C] font-bold text-xl tracking-tight"
              style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
            >
              LineageAI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#1E293B] hover:text-[#0F4C5C] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-medium text-[#1E293B] hover:text-[#0F4C5C]">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white text-sm font-semibold px-5">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden" render={<Button variant="ghost" size="icon" />}>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  className="flex items-center gap-2.5"
                  onClick={() => setOpen(false)}
                >
                  <span
                    className="text-[#0F4C5C] font-bold text-xl"
                    style={{ fontFamily: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    LineageAI
                  </span>
                </Link>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-base font-medium text-[#1E293B] hover:text-[#0F4C5C] transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-[#0F4C5C] hover:bg-[#0d3f4d] text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
