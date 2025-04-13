import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Dashboard from "../componets/dashboard"
import ActividadesRegistradas from "../componets/actividades-registradas"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Actividades de Movilidad</h1>
        <Link href="/registrar">
          <Button className="bg-red-500 hover:bg-red-600">Registrar Nueva Actividad</Button>
        </Link>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="actividades">Actividades Registradas</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="actividades">
          <ActividadesRegistradas />
        </TabsContent>
      </Tabs>
    </main>
  )
}
