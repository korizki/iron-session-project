"use client"

const inputStyle = "block w-full mb-4 p-3 bg-slate-100 rounded-lg "
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [isExpiredSession, setIsExpiredSession] = useState<boolean>(false)
  // handle login 
  const handleLogin = async (e: React.SyntheticEvent, email: string, name: string) => {
    e.preventDefault()
    const body = { email, name }
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application-json" }
    })
    if (response.ok) {
      sessionStorage.setItem('session', '')
      router.push("/home")
    }
  }
  useEffect(() => {
    const expiredSession = sessionStorage.getItem('session')
    if (expiredSession) {
      setIsExpiredSession(true)
      setTimeout(() => {
        setIsExpiredSession(false)
      }, 5000)
    }
  }, [])
  return (
    <main className="absolute w-full h-full justify-center items-center flex ">
      <div className="bg-white p-6 px-8 rounded-lg shadow-md w-[35%]">
        <h1 className="text-[2em] font-semibold text-slate-700">Form Login</h1>
        <p className="text-slate-500 mt-1">Please complete this form below</p>
        <form action="" className="mt-6" onSubmit={e => handleLogin(e, email, name)}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputStyle}
            placeholder="e.g. rzk.ramadhan@gmail.com"
            required
          />
          <input
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
            className={inputStyle}
            placeholder="e.g. Rizki Ramadhan"
            required
          />
          <button className="w-full bg-purple-600 p-3 text-white rounded-lg cursor-pointer mb-3 hover:bg-purple-800">Log In</button>
        </form>
        <p className="text-center text-rose-500">{isExpiredSession ? 'Your session has expired / successfully logged out ' : "Email and Password can't be blank"}</p>
      </div>
    </main>
  )
}