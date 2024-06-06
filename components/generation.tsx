"use client"

import { useState, useEffect, useRef } from "react"
import { marked } from "marked"
import FormInput from "./form-input"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { toast } from "sonner"

export default function ContentGeneration() {
  const [summarized, setSummarized] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [textLoading, setTextLoading] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image)
      }
    }
  }, [image])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [summarized, image])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTextLoading(true)
    setImageLoading(true)
    setSummarized("")
    setImage("")

    const form = e.target as HTMLFormElement
    const queryInput = form.elements.namedItem("hnUrl") as HTMLInputElement

    if (!queryInput || !queryInput.value.trim()) {
      console.error("No query input found or input is empty")
      toast.error("Please enter a valid URL")
      setTextLoading(false)
      setImageLoading(false)
      return
    }

    const hnUrl = queryInput.value.trim()
    if (!hnUrl.startsWith("https://news.ycombinator.com/item?id=")) {
      console.error("Invalid URL")
      toast.error("Please enter a valid Hacker News URL")
      setTextLoading(false)
      setImageLoading(false)
      return
    }

    const url = `/api/stream?hnUrl=${hnUrl}`
    const imageUrl = `/api/image?hnUrl=${hnUrl}`

    const [imageResponse, textResponse] = await Promise.all([
      fetch(imageUrl),
      fetch(url),
    ])

    try {
      if (imageResponse.ok) {
        const imageBlob = await imageResponse.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setImage(imageObjectURL)
      } else {
        console.error("Failed to fetch image from API")
        toast.error("Failed to fetch image from API")
      }
    } catch (error) {
      console.error("Error fetching image:", error)
      toast.error("Error fetching image")
    } finally {
      setImageLoading(false)
    }

    try {
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
      toast.error("Error fetching summarized text")
      setTextLoading(false)
    }
  }

  return (
    <div className="flex-1 h-screen overflow-y-auto w-full px-8">
      <FormInput handleSubmitFn={handleSubmit} />

      {(textLoading || imageLoading || summarized || image) && (
        <div className="w-full md:w-[80vw] lg:w-[60vw] px-4 md:px-8 mx-auto mb-16 mt-8 border-primary/40 border-4 rounded-2xl shadow-lg shadow-primary/30">
          {imageLoading ? (
            <div className="my-10 flex items-center justify-center rounded-xl">
              <Skeleton
                height={256}
                width={256}
                highlightColor="#FF8325"
                baseColor="#FFC69C"
                borderRadius={"20px"}
              />
            </div>
          ) : (
            image && (
              <div className="my-10 flex items-center justify-center">
                <img
                  src={image}
                  width={256}
                  height={256}
                  alt="Generated visual representation"
                  className="rounded-2xl shadow-xl shadow-primary/30"
                />
              </div>
            )
          )}

          {textLoading ? (
            <div className="my-10 p-6 rounded-xl">
              <Skeleton
                count={5}
                height={30}
                highlightColor="#FF8325"
                baseColor="#FFC69C"
                borderRadius={"4px"}
              />
            </div>
          ) : (
            summarized && (
              <div className="my-10 prose-h1:tracking-tight min-w-full prose prose-li:marker:text-black prose-headings:text-primary md:text-base text-sm">
                <div dangerouslySetInnerHTML={{ __html: marked(summarized) }} />
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
