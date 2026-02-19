"use client"
import { supabase } from "../lib/supabaseClient"

export default function AuthButton() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" })
  }

  return (
    <button onClick={signIn} className="bg-blue-600 text-white px-4 py-2 rounded">
      Sign in with Google
    </button>
  )
}