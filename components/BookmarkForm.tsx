"use client"
import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function BookmarkForm({
  userId,
  onAdded,
}: {
  userId: string
  onAdded: () => void
}) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const addBookmark = async () => {
    if (!title || !url) return
    const { error } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: userId }])

    if (error) {
      console.error("Insert error:", error.message)
    } else {
      setTitle("")
      setUrl("")
      onAdded()   // ✅ safe now, because parent passed a function
    }
  }

  return (
    <div className="mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 mr-2"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        className="border p-2 mr-2"
      />
      <button
        onClick={addBookmark}
        className="bg-green-600 text-white px-3 py-2 rounded"
      >
        Add
      </button>
    </div>
  )
}
