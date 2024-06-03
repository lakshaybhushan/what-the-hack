"use client"
import { useState } from "react"
export default function InputForm() {
  const [summarized, setSummarized] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const queryInput = form.elements.namedItem("hnUrl") as HTMLInputElement

    if (!queryInput) {
      console.error("No query input found")
      return
    }

    const url = `/api/stream?hnUrl=${queryInput.value}`
    const response = await fetch(url)
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let done = false
    let text = ""

    if (!reader) {
      return "Summary cannot be generated. Please try again."
    }

    while (!done) {
      const { value, done: readerDone } = await reader.read()
      done = readerDone
      text += decoder.decode(value)
      setSummarized(text)
    }
  }

  return (
    <div className="w-full my-10 flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          name="hnUrl"
          placeholder="https://news.ycombinator.com/item?id="
          className="border border-gray-300 p-4 rounded-xl text-slate-100 bg-black w-[60vw]"
        />
        <button
          type="submit"
          className="bg-white text-black p-2 rounded-md w-64 mt-8">
          Summarize
        </button>
      </form>

      {summarized ? (
        <div className="w-full mt-8 p-4 bg-gray-800 text-white rounded-md">
          <p className="text-xl">{summarized}</p>
        </div>
      ) : (
        <>
          <div className="w-full mt-8 p-4 bg-gray-800 text-white rounded-md">
            <p className="text-xl">
              Hey! It&apos;s great to see you here. Enter a URL from HackerNews
              to get started. 🚀
            </p>
          </div>
        </>
      )}
    </div>
  )
}
