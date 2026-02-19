"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabaseClient"
import AuthButton from "../components/AuthButton"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        router.push("/bookmarks")   // ✅ redirect after login
      }
    }
    checkSession()

    // Listen for login events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        router.push("/bookmarks")
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Smart Bookmark App</h1>
      <AuthButton />
    </div>
  )
}
