import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}))
app.use(express.json())

// 🔐 Env check (important)
const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Missing Supabase environment variables")
  process.exit(1)
}

// Supabase client
const supabase = createClient(supabaseUrl, serviceRoleKey)

// ✅ ROOT ROUTE (browser test ke liye)
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running 🚀")
})

// Validation schema
const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  city: z.string(),
  preferredRole: z.string(),
  motivation: z.string(),
})

// ✅ API ROUTE
app.post("/volunteers", async (req: Request, res: Response) => {
  try {
    const parsed = schema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid data" })
    }

    const { error } = await supabase.from("volunteers").insert([
      {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        city: parsed.data.city,
        preferred_role: parsed.data.preferredRole,
        motivation: parsed.data.motivation,
      },
    ])

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    return res.json({ message: "Saved successfully" })
  } catch (err) {
    return res.status(500).json({ error: "Server error" })
  }
})

// Server start
app.listen(5001, () => {
  console.log("🚀 Server running on http://localhost:5001")
})