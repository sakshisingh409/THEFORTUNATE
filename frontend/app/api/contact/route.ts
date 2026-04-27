import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  subject: z.string().trim().min(1).max(300),
  message: z.string().trim().min(1).max(10000),
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

    const parsed = ContactSchema.safeParse(payload)
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
    // contact_messages(name text, email text, subject text, message text, created_at timestamptz default now())
    const { error } = await supabaseAdmin.from("contact_messages").insert([
      {
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
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

