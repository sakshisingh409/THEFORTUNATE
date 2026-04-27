"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  CalendarPlus,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  ClipboardList,
  ShieldCheck,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type RoleOption = "Volunteer" | "Participant" | "Organizer" | "Speaker" | "Other"
type GenderOption = "Male" | "Female" | "Other" | ""
type YesNo = "Yes" | "No" | ""

type FormState = {
  fullName: string
  email: string
  phone: string
  gender: GenderOption
  age: string
  city: string
  state: string
  preferredRole: RoleOption | ""
  preferredRoleOther: string
  availableSlot: string
  canAttendFullEvent: YesNo
  motivation: string
  skills: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormState, string>>

export default function EventRegisterPage() {
  const searchParams = useSearchParams()
  const eventTitle = useMemo(() => searchParams.get("event") ?? "Upcoming event", [searchParams])

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    city: "",
    state: "",
    preferredRole: "",
    preferredRoleOther: "",
    availableSlot: "",
    canAttendFullEvent: "",
    motivation: "",
    skills: "",
    consent: false,
  })

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      age: "",
      city: "",
      state: "",
      preferredRole: "",
      preferredRoleOther: "",
      availableSlot: "",
      canAttendFullEvent: "",
      motivation: "",
      skills: "",
      consent: false,
    })
    setErrors({})
  }

  const validate = (s: FormState): FormErrors => {
    const next: FormErrors = {}

    const name = s.fullName.trim()
    if (!name) next.fullName = "Full Name is required."

    const email = s.email.trim()
    if (!email) next.email = "Email Address is required."
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address."

    const phone = s.phone.trim()
    if (!phone) next.phone = "Phone Number is required."

    if (!s.gender) next.gender = "Gender is required."

    const age = Number(s.age)
    if (!s.age.trim()) next.age = "Age is required."
    else if (!Number.isFinite(age) || age <= 0) next.age = "Enter a valid age."

    if (!s.city.trim()) next.city = "City is required."
    if (!s.state.trim()) next.state = "State is required."

    if (!s.preferredRole) next.preferredRole = "Preferred Role is required."
    if (s.preferredRole === "Other" && !s.preferredRoleOther.trim())
      next.preferredRoleOther = "Please specify your preferred role."

    if (!s.availableSlot.trim()) next.availableSlot = "Available Dates / Time Slots is required."
    if (!s.canAttendFullEvent) next.canAttendFullEvent = "Please select Yes or No."

    const motivation = s.motivation.trim()
    if (!motivation) next.motivation = "This field is required."
    else if (motivation.length > 200) next.motivation = "Keep it within 200 characters."

    if (!s.consent) next.consent = "Consent is required to continue."

    return next
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/event-registrations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          eventTitle,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          gender: form.gender,
          age: Number(form.age),
          city: form.city,
          state: form.state,
          preferredRole: form.preferredRole === "Other" ? form.preferredRoleOther : form.preferredRole,
          availableSlot: form.availableSlot,
          canAttendFullEvent: form.canAttendFullEvent === "Yes",
          motivation: form.motivation,
          skills: form.skills || null,
          consent: form.consent,
        }),
      })

      const data = (await res.json().catch(() => null)) as { error?: string } | null
      if (!res.ok) {
        setSubmitError(data?.error ?? "Failed to register. Please try again.")
        setIsSubmitting(false)
        return
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again."
      setSubmitError(msg)
      setIsSubmitting(false)
      return
    }

    resetForm()
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 right-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
              Event Registration
            </p>
            <h1 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Register for {eventTitle}
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Share your details and we’ll confirm your registration by email.
            </p>
          </div>

          <div className="mt-10 sm:mt-12">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary" />
                <h2 className="font-serif text-2xl font-bold text-foreground">Registration submitted!</h2>
                <p className="text-muted-foreground">We’ll reach out with the next steps shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 rounded-3xl border border-border/60 bg-card/90 p-6 shadow-xl shadow-black/5 backdrop-blur sm:p-8 lg:p-10"
              >
                {/* Section 1 */}
                <div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground">Personal Information</h2>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Tell us about yourself.</p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-foreground">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="fullName"
                          placeholder="Jane Doe"
                          className="h-12 pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                          value={form.fullName}
                          onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                          disabled={isSubmitting}
                        />
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      {errors.fullName ? <p className="mt-2 text-sm text-destructive">{errors.fullName}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@example.com"
                          className="h-12 pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          disabled={isSubmitting}
                        />
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      {errors.email ? <p className="mt-2 text-sm text-destructive">{errors.email}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="h-12 pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                          value={form.phone}
                          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                          disabled={isSubmitting}
                        />
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      {errors.phone ? <p className="mt-2 text-sm text-destructive">{errors.phone}</p> : null}
                    </div>

                    <div className="sm:col-span-2">
                      <fieldset>
                        <legend className="mb-2 block text-sm font-medium text-foreground">
                          Gender <span className="text-destructive">*</span>
                        </legend>
                        <div className="flex flex-wrap gap-3">
                          {(["Male", "Female", "Other"] as const).map((g) => (
                            <label
                              key={g}
                              className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary/60"
                            >
                              <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={form.gender === g}
                                onChange={() => setForm((p) => ({ ...p, gender: g }))}
                                disabled={isSubmitting}
                              />
                              {g}
                            </label>
                          ))}
                        </div>
                        {errors.gender ? <p className="mt-2 text-sm text-destructive">{errors.gender}</p> : null}
                      </fieldset>
                    </div>

                    <div>
                      <label htmlFor="age" className="mb-2 block text-sm font-medium text-foreground">
                        Age <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="age"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        className="h-12 transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                        value={form.age}
                        onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
                        disabled={isSubmitting}
                      />
                      {errors.age ? <p className="mt-2 text-sm text-destructive">{errors.age}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="city" className="mb-2 block text-sm font-medium text-foreground">
                        City <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="city"
                          placeholder="New Delhi"
                          className="h-12 pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                          value={form.city}
                          onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                          disabled={isSubmitting}
                        />
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      {errors.city ? <p className="mt-2 text-sm text-destructive">{errors.city}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="state" className="mb-2 block text-sm font-medium text-foreground">
                        State <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="state"
                        placeholder="Delhi"
                        className="h-12 transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                        value={form.state}
                        onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
                        disabled={isSubmitting}
                      />
                      {errors.state ? <p className="mt-2 text-sm text-destructive">{errors.state}</p> : null}
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="border-t border-border/60 pt-8">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground">Event Details</h2>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Help us plan your participation.</p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="preferredRole" className="mb-2 block text-sm font-medium text-foreground">
                        Preferred Role <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="preferredRole"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        value={form.preferredRole}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            preferredRole: e.target.value as FormState["preferredRole"],
                            preferredRoleOther: e.target.value === "Other" ? p.preferredRoleOther : "",
                          }))
                        }
                        disabled={isSubmitting}
                      >
                        <option value="">Select a role...</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Participant">Participant</option>
                        <option value="Organizer">Organizer</option>
                        <option value="Speaker">Speaker</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.preferredRole ? (
                        <p className="mt-2 text-sm text-destructive">{errors.preferredRole}</p>
                      ) : null}
                    </div>

                    {form.preferredRole === "Other" ? (
                      <div>
                        <label htmlFor="preferredRoleOther" className="mb-2 block text-sm font-medium text-foreground">
                          Other (please specify) <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="preferredRoleOther"
                          placeholder="e.g., Photographer"
                          className="h-12 transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                          value={form.preferredRoleOther}
                          onChange={(e) => setForm((p) => ({ ...p, preferredRoleOther: e.target.value }))}
                          disabled={isSubmitting}
                        />
                        {errors.preferredRoleOther ? (
                          <p className="mt-2 text-sm text-destructive">{errors.preferredRoleOther}</p>
                        ) : null}
                      </div>
                    ) : (
                      <div className="hidden sm:block" />
                    )}

                    <div className="sm:col-span-2">
                      <label htmlFor="availableSlot" className="mb-2 block text-sm font-medium text-foreground">
                        Available Dates / Time Slots <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="availableSlot"
                        placeholder="e.g., 15 May (10am–1pm) or Weekends"
                        className="h-12 transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                        value={form.availableSlot}
                        onChange={(e) => setForm((p) => ({ ...p, availableSlot: e.target.value }))}
                        disabled={isSubmitting}
                      />
                      {errors.availableSlot ? (
                        <p className="mt-2 text-sm text-destructive">{errors.availableSlot}</p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <fieldset>
                        <legend className="mb-2 block text-sm font-medium text-foreground">
                          Can you attend full event? <span className="text-destructive">*</span>
                        </legend>
                        <div className="flex flex-wrap gap-3">
                          {(["Yes", "No"] as const).map((v) => (
                            <label
                              key={v}
                              className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary/60"
                            >
                              <input
                                type="radio"
                                name="canAttendFullEvent"
                                value={v}
                                checked={form.canAttendFullEvent === v}
                                onChange={() => setForm((p) => ({ ...p, canAttendFullEvent: v }))}
                                disabled={isSubmitting}
                              />
                              {v}
                            </label>
                          ))}
                        </div>
                        {errors.canAttendFullEvent ? (
                          <p className="mt-2 text-sm text-destructive">{errors.canAttendFullEvent}</p>
                        ) : null}
                      </fieldset>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="border-t border-border/60 pt-8">
                  <div className="flex items-center gap-2">
                    <CalendarPlus className="h-5 w-5 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground">Additional Information</h2>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">A quick note helps us match you better.</p>

                  <div className="mt-6 grid gap-5">
                    <div>
                      <label htmlFor="motivation" className="mb-2 block text-sm font-medium text-foreground">
                        Why do you want to join this event? <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="motivation"
                        placeholder="Tell us in one or two lines..."
                        required
                        rows={4}
                        className="resize-none transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                        value={form.motivation}
                        onChange={(e) => setForm((p) => ({ ...p, motivation: e.target.value }))}
                        disabled={isSubmitting}
                        maxLength={220}
                      />
                      <div className="mt-2 flex items-center justify-between gap-3">
                        {errors.motivation ? (
                          <p className="text-sm text-destructive">{errors.motivation}</p>
                        ) : (
                          <span className="text-sm text-muted-foreground">Max 200 characters.</span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {Math.min(form.motivation.length, 200)}/200
                        </span>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="skills" className="mb-2 block text-sm font-medium text-foreground">
                        Skills / Interests <span className="text-muted-foreground">(optional)</span>
                      </label>
                      <Textarea
                        id="skills"
                        placeholder="e.g., Teaching, logistics, first aid, photography..."
                        rows={3}
                        className="resize-none transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
                        value={form.skills}
                        onChange={(e) => setForm((p) => ({ ...p, skills: e.target.value }))}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="border-t border-border/60 pt-8">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground">Consent</h2>
                  </div>
                  <div className="mt-4">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background px-4 py-4 transition-colors hover:bg-secondary/60">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={form.consent}
                        onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-foreground">
                        I agree to participate voluntarily <span className="text-destructive">*</span>
                      </span>
                    </label>
                    {errors.consent ? <p className="mt-2 text-sm text-destructive">{errors.consent}</p> : null}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 text-base shadow-md shadow-primary/10 transition-transform duration-300 hover:scale-[1.01]"
                    disabled={isSubmitting}
                  >
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                  {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

