'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Bell, User, Power, MenuIcon } from "lucide-react"

const sidebarItems = [
  {
    title: "Configuración",
    icon: "⚙️",
    items: [],
  },
  {
    title: "Gestión Académica",
    icon: "📚",
    items: [],
  },
  {
    title: "Gestión de Actividades",
    icon: "📝",
    items: [],
  },
  {
    title: "Gestión de Proyectos Académicos",
    icon: "🏗️",
    items: [],
  },
  {
    title: "Seguimiento Académico",
    icon: "📊",
    items: [
      { label: "Amigos Académicos", href: "/" },
      { label: "Pruebas Diagnósticas", href: "/pruebas" },
      { label: "Saber PRO", href: "/saber" },
      { label: "Cápsulas de Aprendizaje", href: "/capsulas" },
    ],
  },
]

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-red-600 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">SEA</h1>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5" />
          <User className="w-5 h-5" />
          <span className="font-medium">Admin</span>
          <Power className="w-5 h-5 cursor-pointer hover:text-red-200" />
        </div>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r p-4">
          <h2 className="text-xs text-gray-500 uppercase mb-4 font-medium">Navegación principal</h2>
          <nav className="space-y-2">
            {sidebarItems.map((group, idx) => (
              <div key={idx}>
                <div className="flex items-center font-semibold text-sm mb-1 text-gray-800">
                  <span className="mr-2">{group.icon}</span>
                  {group.title}
                </div>
                {group.items.length > 0 && (
                  <ul className="ml-6 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "text-sm px-2 py-1 block rounded hover:bg-red-100",
                            pathname === item.href
                              ? "bg-red-200 text-red-800 font-medium"
                              : "text-gray-700"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  )
}
