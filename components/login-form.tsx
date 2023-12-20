"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login } from "@/lib/loginService"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login({ username });
      localStorage.setItem("username", username);
      localStorage.setItem("sId", res);

      //set timeout for 1 hour - 1 second to remove all the localstorage
      setTimeout(() => {
        localStorage.removeItem("username");
        localStorage.removeItem("sId");
      }, 1000 * 60 * 60 - 1000);


      router.push('/rooms');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
          <CardDescription className="text-gray-500 text-center">
            Please enter your credentials to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input className="w-full" id="username" placeholder="Username" value={username}
              onChange={(e) => setUsername(e.target.value)} required type="text" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </main>
  )
}
