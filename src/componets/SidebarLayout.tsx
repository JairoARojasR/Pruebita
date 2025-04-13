'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Actividades", href: "/actividades" },
  { name: "Registrar", href: "/registrar" },
]

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm px-4 py-6">
        <h2 className="text-lg font-semibold mb-8 text-black">A&S LA REDOMA</h2>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded px-3 py-2 text-sm font-medium transition hover:bg-gray-100",
                pathname === link.href
                  ? "bg-gray-200 text-black"
                  : "text-gray-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content (no estilos extras aquí) */}
      <div className="flex-1">{children}</div>
    </div>
  )
}
