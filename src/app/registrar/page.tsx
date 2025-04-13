"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, X, Edit } from "lucide-react"
import { cn } from "@/lib/utils"
//import { useToast } from "@/hooks/use-toast"
import { profesoresList } from "@/lib/data"

export default function RegistrarActividad() {
  const router = useRouter()
  //const { toast } = useToast()

  const [formData, setFormData] = useState({
    nombre: "",
    alcance: "",
    ciudad: "",
    pais: "",
    actividad: "",
    cantidadEstudiantes: "",
    lugar: "",
    fechaInicio: null as Date | null,
    fechaFin: null as Date | null,
    instituciones: [] as string[],
    anio: "",
    semestre: "",
    tipoMovilidad: "",
    modalidad: "",
    objeto: "",
    profesores: [] as string[],
    profesorLider: "", // Añadir esta línea
    apoyoFinanciero: "",
    estudiantes: [] as string[],
    evidencias: [] as string[],
  })

  const [nuevaInstitucion, setNuevaInstitucion] = useState("")
  const [nuevoEstudiante, setNuevoEstudiante] = useState("")
  const [nuevaEvidencia, setNuevaEvidencia] = useState("")

  // Estado para el modal de profesores
  const [profesoresModalOpen, setProfesoresModalOpen] = useState(false)
  const [profesoresSeleccionados, setProfesoresSeleccionados] = useState<string[]>([])

  // Add a new state for the institutions modal
  const [institucionesModalOpen, setInstitucionesModalOpen] = useState(false)
  const [institucionesEnEdicion, setInstitucionesEnEdicion] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí se enviarían los datos a la API
    console.log(formData)
    router.push("/")
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addInstitucion = () => {
    if (nuevaInstitucion.trim()) {
      setFormData((prev) => ({
        ...prev,
        instituciones: [...prev.instituciones, nuevaInstitucion.trim()],
      }))
      setNuevaInstitucion("")
    }
  }

  const removeInstitucion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instituciones: prev.instituciones.filter((_, i) => i !== index),
    }))
  }

  // Add the openInstitucionesModal function after the openProfesoresModal function
  const openInstitucionesModal = () => {
    setInstitucionesEnEdicion([...formData.instituciones])
    setInstitucionesModalOpen(true)
  }

  const openProfesoresModal = () => {
    setProfesoresSeleccionados([...formData.profesores])
    setProfesoresModalOpen(true)
  }

  const guardarProfesores = () => {
    setFormData((prev) => ({
      ...prev,
      profesores: profesoresSeleccionados,
    }))
    setProfesoresModalOpen(false)
  }

  // Add the guardarInstituciones function after the guardarProfesores function
  const guardarInstituciones = () => {
    setFormData((prev) => ({
      ...prev,
      instituciones: institucionesEnEdicion,
    }))
    setInstitucionesModalOpen(false)
  }

  const toggleProfesor = (profesor: string) => {
    setProfesoresSeleccionados((prev) =>
      prev.includes(profesor) ? prev.filter((p) => p !== profesor) : [...prev, profesor],
    )
  }

  const removeProfesor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      profesores: prev.profesores.filter((_, i) => i !== index),
    }))
  }

  // Add the addInstitucionModal function after the addInstitucion function
  const addInstitucionModal = () => {
    if (nuevaInstitucion.trim()) {
      setInstitucionesEnEdicion((prev) => [...prev, nuevaInstitucion.trim()])
      setNuevaInstitucion("")
    }
  }

  // Add the removeInstitucionModal function after the removeInstitucion function
  const removeInstitucionModal = (index: number) => {
    setInstitucionesEnEdicion((prev) => prev.filter((_, i) => i !== index))
  }

  const addEstudiante = () => {
    if (nuevoEstudiante.trim()) {
      setFormData((prev) => ({
        ...prev,
        estudiantes: [...prev.estudiantes, nuevoEstudiante.trim()],
      }))
      setNuevoEstudiante("")
    }
  }

  const removeEstudiante = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      estudiantes: prev.estudiantes.filter((_, i) => i !== index),
    }))
  }

  const addEvidencia = () => {
    if (nuevaEvidencia.trim()) {
      setFormData((prev) => ({
        ...prev,
        evidencias: [...prev.evidencias, nuevaEvidencia.trim()],
      }))
      setNuevaEvidencia("")
    }
  }

  const removeEvidencia = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      evidencias: prev.evidencias.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Registrar Nueva Actividad de Movilidad</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre de la Actividad</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="alcance">Alcance de la Movilidad</Label>
                  <Select value={formData.alcance} onValueChange={(value) => handleChange("alcance", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar alcance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="nacional">Nacional</SelectItem>
                      <SelectItem value="internacional">Internacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.alcance === "nacional" && (
                  <div>
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input
                      id="ciudad"
                      value={formData.ciudad}
                      onChange={(e) => handleChange("ciudad", e.target.value)}
                    />
                  </div>
                )}

                {formData.alcance === "internacional" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pais">País</Label>
                      <Input id="pais" value={formData.pais} onChange={(e) => handleChange("pais", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="ciudad">Ciudad</Label>
                      <Input
                        id="ciudad"
                        value={formData.ciudad}
                        onChange={(e) => handleChange("ciudad", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="actividad">Descripción de la Actividad</Label>
                  <Textarea
                    id="actividad"
                    value={formData.actividad}
                    onChange={(e) => handleChange("actividad", e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="cantidadEstudiantes">Cantidad de Estudiantes</Label>
                  <Input
                    id="cantidadEstudiantes"
                    type="number"
                    min="1"
                    value={formData.cantidadEstudiantes}
                    onChange={(e) => handleChange("cantidadEstudiantes", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="lugar">Lugar</Label>
                  <Input id="lugar" value={formData.lugar} onChange={(e) => handleChange("lugar", e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Fecha de Inicio</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.fechaInicio && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.fechaInicio ? (
                            format(formData.fechaInicio, "PPP", { locale: es })
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.fechaInicio || undefined}
                          onSelect={(date) => handleChange("fechaInicio", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Fecha de Fin</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.fechaFin && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.fechaFin ? (
                            format(formData.fechaFin, "PPP", { locale: es })
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.fechaFin || undefined}
                          onSelect={(date) => handleChange("fechaFin", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Instituciones (Empresas)</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={openInstitucionesModal}
                      className="w-full justify-between"
                    >
                      <span>
                        {formData.instituciones.length
                          ? `${formData.instituciones.length} instituciones agregadas`
                          : "Agregar instituciones"}
                      </span>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.instituciones.length > 0 && (
                    <div className="mt-2 border rounded-md p-2">
                      <div className="flex flex-wrap gap-1">
                        {formData.instituciones.map((inst, index) => (
                          <div key={index} className="bg-muted text-xs rounded-full px-2 py-1 flex items-center gap-1">
                            <span>{inst}</span>
                            <button
                              type="button"
                              className="rounded-full hover:bg-muted-foreground/20 p-0.5"
                              onClick={() => removeInstitucion(index)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="anio">Año</Label>
                    <Input
                      id="anio"
                      type="number"
                      min="2000"
                      max="2100"
                      value={formData.anio}
                      onChange={(e) => handleChange("anio", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="semestre">Semestre</Label>
                    <Select value={formData.semestre} onValueChange={(value) => handleChange("semestre", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipoMovilidad">Tipo de Movilidad</Label>
                    <Select
                      value={formData.tipoMovilidad}
                      onValueChange={(value) => handleChange("tipoMovilidad", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entrante">Entrante</SelectItem>
                        <SelectItem value="saliente">Saliente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="modalidad">Modalidad</Label>
                    <Select value={formData.modalidad} onValueChange={(value) => handleChange("modalidad", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar modalidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="presencial">Presencial</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="objeto">Objeto</Label>
                  <Textarea
                    id="objeto"
                    value={formData.objeto}
                    onChange={(e) => handleChange("objeto", e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="profesorLider">Profesor Líder</Label>
                  <Select
                    value={formData.profesorLider}
                    onValueChange={(value) => handleChange("profesorLider", value)}
                  >
                    <SelectTrigger id="profesorLider">
                      <SelectValue placeholder="Seleccionar profesor líder" />
                    </SelectTrigger>
                    <SelectContent>
                      {profesoresList.map((profesor) => (
                        <SelectItem key={profesor} value={profesor}>
                          {profesor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Profesores que apoyan la actividad</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={openProfesoresModal}
                      className="w-full justify-between"
                    >
                      <span>
                        {formData.profesores.length
                          ? `${formData.profesores.length} profesores seleccionados`
                          : "Seleccionar profesores"}
                      </span>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.profesores.length > 0 && (
                    <div className="mt-2 border rounded-md p-2">
                      <div className="flex flex-wrap gap-1">
                        {formData.profesores.map((prof, index) => (
                          <div key={index} className="bg-muted text-xs rounded-full px-2 py-1 flex items-center gap-1">
                            <span>{prof}</span>
                            <button
                              type="button"
                              className="rounded-full hover:bg-muted-foreground/20 p-0.5"
                              onClick={() => removeProfesor(index)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="apoyoFinanciero">Apoyo Financiero de la Universidad ($)</Label>
                  <Input
                    id="apoyoFinanciero"
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.apoyoFinanciero}
                    onChange={(e) => handleChange("apoyoFinanciero", e.target.value)}
                    placeholder="Monto en pesos"
                  />
                </div>
              </div>
            </div>

            <div>
              <div>
                <Label>Evidencias</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      id="evidencia-file"
                      className="flex-1"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const fileName = e.target.files[0].name
                          setFormData((prev) => ({
                            ...prev,
                            evidencias: [...prev.evidencias, fileName],
                          }))
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        const fileInput = document.getElementById("evidencia-file") as HTMLInputElement
                        if (fileInput) {
                          fileInput.value = ""
                        }
                      }}
                      size="sm"
                    >
                      Agregar
                    </Button>
                  </div>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {formData.evidencias.map((evid, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span>{evid}</span>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeEvidencia(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/")}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-red-500 hover:bg-red-600">
                Registrar Actividad
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Modal de selección de profesores */}
      <Dialog open={profesoresModalOpen} onOpenChange={setProfesoresModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Seleccionar Profesores</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto py-4">
            <div className="space-y-4">
              {profesoresList.map((profesor) => (
                <div key={profesor} className="flex items-center space-x-2">
                  <Checkbox
                    id={`profesor-${profesor}`}
                    checked={profesoresSeleccionados.includes(profesor)}
                    onCheckedChange={() => toggleProfesor(profesor)}
                  />
                  <label
                    htmlFor={`profesor-${profesor}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {profesor}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setProfesoresModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={guardarProfesores} className="bg-red-500 hover:bg-red-600">
              Guardar Selección
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de selección de instituciones */}
      <Dialog open={institucionesModalOpen} onOpenChange={setInstitucionesModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Instituciones</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex space-x-2 mb-4">
              <Input
                value={nuevaInstitucion}
                onChange={(e) => setNuevaInstitucion(e.target.value)}
                placeholder="Nombre de la institución"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addInstitucionModal()
                  }
                }}
              />
              <Button type="button" onClick={addInstitucionModal} size="sm">
                Agregar
              </Button>
            </div>
            <div className="max-h-[40vh] overflow-y-auto">
              {institucionesEnEdicion.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No hay instituciones agregadas</p>
              ) : (
                <div className="space-y-2">
                  {institucionesEnEdicion.map((inst, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                      <span>{inst}</span>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeInstitucionModal(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setInstitucionesModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={guardarInstituciones} className="bg-red-500 hover:bg-red-600">
              Guardar Instituciones
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
