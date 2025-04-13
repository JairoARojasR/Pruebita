"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { mockActividades, mockMatriculados } from "@/lib/data"

export default function Dashboard() {
  const [filtros, setFiltros] = useState({
    anioInicio: "",
    semestreInicio: "",
    anioFin: "",
    semestreFin: "",
    tipo: "",
  })

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }))
  }

  // Datos para el gráfico de barras
  const actividadesPorSemestre = [
    { semestre: "2023-1", actividades: 12, estudiantes: 145 },
    { semestre: "2023-2", actividades: 15, estudiantes: 178 },
    { semestre: "2024-1", actividades: 18, estudiantes: 210 },
  ]

  // Datos para el gráfico de porcentaje de participación
  const participacionPorSemestre = [
    {
      semestre: "2023-1",
      participacion: ((145 / mockMatriculados["2023-1"]) * 100).toFixed(2),
      matriculados: mockMatriculados["2023-1"],
    },
    {
      semestre: "2023-2",
      participacion: ((178 / mockMatriculados["2023-2"]) * 100).toFixed(2),
      matriculados: mockMatriculados["2023-2"],
    },
    {
      semestre: "2024-1",
      participacion: ((210 / mockMatriculados["2024-1"]) * 100).toFixed(2),
      matriculados: mockMatriculados["2024-1"],
    },
  ]

  // Datos para el gráfico de distribución por tipo
  const distribucionPorTipo = [
    { name: "Entrante", value: 35 },
    { name: "Saliente", value: 65 },
  ]

  // Datos para el gráfico de distribución por modalidad
  const distribucionPorModalidad = [
    { name: "Presencial", value: 70 },
    { name: "Virtual", value: 30 },
  ]

  // Colores para los gráficos de pastel
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="anioInicio">Año Inicio</Label>
              <Select value={filtros.anioInicio} onValueChange={(value) => handleFiltroChange("anioInicio", value)}>
                <SelectTrigger id="anioInicio">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="semestreInicio">Semestre Inicio</Label>
              <Select
                value={filtros.semestreInicio}
                onValueChange={(value) => handleFiltroChange("semestreInicio", value)}
              >
                <SelectTrigger id="semestreInicio">
                  <SelectValue placeholder="Sem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="anioFin">Año Final</Label>
              <Select value={filtros.anioFin} onValueChange={(value) => handleFiltroChange("anioFin", value)}>
                <SelectTrigger id="anioFin">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="semestreFin">Semestre Final</Label>
              <Select value={filtros.semestreFin} onValueChange={(value) => handleFiltroChange("semestreFin", value)}>
                <SelectTrigger id="semestreFin">
                  <SelectValue placeholder="Sem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={filtros.tipo} onValueChange={(value) => handleFiltroChange("tipo", value)}>
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="entrante">Entrante</SelectItem>
                  <SelectItem value="saliente">Saliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted p-4 rounded-lg text-center">
                <h3 className="text-lg font-medium">Total Actividades</h3>
                <p className="text-3xl font-bold mt-2">{mockActividades.length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <h3 className="text-lg font-medium">Total Estudiantes</h3>
                <p className="text-3xl font-bold mt-2">533</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={actividadesPorSemestre} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semestre" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="actividades" name="Actividades" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="estudiantes" name="Estudiantes" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Porcentaje de Participación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              {participacionPorSemestre.map((item) => (
                <div key={item.semestre} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.semestre}</span>
                    <span className="font-medium">{item.participacion}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${item.participacion}%` }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">{item.matriculados} estudiantes matriculados</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribucionPorTipo}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {distribucionPorTipo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Modalidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribucionPorModalidad}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {distribucionPorModalidad.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
