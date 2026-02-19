"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type LangContent = Record<string, string>
type SiteContent = { cs: LangContent; en: LangContent }

const FIELD_LABELS: Record<string, string> = {
  subtitle: "Subtitle",
  date: "Date",
  reservation: "Reservation info",
  dinners: "Dinners count",
  description: "Description",
  tags: "Tags",
  cta: "CTA button text",
  ctaSub: "CTA subtitle",
  ctaUrl: "CTA link URL",
  about: "About link text",
  city: "City",
  aboutTitle: "About title",
  aboutText: "About text",
  aboutQuote: "About quote",
}

const LONG_FIELDS = new Set(["description", "aboutText", "aboutQuote", "tags"])

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [content, setContent] = useState<SiteContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")

  useEffect(() => {
    // Try loading content — if it works with the existing cookie, we're authed
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        if (data.cs && data.en) setContent(data)
      })
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError("")
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      setLoginError("Wrong password")
      return
    }
    setAuthed(true)
    setPassword("")
    // Load content after auth
    const contentRes = await fetch("/api/content")
    const data = await contentRes.json()
    if (data.cs && data.en) setContent(data)
  }

  async function handleSave() {
    if (!content) return
    setSaving(true)
    setSaveMsg("")
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    })
    setSaving(false)
    if (res.ok) {
      setSaveMsg("Saved!")
      setTimeout(() => setSaveMsg(""), 2000)
    } else {
      const data = await res.json()
      setSaveMsg(data.error || "Save failed")
    }
  }

  function updateField(lang: "cs" | "en", key: string, value: string) {
    if (!content) return
    setContent({
      ...content,
      [lang]: { ...content[lang], [key]: value },
    })
  }

  if (!authed) {
    return (
      <div className="min-h-svh flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <h1 className="text-lg font-medium">Admin Login</h1>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {loginError && (
            <p className="text-sm text-destructive">{loginError}</p>
          )}
          <Button type="submit">Log in</Button>
        </form>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-svh flex items-center justify-center p-4">
        <p className="text-muted-foreground">Loading content…</p>
      </div>
    )
  }

  const fields = Object.keys(FIELD_LABELS)

  return (
    <div className="min-h-svh p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-medium">Content Editor</h1>
        <div className="flex items-center gap-3">
          {saveMsg && (
            <span className="text-sm text-muted-foreground">{saveMsg}</span>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="cs">
        <TabsList>
          <TabsTrigger value="cs">Čeština</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>

        {(["cs", "en"] as const).map((lang) => (
          <TabsContent key={lang} value={lang} className="flex flex-col gap-4 mt-4">
            {fields.map((key) => (
              <div key={key} className="flex flex-col gap-1.5">
                <Label htmlFor={`${lang}-${key}`}>{FIELD_LABELS[key]}</Label>
                {LONG_FIELDS.has(key) ? (
                  <Textarea
                    id={`${lang}-${key}`}
                    value={content[lang][key] ?? ""}
                    onChange={(e) => updateField(lang, key, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={`${lang}-${key}`}
                    value={content[lang][key] ?? ""}
                    onChange={(e) => updateField(lang, key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
