"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import BookmarkForm from "../../components/BookmarkForm"
import BookmarkList from "../../components/BookmarkList"

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  const fetchBookmarks = async (userId: string) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Fetch error:", error.message)
    } else {
      setBookmarks(data || [])
    }
  }

  useEffect(() => {
    const loadSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        fetchBookmarks(session.user.id)
      }
    }
    loadSession()
  }, [])

  if (!user) return <p>Please log in first.</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Bookmarks</h2>
      <BookmarkForm userId={user.id} onAdded={() => fetchBookmarks(user.id)} />
      <BookmarkList bookmarks={bookmarks} onDeleted={() => fetchBookmarks(user.id)} />
    </div>
  )
}
