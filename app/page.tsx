"use client"

import { LoginForm } from "@/components/login-form"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  //using username on localstorage to mock token
  //this should move to app with storeprovider for global sharing 
  useEffect(() => {
    var username = localStorage.getItem("username")
    if (username) router.push("/rooms")
  }, [])

  return (
    <div>
      <LoginForm />
    </div>
  )
}