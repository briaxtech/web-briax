"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

type QuestionType = "text" | "email" | "phone" | "textarea" | "radio"

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  current_sales_automation: string
  which_tool: string
  monthly_leads: string
  pain_point: string
  decision_timeline: string
  budget_for_solution: string
  preferred_contact_method: string
  how_found: string
}

interface QuestionConfig {
  id: keyof FormData
  type: QuestionType
  title: string
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  conditional?: boolean
  showWhen?: { field: keyof FormData; value: string }
}

const questions: QuestionConfig[] = [
  {
    id: "name",
    type: "text",
    title: "Cual es tu nombre completo?",
    required: true,
    placeholder: "Ej. Ana Garcia",
  },
  {
    id: "email",
    type: "email",
    title: "Cual es tu correo electronico?",
    required: true,
    placeholder: "nombre@empresa.com",
  },
  {
    id: "phone",
    type: "phone",
    title: "Cual es tu numero de telefono?",
    required: false,
    placeholder: "+34 612 34 56 78",
  },
  {
    id: "company",
    type: "text",
    title: "Cual es el nombre de tu empresa o proyecto?",
    required: true,
    placeholder: "Ej. Mi Empresa SL",
  },
  {
    id: "current_sales_automation",
    type: "radio",
    title: "Actualmente usas algun sistema o agente automatico para responder leads?",
    required: true,
    options: [
      { value: "si", label: "Si" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "which_tool",
    type: "text",
    title: "Que herramienta usas?",
    required: true,
    placeholder: "Ej. HubSpot, Salesforce, etc.",
    conditional: true,
    showWhen: { field: "current_sales_automation", value: "si" },
  },
  {
    id: "monthly_leads",
    type: "radio",
    title: "Cuantos leads promedio recibes al mes?",
    required: true,
    options: [
      { value: "<50", label: "Menos de 50" },
      { value: "50-200", label: "50-200" },
      { value: "200-1000", label: "200-1000" },
      { value: ">1000", label: "Mas de 1000" },
    ],
  },
  {
    id: "pain_point",
    type: "textarea",
    title: "Cual es tu mayor desafio actual en el proceso de ventas?",
    required: true,
    placeholder: "Describe tu principal desafio en el proceso de ventas...",
  },
  {
    id: "decision_timeline",
    type: "radio",
    title: "En que plazo planeas implementar un agente de IA para ventas?",
    required: true,
    options: [
      { value: "inmediato", label: "Inmediato (0-2 semanas)" },
      { value: "1-2-meses", label: "1-2 meses" },
      { value: "3-6-meses", label: "3-6 meses" },
      { value: "flexible", label: "Flexible" },
    ],
  },
  {
    id: "budget_for_solution",
    type: "radio",
    title: "Cual es tu presupuesto estimado para esta solucion?",
    required: true,
    options: [
      { value: "<1000", label: "<1.000 e" },
      { value: "1000-5000", label: "1.000-5.000 e" },
      { value: "5000-20000", label: "5.000-20.000 e" },
      { value: ">20000", label: ">20.000 e" },
      { value: "no-seguro", label: "No estoy seguro" },
    ],
  },
  {
    id: "preferred_contact_method",
    type: "radio",
    title: "Como prefieres que nos comuniquemos contigo?",
    required: true,
    options: [
      { value: "email", label: "Email" },
      { value: "telefono", label: "Telefono" },
      { value: "ambos", label: "Ambos" },
    ],
  },
  {
    id: "how_found",
    type: "text",
    title: "Como nos conociste? (opcional)",
    required: false,
    placeholder: "Cuentanos como llegaste hasta nosotros",
  },
]

const createInitialFormData = (): FormData => ({
  name: "",
  email: "",
  phone: "",
  company: "",
  current_sales_automation: "",
  which_tool: "",
  monthly_leads: "",
  pain_point: "",
  decision_timeline: "",
  budget_for_solution: "",
  preferred_contact_method: "",
  how_found: "",
})

const calendlySchedulingUrl = "https://calendly.com/brian-niwoyda/30min"
const calendlyFrameHeight = 820
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[+]?[0-9\s-]{8,20}$/
const MIN_PAIN_POINT_LENGTH = 12
const MIN_NAME_WORDS = 2
const MAX_HOW_FOUND_LENGTH = 120

function validateQuestion(question: QuestionConfig, value: string, data: FormData) {
  const trimmed = value.trim()

  if (question.type === "radio") {
    if (question.required && !value) {
      return "Selecciona una opcion para continuar."
    }
    return null
  }

  if (question.required && !trimmed) {
    return "Completa este campo para continuar."
  }

  switch (question.id) {
    case "name": {
      if (trimmed.split(/\s+/).length < MIN_NAME_WORDS) {
        return "Escribe tu nombre y apellido."
      }
      break
    }
    case "email": {
      if (!emailRegex.test(trimmed)) {
        return "Ingresa un correo valido."
      }
      break
    }
    case "phone": {
      if (trimmed && !phoneRegex.test(trimmed)) {
        return "Ingresa un telefono valido (8 digitos o mas)."
      }
      break
    }
    case "company": {
      if (trimmed.length < 2) {
        return "Ingresa el nombre de tu empresa."
      }
      break
    }
    case "which_tool": {
      if (data.current_sales_automation === "si" && trimmed.length < 2) {
        return "Indica la herramienta que utilizas."
      }
      break
    }
    case "pain_point": {
      if (trimmed.length < MIN_PAIN_POINT_LENGTH) {
        return "Describe brevemente tu desafio principal."
      }
      break
    }
    case "how_found": {
      if (trimmed.length > MAX_HOW_FOUND_LENGTH) {
        return "Usa un maximo de 120 caracteres."
      }
      break
    }
    default:
      break
  }

  return null
}

export default function FormularioPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(-1)
  const [formData, setFormData] = useState<FormData>(() => createInitialFormData())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentError, setCurrentError] = useState<string | null>(null)

  const visibleQuestions = useMemo(() => {
    return questions.filter((question) => {
      if (!question.conditional) {
        return true
      }
      if (question.showWhen) {
        return formData[question.showWhen.field] === question.showWhen.value
      }
      return true
    })
  }, [formData])

  const totalSteps = visibleQuestions.length + 1
  const isCalendlyStep = currentStep >= 0 && currentStep === visibleQuestions.length
  const isQuestionStep = currentStep >= 0 && currentStep < visibleQuestions.length
  const progress = currentStep >= 0 ? ((currentStep + 1) / totalSteps) * 100 : 0

  const currentQuestion = isQuestionStep ? visibleQuestions[currentStep] : null
  const currentValue = currentQuestion ? formData[currentQuestion.id] : ""
  const trimmedCurrentValue = currentValue.trim()
  const canProceed =
    !currentQuestion ||
    (currentQuestion.type === "radio"
      ? Boolean(currentValue)
      : !currentQuestion.required || Boolean(trimmedCurrentValue))

  useEffect(() => {
    setCurrentError(null)
  }, [currentStep])

  const isHighPriorityLead = () =>
    formData.decision_timeline === "inmediato" || formData.budget_for_solution === ">20000"

  const resetForm = useCallback(() => {
    setFormData(createInitialFormData())
    setCurrentStep(-1)
    setIsSubmitted(false)
    setCurrentError(null)
  }, [])

  const handleNext = () => {
    if (currentStep === -1) {
      setCurrentError(null)
      setCurrentStep(0)
      return
    }

    if (isQuestionStep && currentQuestion) {
      const errorMessage = validateQuestion(currentQuestion, currentValue, formData)
      if (errorMessage) {
        setCurrentError(errorMessage)
        return
      }

      setCurrentError(null)
      setCurrentStep((prev) => prev + 1)
      return
    }

    if (isCalendlyStep) {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    setCurrentError(null)

    if (currentStep === -1) {
      return
    }

    if (currentStep === 0) {
      setCurrentStep(-1)
      return
    }

    setCurrentStep((prev) => Math.max(-1, prev - 1))
  }

  const handleSubmit = () => {
    setCurrentError(null)

    const submissionData = {
      ...formData,
      isHighPriority: isHighPriorityLead(),
      submittedAt: new Date().toISOString(),
    }

    console.log("Form submitted:", submissionData)
    router.push("/agradecimiento")
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setCurrentError(null)
  }

  const renderProgressHeader = () => (
    <div className="fixed left-0 right-0 top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-4 md:px-10">
        <div className="flex items-center justify-between">
          <Image src="/images/briax-logo-full.png" alt="BrIAx" width={96} height={32} className="opacity-80" />
          <span className="text-sm font-semibold text-violet-600">{Math.round(progress)}%</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
          <span>
            Paso {currentStep + 1} de {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-200" />
      </div>
    </div>
  )

  const renderQuestionStep = () => {
    if (!currentQuestion) {
      return null
    }

    const showError = Boolean(currentError)

    return (
      <div className="relative min-h-screen bg-white">
        {renderProgressHeader()}
        <div className="flex min-h-screen items-center justify-center px-6 pb-16 pt-36 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <Card className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
                <CardContent>
                  <div className="mb-10">
                    <h2 className="mb-8 text-4xl font-bold leading-tight text-gray-900">{currentQuestion.title}</h2>

                    {currentQuestion.type === "text" && (
                      <Input
                        type="text"
                        placeholder={currentQuestion.placeholder}
                        value={currentValue}
                        onChange={(event) => updateFormData(currentQuestion.id, event.target.value)}
                        aria-invalid={showError}
                        className={`h-16 rounded-lg border p-6 text-xl focus:ring-2 transition-all duration-200 ${
                          showError
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-violet-600 focus:ring-violet-600"
                        }`}
                        autoFocus
                      />
                    )}

                    {currentQuestion.type === "email" && (
                      <Input
                        type="email"
                        placeholder={currentQuestion.placeholder}
                        value={currentValue}
                        onChange={(event) => updateFormData(currentQuestion.id, event.target.value)}
                        aria-invalid={showError}
                        className={`h-16 rounded-lg border p-6 text-xl focus:ring-2 transition-all duration-200 ${
                          showError
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-violet-600 focus:ring-violet-600"
                        }`}
                        autoFocus
                      />
                    )}

                    {currentQuestion.type === "phone" && (
                      <Input
                        type="tel"
                        placeholder={currentQuestion.placeholder}
                        value={currentValue}
                        onChange={(event) => updateFormData(currentQuestion.id, event.target.value)}
                        aria-invalid={showError}
                        className={`h-16 rounded-lg border p-6 text-xl focus:ring-2 transition-all duration-200 ${
                          showError
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-violet-600 focus:ring-violet-600"
                        }`}
                        autoFocus
                      />
                    )}

                    {currentQuestion.type === "textarea" && (
                      <Textarea
                        placeholder={currentQuestion.placeholder}
                        value={currentValue}
                        onChange={(event) => updateFormData(currentQuestion.id, event.target.value)}
                        aria-invalid={showError}
                        className={`min-h-40 rounded-lg border p-6 text-xl focus:ring-2 transition-all duration-200 ${
                          showError
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-violet-600 focus:ring-violet-600"
                        }`}
                        autoFocus
                      />
                    )}

                    {currentQuestion.type === "radio" && (
                      <RadioGroup
                        value={currentValue}
                        onValueChange={(value) => updateFormData(currentQuestion.id, value)}
                        className="space-y-4"
                        aria-invalid={showError}
                      >
                        {currentQuestion.options?.map((option, index) => {
                          const optionId = `${currentQuestion.id}-${option.value}`
                          const optionBorderClass = showError ? "border-red-400" : "border-gray-300"

                          return (
                            <motion.div
                              key={option.value}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.08 }}
                            >
                              <Label
                                htmlFor={optionId}
                                className={`flex cursor-pointer items-center space-x-4 rounded-lg border-2 ${optionBorderClass} p-6 transition-all duration-300 hover:border-violet-600 hover:bg-violet-50 hover:shadow-md`}
                              >
                                <RadioGroupItem value={option.value} id={optionId} className="h-5 w-5" />
                                <span className="text-lg font-medium">{option.label}</span>
                              </Label>
                            </motion.div>
                          )
                        })}
                      </RadioGroup>
                    )}

                    {showError && (
                      <p className="mt-4 text-base font-medium text-red-600">{currentError}</p>
                    )}
                  </div>

                  <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      variant="ghost"
                      onClick={handlePrevious}
                      className="group w-full rounded-xl px-8 py-4 text-lg transition-all duration-300 hover:bg-gray-100 sm:w-auto"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                      Anterior
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="group w-full rounded-xl bg-violet-600 px-8 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:bg-violet-700 hover:shadow-xl disabled:opacity-50 sm:w-auto"
                    >
                      {currentStep === visibleQuestions.length - 1 ? "Continuar" : "Siguiente"}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  const renderCalendlyStep = () => (
    <div className="relative min-h-screen bg-white">
      {renderProgressHeader()}
      <div className="flex min-h-screen items-center justify-center px-6 pb-16 pt-36 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key="calendly"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <Card className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-8 shadow-xl">
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl bg-violet-50 px-4 py-3 text-violet-700">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Agenda tu demo</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold leading-tight text-gray-900">Reserva el mejor horario para ti</h2>
                    <p className="text-lg text-gray-600">
                      Selecciona la fecha y hora que prefieras. Cuando termines, vuelve para confirmar tu solicitud.
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-inner">
                  <iframe
                    src={`${calendlySchedulingUrl}?hide_gdpr_banner=1&hide_landing_page_details=1`}
                    className="w-full"
                    style={{ height: `${calendlyFrameHeight}px` }}
                    title="Calendly scheduling"
                    frameBorder="0"
                    scrolling="no"
                  />
                </div>

                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    variant="ghost"
                    onClick={handlePrevious}
                    className="group w-full rounded-xl px-8 py-4 text-lg transition-all duration-300 hover:bg-gray-100 sm:w-auto"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    Volver
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="group w-full rounded-xl bg-violet-600 px-8 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:bg-violet-700 hover:shadow-xl sm:w-auto"
                  >
                    Ya agende mi demo
                    <CheckCircle className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )

  const renderSubmitted = () => {
    const highPriority = isHighPriorityLead()

    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl">
            <CardContent>
              <Image src="/images/briax-logo-full.png" alt="BrIAx" width={120} height={40} className="mx-auto mb-6" />
              <CheckCircle className="mx-auto mb-6 h-16 w-16 text-violet-600" />

              {highPriority ? (
                <>
                  <h1 className="mb-4 text-4xl font-bold text-gray-900">Genial! Tu demo esta confirmada</h1>
                  <p className="mx-auto mb-6 max-w-xl text-lg text-gray-600">
                    Hemos priorizado tu solicitud y recibiras un recordatorio con los detalles de la reunion. Si necesitas
                    reprogramar, responde al correo de confirmacion.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="mb-4 text-4xl font-bold text-gray-900">Gracias por tu interes</h1>
                  <p className="mx-auto mb-6 max-w-xl text-lg text-gray-600">
                    En las proximas 24-48 horas te enviaremos mas informacion y material personalizado para tu caso.
                  </p>
                </>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="rounded-xl bg-violet-600 px-8 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:bg-violet-700 hover:shadow-xl"
                  onClick={resetForm}
                >
                  Completar otra solicitud
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl px-8 py-4 text-lg">
                  <Link href="/">Volver al inicio</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const renderWelcome = () => (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-3xl rounded-2xl bg-white p-8 text-center shadow-xl">
          <CardContent>
            <Image src="/images/briax-logo-circle.png" alt="BrIAx" width={96} height={96} className="mx-auto mb-6" />
            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">Descubre BrIAx</h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600">
              En menos de 2 minutos cuentanos sobre tu negocio y te mostraremos una propuesta clara de como nuestros agentes
              de IA pueden potenciar tus ventas.
            </p>

            <Button
              size="lg"
              onClick={handleNext}
              className="group rounded-xl bg-violet-600 px-8 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:bg-violet-700 hover:shadow-xl"
            >
              Empezar
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="mt-6 text-base font-medium text-gray-500">
              {totalSteps} pasos - Tiempo estimado: 2 minutos
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  if (isSubmitted) {
    return renderSubmitted()
  }

  if (currentStep === -1) {
    return renderWelcome()
  }

  if (isCalendlyStep) {
    return renderCalendlyStep()
  }

  return renderQuestionStep()
}


