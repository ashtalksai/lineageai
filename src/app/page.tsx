// This file is superseded by src/app/(marketing)/page.tsx
// Next.js route groups: (marketing)/page.tsx handles the root route
import { redirect } from "next/navigation"

export default function RootRedirect() {
  redirect("/")
}
