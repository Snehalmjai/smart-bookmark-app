"use client"
import { supabase } from "../lib/supabaseClient"

export default function BookmarkList({
  bookmarks,
  onDeleted,
}: {
  bookmarks: any[]
  onDeleted: () => void
}) {
  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id)
    if (error) {
      console.error("Delete error:", error.message)
    } else {
      onDeleted()   // ✅ refresh bookmarks list after delete
    }
  }

  if (bookmarks.length === 0) {
    return <p className="text-gray-500">No bookmarks yet. Add one above!</p>
  }

  return (
    <ul>
      {bookmarks.map((b) => (
        <li
          key={b.id}
          className="flex justify-between items-center border-b py-2"
        >
          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            {b.title}
          </a>
          <button
            onClick={() => deleteBookmark(b.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
