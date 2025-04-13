"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Eye, Search } from "lucide-react"
import { mockActividades } from "../lib/data"

export default function ActividadesRegistradas() {
  const router = useRouter()
  const [filtros, setFiltros] = useState({
    nombre: "",
    alcance: "",
    tipo: "",
    modalidad: "",
    anioSemestre: "",
  })
  const [actividadAEliminar, setActividadAEliminar] = useState<string | null>(null)
  const [actividades, setActividades] = useState(mockActividades)

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }))
  }

  const aplicarFiltros = () => {
    let actividadesFiltradas = [...mockActividades]

    if (filtros.nombre) {
      actividadesFiltradas = actividadesFiltradas.filter((act) =>
        act.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()),
      )
    }

    if (filtros.alcance) {
      actividadesFiltradas = actividadesFiltradas.filter((act) => act.alcance === filtros.alcance)
    }

    if (filtros.tipo) {
      actividadesFiltradas = actividadesFiltradas.filter((act) => act.tipoMovilidad === filtros.tipo)
    }

    if (filtros.modalidad) {
      actividadesFiltradas = actividadesFiltradas.filter((act) => act.modalidad === filtros.modalidad)
    }

    if (filtros.anioSemestre) {
      actividadesFiltradas = actividadesFiltradas.filter(
        (act) => `${act.anio}-${act.semestre}` === filtros.anioSemestre,
      )
    }

    setActividades(actividadesFiltradas)
  }

  const resetFiltros = () => {
    setFiltros({
      nombre: "",
      alcance: "",
      tipo: "",
      modalidad: "",
      anioSemestre: "",
    })
    setActividades(mockActividades)
  }

  const eliminarActividad = () => {
    if (actividadAEliminar) {
      // En un caso real, esto enviaría una solicitud a la API
      setActividades((prev) => prev.filter((act) => act.id !== actividadAEliminar))

      setActividadAEliminar(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="nombre"
                  placeholder="Buscar por nombre"
                  className="pl-8"
                  value={filtros.nombre}
                  onChange={(e) => handleFiltroChange("nombre", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="alcance">Alcance</Label>
              <Select value={filtros.alcance} onValueChange={(value) => handleFiltroChange("alcance", value)}>
                <SelectTrigger id="alcance">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="nacional">Nacional</SelectItem>
                  <SelectItem value="internacional">Internacional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={filtros.tipo} onValueChange={(value) => handleFiltroChange("tipo", value)}>
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="entrante">Entrante</SelectItem>
                  <SelectItem value="saliente">Saliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="modalidad">Modalidad</Label>
              <Select value={filtros.modalidad} onValueChange={(value) => handleFiltroChange("modalidad", value)}>
                <SelectTrigger id="modalidad">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="anioSemestre">Año-Semestre</Label>
              <Select value={filtros.anioSemestre} onValueChange={(value) => handleFiltroChange("anioSemestre", value)}>
                <SelectTrigger id="anioSemestre">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="2023-1">2023-1</SelectItem>
                  <SelectItem value="2023-2">2023-2</SelectItem>
                  <SelectItem value="2024-1">2024-1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={resetFiltros}>
              Limpiar
            </Button>
            <Button onClick={aplicarFiltros}>Aplicar Filtros</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actividades Registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Alcance</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Modalidad</TableHead>
                  <TableHead>Año-Semestre</TableHead>
                  <TableHead>Estudiantes</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actividades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No se encontraron actividades con los filtros seleccionados
                    </TableCell>
                  </TableRow>
                ) : (
                  actividades.map((actividad) => (
                    <TableRow key={actividad.id}>
                      <TableCell className="font-medium">{actividad.nombre}</TableCell>
                      <TableCell>{actividad.alcance}</TableCell>
                      <TableCell>{actividad.tipoMovilidad}</TableCell>
                      <TableCell>{actividad.modalidad}</TableCell>
                      <TableCell>{`${actividad.anio}-${actividad.semestre}`}</TableCell>
                      <TableCell>{actividad.cantidadEstudiantes}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => router.push(`/ver/${actividad.id}`)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalles</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => router.push(`/editar/${actividad.id}`)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Dialog
                            open={actividadAEliminar === actividad.id}
                            onOpenChange={(open) => {
                              if (!open) setActividadAEliminar(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setActividadAEliminar(actividad.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmar eliminación</DialogTitle>
                                <DialogDescription>
                                  ¿Está seguro que desea eliminar la actividad "{actividad.nombre}"? Esta acción no se
                                  puede deshacer.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setActividadAEliminar(null)}>
                                  Cancelar
                                </Button>
                                <Button variant="destructive" onClick={eliminarActividad}>
                                  Eliminar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
