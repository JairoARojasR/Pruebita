import type { Metadata } from "next"
import "./globals.css"
import SidebarLayout from "../componets/SidebarLayout"
import Prueba from "@/componets/AntLayout"

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
        <Prueba>{children}</Prueba>
      </body>
    </html>
  )
}
