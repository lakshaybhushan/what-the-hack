import { useState, useEffect } from "react"
import { marked } from "marked"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function InputForm() {
  const [summarized, setSummarized] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [textLoading, setTextLoading] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image)
      }
    }
  }, [image])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTextLoading(true)
    setImageLoading(true)
    setSummarized("")
    setImage("")

    const form = e.target as HTMLFormElement
    const queryInput = form.elements.namedItem("hnUrl") as HTMLInputElement

    if (!queryInput) {
      console.error("No query input found")
      setTextLoading(false)
      setImageLoading(false)
      return
    }
    const url = `/api/stream?hnUrl=${queryInput.value}`
    const imageUrl = `/api/image?hnUrl=${queryInput.value}`

    const [imageResponse, textResponse] = await Promise.all([
      fetch(imageUrl),
      fetch(url),
    ])

    try {
      // const imageResponse = await fetch(imageUrl)
      if (imageResponse.ok) {
        const imageBlob = await imageResponse.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setImage(imageObjectURL)
      } else {
        console.error("Failed to fetch image from API")
      }
    } catch (error) {
      console.error("Error fetching image:", error)
    } finally {
      setImageLoading(false)
    }

    try {
      // Fetch summarized text
      // const response = await fetch(url)
      const reader = textResponse.body?.getReader()
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

        if (text.split(" ").length >= 2) {
          setTextLoading(false)
        }
      }
    } catch (error) {
      console.error("Error fetching summarized text:", error)
      setTextLoading(false)
    }
  }

  return (
    <div className="flex flex-col mt-4 items-center justify-center">
      {imageLoading ? (
        <div className="my-10">
          <Skeleton height={500} width={500} />
        </div>
      ) : (
        image && (
          <div className="my-10">
            <img
              src={image}
              width={500}
              height={500}
              alt="Generated visual representation"
              className="rounded-xl"
            />
          </div>
        )
      )}

      {textLoading ? (
        <div className="my-10 p-6 border border-gray-300 rounded-xl min-w-[65vw]">
          <Skeleton count={10} />
        </div>
      ) : (
        summarized && (
          <div className="my-10 p-6 min-w-[65vw] border border-gray-300 rounded-xl prose prose-orange prose-headings:text-orange-500 prose-headings:tracking-tight prose-h1:font-semibold prose-h1:tracking-tight prose-li:marker:text-black">
            <div dangerouslySetInnerHTML={{ __html: marked(summarized) }} />
          </div>
        )
      )}

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
    </div>
  )
}
