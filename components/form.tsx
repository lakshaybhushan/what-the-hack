"use client"
import { useState } from "react"
import { marked } from "marked"

export default function InputForm() {
  const [summarized, setSummarized] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target as HTMLFormElement
    const queryInput = form.elements.namedItem("hnUrl") as HTMLInputElement

    if (!queryInput) {
      console.error("No query input found")
      setLoading(false)
      return
    }

    const url = `/api/stream?hnUrl=${queryInput.value}`
    const imageUrl = `/api/image?hnUrl=${queryInput.value}`

    try {
      // Fetch generated image first
      const imageResponse = await fetch(imageUrl)
      if (imageResponse.ok) {
        const imageBlob = await imageResponse.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setImage(imageObjectURL)
      } else {
        console.error("Failed to fetch image from API")
      }

      // Fetch summarized text
      const response = await fetch(url)
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let done = false
      let text = ""

      if (!reader) {
        throw new Error("Summary cannot be generated. Please try again.")
      }

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        text += decoder.decode(value)
        setSummarized(text)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col mt-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          name="hnUrl"
          placeholder="https://news.ycombinator.com/item?id="
          className="border border-gray-300 px-6 py-4 rounded-full w-[60vw]"
        />
        <button
          type="submit"
          className="px-6 py-4 rounded-full bg-orange-400 text-orange-50 font-medium">
          Summarize
        </button>
      </form>

      {loading && <p className="mt-10 text-center">Loading...</p>}

      {image && (
        <div className="my-10">
          <img
            src={image}
            alt="Generated visual representation"
            className="rounded-xl"
          />
        </div>
      )}

      {summarized && (
        <div className="my-10 p-4 border border-gray-300 rounded-xl prose prose-p:my-2 prose-h1:font-medium prose-h1:text-orange-500 w-[60vw]">
          <div dangerouslySetInnerHTML={{ __html: marked(summarized) }} />
        </div>
      )}
    </div>
  )
}
