import { Hero } from "@/components/hero"
import fs from "fs/promises"
import path from "path"

async function loadContent() {
  try {
    const filePath = path.join(process.cwd(), "content", "site-content.json")
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch {
    return null
  }
}

export default async function Page() {
  const content = await loadContent()
  return <Hero content={content} />
}
