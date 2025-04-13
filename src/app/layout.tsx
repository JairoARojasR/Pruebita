import type { Metadata } from "next"
import "./globals.css"
import SidebarLayout from "../componets/SidebarLayout"

export const metadata: Metadata = {
  title: "Gestión de Actividades",
  description: "Sistema de movilidad académica",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  )
}
