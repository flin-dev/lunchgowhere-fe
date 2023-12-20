"use client"

import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Home() {
  const [sessionId, setSessionId] = useState("");
  useEffect(() => {
    if (sessionId != "") { localStorage.setItem("sessionId", sessionId) }
  }, [sessionId])
  return (
    <div>
      <LoginForm />
    </div>
  )
}