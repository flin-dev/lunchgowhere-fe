"use client"

import { LoginForm } from "@/components/login-form"
import { useEffect, useState } from "react"
import { redirect } from 'next/navigation'

export default function Home() {
  //using sessionId on localstorage to mock Login of user
  //this should move to app with storeprovider for global sharing 
  const [sessionId, setSessionId] = useState("");
  useEffect(() => {
    localStorage.getItem("sessionId")
    redirect("/rooms")
  }, [])

  useEffect(() => {
    if (sessionId != "") {
      localStorage.setItem("sessionId", sessionId)
      redirect("/rooms")
    }
  }, [sessionId])
  return (
    <div>
      <LoginForm />
    </div>
  )
}