import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import crypto from "crypto"
import fs from "fs/promises"
import path from "path"

function contentPath() {
  return path.join(process.cwd(), "content", "site-content.json")
}

function makeToken(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

async function isAuthed(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  return token === makeToken(adminPassword)
}

export async function GET() {
  const p = contentPath()
  try {
    const data = await fs.readFile(p, "utf-8")
    return NextResponse.json(JSON.parse(data))
  } catch {
    return NextResponse.json({ error: "Content not found" }, { status: 404 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  // Basic validation: ensure cs and en keys exist
  if (!body.cs || !body.en) {
    return NextResponse.json(
      { error: "Content must have cs and en keys" },
      { status: 400 },
    )
  }

  await fs.writeFile(contentPath(), JSON.stringify(body, null, 2), "utf-8")
  return NextResponse.json({ ok: true })
}
