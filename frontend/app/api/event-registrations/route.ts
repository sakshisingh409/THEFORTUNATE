import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

const RegistrationSchema = z.object({
  eventTitle: z.string().trim().min(1).max(300),
  fullName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(5).max(50),
  gender: z.enum(["Male", "Female", "Other"]),
  age: z.number().int().positive(),
  city: z.string().trim().min(1).max(120),
  state: z.string().trim().min(1).max(120),
  preferredRole: z.string().trim().min(1).max(300),
  availableSlot: z.string().trim().min(1).max(300),
  canAttendFullEvent: z.boolean(),
  motivation: z.string().trim().min(1).max(200),
  skills: z.string().trim().max(2000).nullable().optional(),
  consent: z.literal(true),
})

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? ""
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""

    if (!supabaseUrl || !serviceRoleKey) {
      return Response.json(
        {
          error:
            "Server is not configured. Please set SUPABASE_SERVICE_ROLE_KEY (and NEXT_PUBLIC_SUPABASE_URL).",
        },
        { status: 500 }
      )
    }

    let payload: unknown
    try {
      payload = await req.json()
    } catch {
      return Response.json({ error: "Invalid JSON body." }, { status: 400 })
    }

    const parsed = RegistrationSchema.safeParse(payload)
    if (!parsed.success) {
      return Response.json(
        { error: "Invalid form data.", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    // Create this table in Supabase:
    // event_registrations(event_title text, full_name text, email text, phone text, gender text, age int, city text, state text,
    // preferred_role text, available_slot text, can_attend_full_event boolean, motivation text, skills text, consent boolean, created_at timestamptz default now())
    const { error } = await supabaseAdmin.from("event_registrations").insert([
      {
        event_title: parsed.data.eventTitle,
        full_name: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        gender: parsed.data.gender ?? null,
        age: parsed.data.age,
        city: parsed.data.city,
        state: parsed.data.state,
        preferred_role: parsed.data.preferredRole,
        available_slot: parsed.data.availableSlot,
        can_attend_full_event: parsed.data.canAttendFullEvent,
        motivation: parsed.data.motivation,
        skills: parsed.data.skills ?? null,
        consent: parsed.data.consent,
      },
    ])

    if (error) {
      return Response.json(
        { error: error.message, code: error.code, details: error.details, hint: error.hint },
        { status: 400 }
      )
    }

    return Response.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error"
    return Response.json({ error: message }, { status: 500 })
  }
}

